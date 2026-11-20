import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { QuizApp } from "@/components/quiz/quiz-app";

export const metadata: Metadata = {
  title: "Free UPSC, UPPCS & BPSC Prelims Quiz",
  description:
    "Test your Prelims prep with a free 20-question timed quiz for UPSC, UPPCS, or BPSC — get your score instantly and personalised guidance from CSMP IAS.",
  alternates: { canonical: "/quiz" },
};

export default function QuizPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free Practice Quiz"
        title="UPSC / UPPCS / BPSC Prelims Quiz"
        description="Pick your exam, answer 20 random questions with a 30-second timer each, and get your score instantly."
      />
      <QuizApp />
    </>
  );
}
