"use server";

import { createClient } from "@/lib/supabase/server";
import { cloudinary, CLOUDINARY_FOLDERS } from "@/lib/cloudinary";

export type InterviewGuidanceFormState = {
  error?: string;
  success?: boolean;
};

const MAX_PDF_SIZE_BYTES = 10 * 1024 * 1024;

/** Strips spaces/dashes and an optional +91/91 prefix, then checks for a plausible 10-digit Indian mobile number. */
function isValidMobileNumber(value: string): boolean {
  const digitsOnly = value.replace(/[\s-]/g, "").replace(/^(\+91|91)/, "");
  return /^[6-9]\d{9}$/.test(digitsOnly);
}

/** Uploads the DAF PDF to Cloudinary as an `image` resource (this codebase's established convention for PDFs — see lib/cloudinary.ts). Returns null on any failure so the registration can still succeed without it. */
async function uploadDafPdf(file: File): Promise<{ url: string; publicId: string } | null> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const dataUri = `data:application/pdf;base64,${buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: "image",
      folder: CLOUDINARY_FOLDERS.interviewGuidance,
    });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error("uploadDafPdf error", error);
    return null;
  }
}

export async function submitInterviewGuidanceRegistration(
  _prevState: InterviewGuidanceFormState,
  formData: FormData,
): Promise<InterviewGuidanceFormState> {
  const firstName = String(formData.get("first_name") ?? "").trim();
  const lastName = String(formData.get("last_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const mobileNo = String(formData.get("mobile_no") ?? "").trim();
  const rollNo = String(formData.get("roll_no") ?? "").trim();
  const medium = String(formData.get("medium") ?? "").trim();
  const interviewPreference = String(formData.get("interview_preference") ?? "").trim();
  const dafPdf = formData.get("daf_pdf");

  if (!firstName || !lastName || !email || !mobileNo || !medium || !interviewPreference) {
    return { error: "Please fill in all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (!isValidMobileNumber(mobileNo)) {
    return { error: "Please enter a valid 10-digit mobile number." };
  }

  if (medium !== "Hindi" && medium !== "English") {
    return { error: "Please select a valid medium of preparation." };
  }

  if (interviewPreference !== "Online" && interviewPreference !== "Offline") {
    return { error: "Please select a valid interview preference." };
  }

  let dafPdfUrl: string | null = null;
  let dafPdfPublicId: string | null = null;

  if (dafPdf instanceof File && dafPdf.size > 0) {
    if (dafPdf.type !== "application/pdf") {
      return { error: "The uploaded file must be a PDF." };
    }
    if (dafPdf.size > MAX_PDF_SIZE_BYTES) {
      return { error: "The uploaded PDF must be under 10MB." };
    }

    const uploaded = await uploadDafPdf(dafPdf);
    if (uploaded) {
      dafPdfUrl = uploaded.url;
      dafPdfPublicId = uploaded.publicId;
    }
    // If the upload failed, we deliberately proceed without it — the PDF is
    // optional, the registration itself is the important part.
  }

  const supabase = await createClient();
  const { error } = await supabase.from("interview_guidance_registrations").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    mobile_no: mobileNo,
    roll_no: rollNo || null,
    medium,
    interview_preference: interviewPreference,
    daf_pdf_url: dafPdfUrl,
    daf_pdf_public_id: dafPdfPublicId,
  });

  if (error) {
    console.error("submitInterviewGuidanceRegistration error", error);
    return { error: "Something went wrong. Please try again or call us directly." };
  }

  return { success: true };
}
