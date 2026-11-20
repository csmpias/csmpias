"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ButtonAsButton, Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { buildWhatsAppLink } from "@/lib/site-config";
import type { QuizExamType, QuizQuestion } from "@/lib/types";

const QUESTION_COUNT = 20;
const SECONDS_PER_QUESTION = 30;

const exams: { value: QuizExamType; label: string; blurb: string }[] = [
  { value: "UPSC", label: "UPSC", blurb: "Civil Services GS Prelims" },
  { value: "UPPCS", label: "UPPCS", blurb: "GS + Uttar Pradesh GK" },
  { value: "BPSC", label: "BPSC", blurb: "GS + Bihar GK" },
];

type Step = "select-exam" | "details" | "loading" | "playing" | "submitting" | "result" | "error";

const inputClasses =
  "rounded-[8px] border border-heading/15 bg-cream/40 px-4 py-3 text-[0.9375rem] text-heading outline-none transition-colors focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15";

const optionLetters = ["A", "B", "C", "D"] as const;

function optionText(q: QuizQuestion, letter: (typeof optionLetters)[number]) {
  return { A: q.option_a, B: q.option_b, C: q.option_c, D: q.option_d }[letter];
}

export function QuizApp() {
  const supabase = useMemo(() => createClient(), []);

  const [step, setStep] = useState<Step>("select-exam");
  const [examType, setExamType] = useState<QuizExamType | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_QUESTION);
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const advanceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion = questions[currentIndex];

  // Per-question 30s countdown — auto-advances (recording no answer) on timeout.
  useEffect(() => {
    if (step !== "playing") return;
    setSecondsLeft(SECONDS_PER_QUESTION);
    setSelectedLetter(null);

    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          goToNext(null);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, currentIndex]);

  useEffect(() => {
    return () => {
      if (advanceTimeout.current) clearTimeout(advanceTimeout.current);
    };
  }, []);

  function handleSelectExam(exam: QuizExamType) {
    setExamType(exam);
    setStep("details");
  }

  function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedName) {
      setFormError("Please enter your name.");
      return;
    }
    if (!/^\d{10}$/.test(trimmedPhone.replace(/\D/g, "").slice(-10))) {
      setFormError("Please enter a valid 10-digit phone number.");
      return;
    }
    setFormError(null);
    void startQuiz();
  }

  async function startQuiz() {
    if (!examType) return;
    setStep("loading");
    const { data, error } = await supabase.rpc("get_quiz_questions", {
      p_exam_type: examType,
      p_limit: QUESTION_COUNT,
    });
    if (error || !data || data.length === 0) {
      setErrorMessage("Couldn't load quiz questions. Please try again in a moment.");
      setStep("error");
      return;
    }
    setQuestions(data as QuizQuestion[]);
    setCurrentIndex(0);
    setAnswers({});
    setStep("playing");
  }

  function handleSelectOption(letter: string) {
    if (selectedLetter || !currentQuestion) return; // lock in first choice
    setSelectedLetter(letter);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: letter }));
    advanceTimeout.current = setTimeout(() => goToNext(letter), 500);
  }

  function goToNext(_letterJustPicked: string | null) {
    setCurrentIndex((idx) => {
      const next = idx + 1;
      if (next >= questions.length) {
        void submitAttempt();
        return idx;
      }
      return next;
    });
  }

  async function submitAttempt() {
    if (!examType) return;
    setStep("submitting");
    const questionIds = questions.map((q) => q.id);
    const selectedOptions = questions.map((q) => answers[q.id] ?? "");

    const { data, error } = await supabase.rpc("submit_quiz_attempt", {
      p_name: name.trim(),
      p_phone: phone.trim(),
      p_exam_type: examType,
      p_question_ids: questionIds,
      p_selected_options: selectedOptions,
    });

    if (error || !data || data.length === 0) {
      setErrorMessage("Couldn't submit your quiz. Please check your connection and try again.");
      setStep("error");
      return;
    }

    setResult({ score: data[0].score, total: data[0].total });
    setStep("result");
  }

  function handleRetake() {
    setStep("select-exam");
    setExamType(null);
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setSelectedLetter(null);
    setResult(null);
    setErrorMessage(null);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
      {step === "select-exam" && (
        <Card variant="brand">
          <CardBody className="p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-heading">Choose your exam</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              20 random questions, 30 seconds each. Your score is saved so our team can follow up with the right
              guidance.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {exams.map((exam) => (
                <button
                  key={exam.value}
                  type="button"
                  onClick={() => handleSelectExam(exam.value)}
                  className="flex flex-col items-start gap-1 rounded-[10px] border border-heading/10 bg-white p-5 text-left shadow-[0_2px_16px_rgba(34,22,56,0.06)] transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_8px_28px_rgba(34,22,56,0.12)]"
                >
                  <span className="font-display text-lg font-bold text-heading">{exam.label}</span>
                  <span className="text-xs leading-relaxed text-muted">{exam.blurb}</span>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {step === "details" && examType && (
        <Card variant="brand">
          <CardBody className="p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setStep("select-exam")}
              className="text-xs font-bold uppercase tracking-[0.06em] text-brand hover:text-brand-dark"
            >
              &larr; Change exam
            </button>
            <h2 className="mt-3 font-display text-xl font-bold text-heading">
              {examType} Quiz &mdash; enter your details
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              We&rsquo;ll save your score and reach out with personalised prep guidance.
            </p>
            <form onSubmit={handleDetailsSubmit} className="mt-6 grid gap-4">
              <label htmlFor="quiz_name" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
                Full Name
                <input
                  id="quiz_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClasses}
                />
              </label>
              <label htmlFor="quiz_phone" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
                Phone Number
                <input
                  id="quiz_phone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className={inputClasses}
                  placeholder="10-digit mobile number"
                />
              </label>
              {formError ? (
                <p role="alert" className="rounded-[8px] border border-danger/30 bg-danger/5 px-4 py-3 text-sm font-medium text-danger">
                  {formError}
                </p>
              ) : null}
              <ButtonAsButton type="submit" variant="primary" className="mt-1 w-full py-3.5 text-base">
                Start Quiz
              </ButtonAsButton>
            </form>
          </CardBody>
        </Card>
      )}

      {step === "loading" && (
        <Card variant="brand">
          <CardBody className="flex flex-col items-center gap-3 p-10 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand/20 border-t-brand" />
            <p className="text-sm font-semibold text-muted">Loading your questions&hellip;</p>
          </CardBody>
        </Card>
      )}

      {step === "playing" && currentQuestion && (
        <Card variant="brand">
          <CardBody className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.06em] text-muted">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold tabular-nums",
                  secondsLeft <= 10 ? "bg-danger/10 text-danger" : "bg-brand/10 text-brand",
                )}
              >
                {secondsLeft}
              </span>
            </div>

            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-cream-2">
              <div
                className="h-full rounded-full bg-heading/15 transition-all"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-cream-2">
              <div
                className={cn(
                  "h-full rounded-full transition-[width] duration-1000 ease-linear",
                  secondsLeft <= 10 ? "bg-danger" : "bg-brand",
                )}
                style={{ width: `${(secondsLeft / SECONDS_PER_QUESTION) * 100}%` }}
              />
            </div>

            <h2 className="mt-6 font-display text-lg font-bold leading-snug text-heading sm:text-xl">
              {currentQuestion.question}
            </h2>

            <div className="mt-6 grid gap-3">
              {optionLetters.map((letter) => {
                const isSelected = selectedLetter === letter;
                return (
                  <button
                    key={letter}
                    type="button"
                    disabled={!!selectedLetter}
                    onClick={() => handleSelectOption(letter)}
                    className={cn(
                      "flex items-center gap-3 rounded-[8px] border px-4 py-3.5 text-left text-sm font-semibold transition-colors disabled:cursor-default",
                      isSelected
                        ? "border-brand bg-brand/10 text-heading"
                        : "border-heading/10 bg-white text-heading hover:border-brand/50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                        isSelected ? "bg-brand text-white" : "bg-cream-2 text-muted",
                      )}
                    >
                      {letter}
                    </span>
                    {optionText(currentQuestion, letter)}
                  </button>
                );
              })}
            </div>
          </CardBody>
        </Card>
      )}

      {step === "submitting" && (
        <Card variant="brand">
          <CardBody className="flex flex-col items-center gap-3 p-10 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand/20 border-t-brand" />
            <p className="text-sm font-semibold text-muted">Scoring your quiz&hellip;</p>
          </CardBody>
        </Card>
      )}

      {step === "result" && result && examType && (
        <Card variant="brand">
          <CardBody className="p-6 text-center sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-brand">{examType} Quiz Result</p>
            <p className="mt-3 font-display text-5xl font-extrabold text-heading">
              {result.score}
              <span className="text-2xl font-bold text-muted">/{result.total}</span>
            </p>
            <p className="mt-2 text-sm font-semibold text-muted">
              {resultMessage(result.score, result.total)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <ButtonAsButton variant="outline" onClick={handleRetake}>
                Retake Quiz
              </ButtonAsButton>
              <Button href="/apply-now" variant="primary">
                Talk to a Counsellor
              </Button>
              <Button
                href={buildWhatsAppLink(`Hi, I scored ${result.score}/${result.total} on the ${examType} quiz on csmpias.com. I'd like to know more about your courses.`)}
                target="_blank"
                rel="noopener noreferrer"
                variant="teal"
              >
                Ask on WhatsApp
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {step === "error" && (
        <Card variant="brand">
          <CardBody className="flex flex-col items-center gap-4 p-10 text-center">
            <p className="text-sm font-semibold text-danger">{errorMessage}</p>
            <ButtonAsButton variant="primary" onClick={handleRetake}>
              Start Over
            </ButtonAsButton>
          </CardBody>
        </Card>
      )}

      <p className="mt-6 text-center text-xs text-muted">
        Not ready to be timed?{" "}
        <Link href="/resources/pyqs" className="font-bold text-brand hover:text-brand-dark">
          Browse our free PYQs
        </Link>{" "}
        instead.
      </p>
    </div>
  );
}

function resultMessage(score: number, total: number): string {
  const pct = (score / total) * 100;
  if (pct >= 80) return "Excellent! You're well on track — let's build on this momentum.";
  if (pct >= 50) return "Good effort! A bit more structured prep will sharpen this further.";
  return "Every attempt counts — our mentors can help you build a stronger foundation.";
}
