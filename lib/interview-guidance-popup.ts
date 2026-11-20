// Lets any client component (e.g. a course page's "Apply Today" button)
// open the globally-mounted <InterviewGuidancePopup /> without needing a
// shared React context, since the popup is mounted once in site-chrome,
// far from where these triggers live in the tree.
export const OPEN_INTERVIEW_GUIDANCE_POPUP_EVENT = "open-interview-guidance-popup";

export function openInterviewGuidancePopup() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_INTERVIEW_GUIDANCE_POPUP_EVENT));
}
