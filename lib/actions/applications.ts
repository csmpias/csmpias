"use server";

import { createClient } from "@/lib/supabase/server";

export type ApplicationFormState = {
  error?: string;
  success?: boolean;
};

export async function submitApplication(
  _prevState: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const whatsappNumber = String(formData.get("whatsapp_number") ?? "").trim();
  const courseSelection = String(formData.get("course_selection") ?? "").trim();
  const dob = String(formData.get("dob") ?? "").trim();
  const qualification = String(formData.get("qualification") ?? "").trim();
  const languageMode = String(formData.get("language_mode") ?? "").trim();
  const targetYear = String(formData.get("target_year") ?? "").trim();
  const examExperience = String(formData.get("exam_experience") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!fullName || !email || !whatsappNumber) {
    return { error: "Please fill in your name, email, and WhatsApp number." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("applications").insert({
    full_name: fullName,
    email,
    whatsapp_number: whatsappNumber,
    course_selection: courseSelection || null,
    dob: dob || null,
    qualification: qualification || null,
    language_mode: languageMode || null,
    target_year: targetYear || null,
    exam_experience: examExperience || null,
    message: message || null,
  });

  if (error) {
    console.error("submitApplication error", error);
    return { error: "Something went wrong. Please try again or call us directly." };
  }

  return { success: true };
}
