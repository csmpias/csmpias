import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { QuizAttempt, QuizExamType } from "@/lib/types";

export default async function AdminQuizResponsesPage({
  searchParams,
}: {
  searchParams: Promise<{ exam?: string }>;
}) {
  const { exam } = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("quiz_attempts").select("*").order("created_at", { ascending: false });
  if (exam) query = query.eq("exam_type", exam);
  const { data } = await query;
  const attempts = (data ?? []) as QuizAttempt[];

  const exams: QuizExamType[] = ["UPSC", "UPPCS", "BPSC"];

  const averageScore =
    attempts.length > 0
      ? Math.round((attempts.reduce((sum, a) => sum + a.score / a.total_questions, 0) / attempts.length) * 100)
      : null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold">Quiz Responses</h1>
        <p className="font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
          {attempts.length} attempt{attempts.length === 1 ? "" : "s"}
          {averageScore !== null ? ` · avg ${averageScore}%` : ""}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="/admin/quiz-responses"
          className={`rounded-[3px] px-3 py-1.5 font-data text-[0.6875rem] uppercase tracking-[0.04em] ${!exam ? "bg-ink text-paper" : "bg-paper-dim text-ink/70"}`}
        >
          All
        </a>
        {exams.map((e) => (
          <a
            key={e}
            href={`/admin/quiz-responses?exam=${e}`}
            className={`rounded-[3px] px-3 py-1.5 font-data text-[0.6875rem] uppercase tracking-[0.04em] ${exam === e ? "bg-ink text-paper" : "bg-paper-dim text-ink/70"}`}
          >
            {e}
          </a>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-[4px] border border-rule">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Exam</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt) => {
              const pct = Math.round((attempt.score / attempt.total_questions) * 100);
              return (
                <tr key={attempt.id} className="border-b border-rule align-top last:border-0">
                  <td className="px-4 py-3 font-medium">{attempt.name}</td>
                  <td className="px-4 py-3 text-ink/70">
                    <a href={`tel:${attempt.phone}`} className="hover:text-ink">
                      {attempt.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-ink/70">{attempt.exam_type}</td>
                  <td className="px-4 py-3 text-ink/70">
                    {attempt.score}/{attempt.total_questions}{" "}
                    <span className="font-data text-[0.6875rem] text-ink/50">({pct}%)</span>
                  </td>
                  <td className="px-4 py-3 text-ink/70">{formatDate(attempt.created_at)}</td>
                </tr>
              );
            })}
            {attempts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink/70">
                  No quiz attempts yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
