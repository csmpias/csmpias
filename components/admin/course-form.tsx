"use client";

import { useActionState, useState } from "react";
import type { CourseFormState } from "@/lib/actions/admin/courses";
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload";
import { CourseResourceFiles } from "@/components/admin/course-resource-files";
import { CoursePreviewPanel } from "@/components/admin/course-preview-panel";
import { courseHref } from "@/lib/course-routes";
import { siteConfig } from "@/lib/site-config";
import type { Course, CourseResourceFile } from "@/lib/types";

const initialState: CourseFormState = {};

export function CourseForm({
  course,
  action,
}: {
  course?: Course;
  action: (state: CourseFormState, formData: FormData) => Promise<CourseFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  const [name, setName] = useState(course?.name ?? "");
  const [examType, setExamType] = useState(course?.exam_type ?? "");
  const [description, setDescription] = useState(course?.description ?? "");
  const [content, setContent] = useState(course?.content ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(course?.cover_image_url ?? null);
  const [resourceFiles, setResourceFiles] = useState<CourseResourceFile[]>(course?.resource_files ?? []);

  const liveUrl = course ? `${siteConfig.url}${courseHref(course.slug)}` : null;

  return (
    <>
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 flex w-fit items-center gap-1.5 rounded-[4px] border border-rule bg-paper-dim px-3 py-2 text-sm font-medium text-accent hover:border-ink"
        >
          View live page — {liveUrl.replace(/^https?:\/\//, "")} ↗
        </a>
      ) : null}
      <form action={formAction} className="grid gap-6 xl:grid-cols-[1fr_24rem]">
      <div className="grid gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Name
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Slug <span className="font-normal text-ink/70">(auto-generated from name if left blank)</span>
          <input name="slug" defaultValue={course?.slug} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Exam Type
            <input
              name="exam_type"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Category
            <input name="category" defaultValue={course?.category ?? ""} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Duration
            <input name="duration" defaultValue={course?.duration ?? ""} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Mode
            <input name="mode" defaultValue={course?.mode ?? ""} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Medium
            <input name="medium" defaultValue={course?.medium ?? ""} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Fee
            <input name="fee" defaultValue={course?.fee ?? ""} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Description
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Content
          <span className="font-normal text-ink/70">
            Supports: <code>## Heading</code>, <code>### Subheading</code>, <code>- bullet</code>,{" "}
            <code>&gt; callout</code>, <code>**bold**</code>, <code>__underline__</code>, <code>==highlight==</code>,{" "}
            <code>~~strikethrough~~</code>,{" "}
            <code>| table | cells |</code> (with a <code>|---|---|</code> row under the header), a{" "}
            <code>```box</code> fenced block of <code>Label: Value</code> lines (or a label on its own line
            followed by the value on the next line) for a grid of fact/date cards, a{" "}
            <code>```youtube</code> fenced block containing a video ID or URL to embed a player, a{" "}
            <code>```flowchart</code> fenced block (<code>&gt; Branch Name</code> lines starting each branch,
            followed by its <code>Label: Value</code> lines — e.g. Online/Offline pricing options) for a top-down
            diagram, and <code>[link text](https://example.com)</code> for links. For a discounted price, cross out
            the original with <code>~~Rs. 49,000~~</code> next to the offer price in <code>**bold**</code>.
          </span>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={16}
            className="rounded-[4px] border border-rule px-3 py-2.5 font-mono text-sm outline-none focus:border-ink"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Display Order
            <input
              type="number"
              name="display_order"
              defaultValue={course?.display_order ?? 0}
              className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
            />
          </label>

          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" name="is_active" defaultChecked={course?.is_active ?? true} className="h-4 w-4" />
            Active
          </label>
        </div>

        <CloudinaryUpload
          folder="csmp-ias/courses"
          label="Cover Image"
          fileFieldName="cover_image_url"
          publicIdFieldName="cover_image_public_id"
          initialUrl={course?.cover_image_url}
          initialPublicId={course?.cover_image_public_id}
          onChange={({ url }) => setCoverImageUrl(url)}
        />

        <CourseResourceFiles initialFiles={course?.resource_files ?? []} onChange={setResourceFiles} />

        {state.error ? (
          <p role="alert" className="text-sm text-danger">
            {state.error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-fit rounded-[4px] bg-accent px-5 py-2.5 font-semibold text-paper hover:bg-ink disabled:opacity-60"
        >
          {pending ? "Saving..." : course ? "Save changes" : "Create"}
        </button>
      </div>

      <div>
        <CoursePreviewPanel
          name={name}
          examType={examType}
          description={description}
          content={content}
          coverImageUrl={coverImageUrl}
          resourceFiles={resourceFiles}
        />
      </div>
      </form>
    </>
  );
}
