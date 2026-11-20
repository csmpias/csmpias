import type { DictionaryKey } from "@/lib/i18n/dictionary";

/** Maps each top-level primaryNav group's English label to its translation key. */
export const NAV_LABEL_TO_KEY: Record<string, DictionaryKey> = {
  Home: "nav.home",
  Courses: "nav.courses",
  About: "nav.about",
  UPSC: "nav.upsc",
  UPPCS: "nav.uppcs",
  "State PCS": "nav.statePcs",
  Mentorship: "nav.mentorship",
  "More Programs": "nav.morePrograms",
  Blog: "nav.blog",
  Resources: "nav.resources",
  Admission: "nav.admission",
  "Contact Us": "nav.contactUs",
};
