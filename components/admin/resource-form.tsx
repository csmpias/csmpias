"use client";

import { useActionState, useState } from "react";
import type { ResourceFormState } from "@/lib/actions/admin/resources";
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload";
import { resourceTypeLabels } from "@/lib/resource-routes";
import type { Resource, ResourceType } from "@/lib/types";

// Mirrors CLOUDINARY_FOLDERS in lib/cloudinary.ts. Not imported directly because that module
// pulls in the server-only `cloudinary` Node SDK (uses `fs`), which cannot be bundled for the client.

const initialState: ResourceFormState = {};

const RESOURCE_TYPES: ResourceType[] = [
  "mock_test",
  "pyq",
  "daily_sheet",
  "syllabus",
  "study_material",
  "essay",
];

const FOLDER_BY_TYPE: Record<ResourceType, string> = {
  mock_test: "csmp-ias/resources/mock-tests",
  pyq: "csmp-ias/resources/pyqs",
  daily_sheet: "csmp-ias/resources/daily-sheets",
  syllabus: "csmp-ias/resources/syllabus",
  study_material: "csmp-ias/resources/study-materials",
  essay: "csmp-ias/resources/essay",
};

export function ResourceForm({
  resource,
  initialType,
  action,
}: {
  resource?: Resource;
  initialType?: ResourceType;
  action: (state: ResourceFormState, formData: FormData) => Promise<ResourceFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [type, setType] = useState<ResourceType>(resource?.type ?? initialType ?? "mock_test");

  return (
    <form action={formAction} className="grid max-w-3xl gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Type
        {resource ? (
          <>
            <input type="hidden" name="type" value={resource.type} />
            <input
              disabled
              value={resourceTypeLabels[resource.type]}
              className="rounded-[4px] border border-rule bg-paper-dim px-3 py-2.5 text-ink/70 outline-none"
            />
          </>
        ) : (
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value as ResourceType)}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          >
            {RESOURCE_TYPES.map((t) => (
              <option key={t} value={t}>
                {resourceTypeLabels[t]}
              </option>
            ))}
          </select>
        )}
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Title
        <input
          name="title"
          defaultValue={resource?.title}
          required
          className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Slug <span className="font-normal text-ink/70">(auto-generated from title if left blank)</span>
        <input
          name="slug"
          defaultValue={resource?.slug}
          className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Description
        <textarea
          name="description"
          defaultValue={resource?.description ?? ""}
          rows={2}
          className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Long-form content{" "}
        <span className="font-normal text-ink/70">
          (optional — only needed if this resource gets its own detail page)
        </span>
        <textarea
          name="content"
          defaultValue={resource?.content ?? ""}
          rows={10}
          className="rounded-[4px] border border-rule px-3 py-2.5 font-mono text-sm outline-none focus:border-ink"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Exam Type
          <input
            name="exam_type"
            defaultValue={resource?.exam_type ?? ""}
            placeholder="UPSC/UPPCS/BPSC/UKPSC/MPPSC"
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Subject
          <input
            name="subject"
            defaultValue={resource?.subject ?? ""}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Year
          <input
            type="number"
            name="year"
            defaultValue={resource?.year ?? ""}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Status
        <select
          name="status"
          defaultValue={resource?.status ?? "draft"}
          className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </label>

      <CloudinaryUpload
        folder={FOLDER_BY_TYPE[type]}
        label="File"
        fileFieldName="file_url"
        publicIdFieldName="file_public_id"
        initialUrl={resource?.file_url}
        initialPublicId={resource?.file_public_id}
      />

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
        {pending ? "Saving..." : resource ? "Save changes" : "Create"}
      </button>
    </form>
  );
}
