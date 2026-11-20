import type { ResourceType } from "@/lib/types";

export const resourceTypeBySlug: Record<string, ResourceType> = {
  "mock-tests": "mock_test",
  pyqs: "pyq",
  "daily-sheets": "daily_sheet",
  syllabus: "syllabus",
  "study-materials": "study_material",
  essay: "essay",
};

export function urlSlugForResourceType(type: ResourceType): string {
  const entry = Object.entries(resourceTypeBySlug).find(([, t]) => t === type);
  return entry?.[0] ?? type;
}

export const resourceTypeLabels: Record<ResourceType, string> = {
  mock_test: "Mock Tests",
  pyq: "Previous Year Questions",
  daily_sheet: "Daily Current Affairs Sheets",
  syllabus: "Syllabus",
  study_material: "Study Materials",
  essay: "Essay",
};

export const resourceTypeDescriptions: Record<ResourceType, string> = {
  mock_test: "Sectional and full-length mock tests for UPSC, UPPCS, BPSC, UKPSC and MPPSC.",
  pyq: "Prelims and Mains previous year question papers, organised by exam, year and subject.",
  daily_sheet: "Daily-updated current affairs sheets covering national, international and Uttar Pradesh news.",
  syllabus: "Official and CSMP IAS-curated syllabus documents for UPSC, UPPCS, BPSC, UKPSC and MPPSC.",
  study_material: "Prelims and Mains study material, including UP Special notes.",
  essay: "Essay strategy notes, model essays, and previous year essay papers.",
};
