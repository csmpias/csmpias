import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

export const CLOUDINARY_FOLDERS = {
  courses: "csmp-ias/courses",
  blog: "csmp-ias/blog",
  mockTests: "csmp-ias/resources/mock-tests",
  pyqs: "csmp-ias/resources/pyqs",
  dailySheets: "csmp-ias/resources/daily-sheets",
  syllabus: "csmp-ias/resources/syllabus",
  studyMaterials: "csmp-ias/resources/study-materials",
  essay: "csmp-ias/resources/essay",
  testSeries: "csmp-ias/test-series",
  site: "csmp-ias/site",
  interviewGuidance: "csmp-ias/interview-guidance",
} as const;

/** Derives a page-1 JPG thumbnail URL from a Cloudinary `image`-type PDF public_id. */
export function pdfThumbnailUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    resource_type: "image",
    transformation: [{ page: 1, format: "jpg", quality: "auto", fetch_format: "auto" }],
  });
}

/** Derives a force-download URL from a stored secure_url/public_id via fl_attachment. */
export function downloadUrl(publicId: string, filename?: string): string {
  return cloudinary.url(publicId, {
    resource_type: "image",
    flags: filename ? `attachment:${filename}` : "attachment",
  });
}

export async function deleteCloudinaryAsset(publicId: string | null | undefined) {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (error) {
    console.error(`Failed to delete Cloudinary asset ${publicId}`, error);
  }
}

/** Generates a signature for a signed, authenticated client-side upload from the admin panel. */
export function generateUploadSignature(params: Record<string, string | number>) {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { ...params, timestamp },
    process.env.CLOUDINARY_API_SECRET!,
  );
  return { timestamp, signature };
}
