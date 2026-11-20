export type ContentStatus = "draft" | "published";
export type ResourceType =
  | "mock_test"
  | "pyq"
  | "daily_sheet"
  | "syllabus"
  | "study_material"
  | "essay";
export type ApplicationStatus = "new" | "contacted" | "enrolled" | "rejected";

export type QuizExamType = "UPSC" | "UPPCS" | "BPSC";

// Shape returned by the get_quiz_questions() RPC — deliberately excludes
// correct_option so the answer key never reaches the browser.
export type QuizQuestion = {
  id: string;
  exam_type: QuizExamType;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
};

export type QuizAttempt = {
  id: string;
  name: string;
  phone: string;
  exam_type: QuizExamType;
  score: number;
  total_questions: number;
  created_at: string;
};

export type PostContentFormat = "html" | "legacy_text";

export type NavLinkRow = {
  id: string;
  group_label: string;
  label: string;
  href: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  content_format: PostContentFormat;
  import_batch: string | null;
  cover_image_url: string | null;
  cover_image_public_id: string | null;
  category: string | null;
  status: ContentStatus;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AnalyticsSession = {
  id: string;
  first_seen: string;
  last_seen: string;
  entry_path: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  user_agent: string | null;
};

export type AnalyticsPageview = {
  id: number;
  session_id: string;
  path: string;
  referrer: string | null;
  occurred_at: string;
};

export type PostViewCount = {
  post_id: string;
  view_count: number;
};

export type Resource = {
  id: string;
  type: ResourceType;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  exam_type: string | null;
  subject: string | null;
  year: number | null;
  file_url: string | null;
  file_public_id: string | null;
  cover_image_url: string | null;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type CourseResourceFile = {
  title: string;
  url: string;
  public_id: string;
};

export type Course = {
  id: string;
  slug: string;
  name: string;
  exam_type: string | null;
  duration: string | null;
  mode: string | null;
  medium: string | null;
  fee: string | null;
  description: string | null;
  content: string | null;
  cover_image_url: string | null;
  cover_image_public_id: string | null;
  resource_files: CourseResourceFile[];
  seo_keywords: string[] | null;
  category: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Batch = {
  id: string;
  course_id: string | null;
  name: string;
  start_date: string | null;
  status: string;
  center: string | null;
  created_at: string;
  updated_at: string;
};

export type TestSeries = {
  id: string;
  name: string;
  exam_type: string | null;
  start_date: string | null;
  subject: string | null;
  description: string | null;
  file_url: string | null;
  file_public_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Application = {
  id: string;
  full_name: string;
  email: string;
  whatsapp_number: string;
  dob: string | null;
  course_selection: string | null;
  qualification: string | null;
  language_mode: string | null;
  target_year: string | null;
  exam_experience: string | null;
  message: string | null;
  status: ApplicationStatus;
  submitted_at: string;
  updated_at: string;
};

export type InterviewGuidanceRegistration = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  roll_no: string | null;
  medium: "Hindi" | "English";
  interview_preference: "Online" | "Offline";
  daf_pdf_url: string | null;
  daf_pdf_public_id: string | null;
  status: "new" | "contacted" | "scheduled" | "completed";
  created_at: string;
};

export type FeeItem = {
  id: string;
  track: string;
  course_name: string;
  fee: string | null;
  otp: string | null;
  installment: string | null;
  duration: string | null;
  display_order: number;
};

export type FeeInstallment = {
  id: string;
  track: string;
  course_name: string;
  installment_1: string | null;
  installment_2: string | null;
  installment_3: string | null;
  total_fee: string | null;
  display_order: number;
};

export type Testimonial = {
  id: string;
  student_name: string;
  exam_cleared: string | null;
  rank: string | null;
  quote: string;
  photo_url: string | null;
  photo_public_id: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
