"use client";

import { useState } from "react";
import { CldUploadWidget, type CloudinaryUploadWidgetInfo } from "next-cloudinary";
import type { CourseResourceFile } from "@/lib/types";

export function CourseResourceFiles({
  initialFiles,
  onChange,
}: {
  initialFiles: CourseResourceFile[];
  /** Optional: reports the current list up to the parent for a live preview panel. */
  onChange?: (files: CourseResourceFile[]) => void;
}) {
  const [files, setFilesState] = useState<CourseResourceFile[]>(initialFiles);

  function setFiles(update: CourseResourceFile[] | ((prev: CourseResourceFile[]) => CourseResourceFile[])) {
    setFilesState((prev) => {
      const next = typeof update === "function" ? update(prev) : update;
      onChange?.(next);
      return next;
    });
  }

  function updateTitle(index: number, title: string) {
    setFiles((prev) => prev.map((file, i) => (i === index ? { ...file, title } : file)));
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium">
        Resource Files <span className="font-normal text-ink/70">(each shown with an inline viewer + download button on the course page)</span>
      </p>
      <input type="hidden" name="resource_files" value={JSON.stringify(files)} />

      {files.length > 0 ? (
        <div className="flex flex-col gap-2">
          {files.map((file, i) => (
            <div key={file.url + i} className="flex flex-wrap items-center gap-2 rounded-[4px] border border-rule p-3">
              <input
                type="text"
                value={file.title}
                onChange={(e) => updateTitle(i, e.target.value)}
                placeholder="Title shown to visitors, e.g. Syllabus PDF"
                className="min-w-40 flex-1 rounded-[4px] border border-rule px-3 py-2 text-sm outline-none focus:border-ink"
              />
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-[14rem] truncate text-sm text-accent underline"
              >
                {file.url}
              </a>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="rounded-[4px] border border-rule px-3 py-2 text-sm font-medium text-danger hover:border-danger"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <CldUploadWidget
        signatureEndpoint="/api/cloudinary/sign"
        options={{ folder: "csmp-ias/courses/resources", sources: ["local"], multiple: false }}
        onSuccess={(result) => {
          const info = result.info as CloudinaryUploadWidgetInfo;
          setFiles((prev) => [
            ...prev,
            { title: info.original_filename || "Download", url: info.secure_url, public_id: info.public_id },
          ]);
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="w-fit rounded-[4px] border border-rule px-4 py-2 text-sm font-medium hover:border-ink"
          >
            {files.length > 0 ? "Add another file" : "Upload file"}
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
