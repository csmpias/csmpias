"use client";

import { useState } from "react";
import { CldUploadWidget, type CloudinaryUploadWidgetInfo } from "next-cloudinary";

export function CloudinaryUpload({
  folder,
  label,
  fileFieldName,
  publicIdFieldName,
  initialUrl,
  initialPublicId,
  onChange,
}: {
  folder: string;
  label: string;
  fileFieldName: string;
  publicIdFieldName: string;
  initialUrl?: string | null;
  initialPublicId?: string | null;
  /** Optional: reports the uploaded URL/public ID up to the parent for components (like a live SEO panel) that need it before form submission. */
  onChange?: (value: { url: string; publicId: string }) => void;
}) {
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [url, setUrl] = useState<string | null>(initialUrl ?? null);
  const [publicId, setPublicId] = useState<string | null>(initialPublicId ?? null);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{label}</p>
      <input type="hidden" name={fileFieldName} value={url ?? ""} />
      <input type="hidden" name={publicIdFieldName} value={publicId ?? ""} />

      {preview ? (
        <a
          href={preview}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate rounded-[4px] border border-rule px-3 py-2 text-sm text-accent underline"
        >
          {preview}
        </a>
      ) : null}

      <CldUploadWidget
        signatureEndpoint="/api/cloudinary/sign"
        options={{ folder, sources: ["local"], multiple: false }}
        onSuccess={(result) => {
          const info = result.info as CloudinaryUploadWidgetInfo;
          setUrl(info.secure_url);
          setPublicId(info.public_id);
          setPreview(info.secure_url);
          onChange?.({ url: info.secure_url, publicId: info.public_id });
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="w-fit rounded-[4px] border border-rule px-4 py-2 text-sm font-medium hover:border-ink"
          >
            {preview ? "Replace file" : "Upload file"}
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
