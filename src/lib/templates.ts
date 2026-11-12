// CRM templates and workflow packs. Status "soon": listed with a price and a "notify me" button. Switch a template to
// "available" and give it a buyUrl once it is built and on a checkout (Gumroad, Lemon Squeezy, Paystack…).

export type Platform = "HubSpot" | "Salesforce" | "Airtable" | "Monday.com" | "GoHighLevel" | "Make" | "n8n";
export type PreviewKind = "pipeline" | "table" | "dashboard" | "flow" | "calendar" | "sync";

export type Template = {
  slug: string;
  name: string;
  platform: Platform;
  useCase: string;
  price: number;
  summary: string;
  includes: string[];
  preview: PreviewKind;
  status: "soon" | "available";
  buyUrl?: string;
  fromCase?: string; // slug in work.ts it was born from
};

export const PLATFORM_COLOR: Record<Platform, string> = {
  HubSpot: "#FF7A59",
  Salesforce: "#00A1E0",
  Airtable: "#FCB400",
  "Monday.com": "#FF3D57",
  GoHighLevel: "#2E7CF6",
  Make: "#6D00CC",
  n8n: "#EA4B71",
};

export const TEMPLATES: Template[] = [
  {
    slug: "hubspot-b2b-pipeline",
    name: "B2B Sales Pipeline & Lead Scoring",
    platform: "HubSpot",
    useCase: "Sales",
    price: 79,
    summary: "Deal stages, lead scoring and qualification workflows for a B2B sales team.",
    includes: ["7-stage deal pipeline", "Lead score model and properties", "Qualification and hand-off workflows", "Sales dashboard"],
    preview: "pipeline",
    status: "soon",
    fromCase: "elsa-proptech",
  },
  {
    slug: "hubspot-onboarding-lifecycle",
    name: "Customer Onboarding & Lifecycle Stages",
    platform: "HubSpot",
    useCase: "Customer success",
    price: 69,
    summary: "Lifecycle stages from subscriber to advocate, with onboarding sequences and churn-risk alerts.",
    includes: ["Lifecycle stage map", "Onboarding email sequence", "Churn-risk workflow", "Win-back trigger"],
    preview: "flow",
    status: "soon",
    fromCase: "curawell",
  },
  {
    slug: "hubspot-payment-messaging",
    name: "Payment-Triggered Customer Messaging",
    platform: "HubSpot",
    useCase: "Fintech",
    price: 89,
    summary: "Messages for successful, failed and recurring payments, segmented by region and currency.",
    includes: ["Payment properties", "Region-aware workflows", "Failed-payment recovery", "Finance alerts"],
    preview: "flow",
    status: "soon",
    fromCase: "digital-brothers",
  },
  {
    slug: "salesforce-donor-grants",
    name: "Donor & Grant Management",
    platform: "Salesforce",
    useCase: "NGOs",
    price: 149,
    summary: "Track donors, grants, deliverables and reporting deadlines for a funded programme in one place.",
    includes: ["Donor and grant objects", "Deliverable tracker", "Reporting-deadline reminders", "Funder dashboard"],
    preview: "dashboard",
    status: "soon",
    fromCase: "chevening-fcdo-sweeap",
  },
  {
    slug: "salesforce-hubspot-sync",
    name: "HubSpot ⇄ Salesforce Sync Blueprint",
    platform: "Salesforce",
    useCase: "RevOps",
    price: 129,
    summary: "The field map, rules and lifecycle logic that keep marketing and sales in agreement.",
    includes: ["Field mapping sheet", "Sync rules and conflict handling", "Lifecycle alignment", "Test plan"],
    preview: "sync",
    status: "soon",
    fromCase: "the-bfg",
  },
  {
    slug: "airtable-beneficiary-crm",
    name: "Programme Beneficiary CRM + M&E",
    platform: "Airtable",
    useCase: "NGOs",
    price: 99,
    summary: "The structure behind programmes that served 3,386 women: application, training, outcome and donor reporting.",
    includes: ["Beneficiary, cohort and session tables", "Attendance and completion tracking", "Outcome and grant logging", "M&E interface"],
    preview: "table",
    status: "soon",
    fromCase: "un-women-weeap",
  },
  {
    slug: "airtable-admissions-review",
    name: "Admissions & Application Review",
    platform: "Airtable",
    useCase: "Education",
    price: 99,
    summary: "Applications, reviewers, scores and decisions, with ready hooks for AI first-level scoring.",
    includes: ["Applicant and reviewer tables", "Weighted scoring rubric", "AI scoring hook (Make)", "Decision board"],
    preview: "table",
    status: "soon",
    fromCase: "endgame-ai-admissions",
  },
  {
    slug: "airtable-recruitment-scheduling",
    name: "Recruitment & Interview Scheduling",
    platform: "Airtable",
    useCase: "HR",
    price: 69,
    summary: "Candidates, panels and interview slots, with buffer and break rules built in.",
    includes: ["Candidate pipeline", "Panel availability", "Slot rules (buffers, breaks)", "Calendar view"],
    preview: "calendar",
    status: "soon",
    fromCase: "endgame-platforms",
  },
  {
    slug: "monday-course-delivery",
    name: "Course Delivery & Learner Success",
    platform: "Monday.com",
    useCase: "Education",
    price: 59,
    summary: "Run cohorts, track every learner's progress and step in before anyone drops out.",
    includes: ["Cohort board", "Learner progress tracking", "At-risk automations", "Completion dashboard"],
    preview: "pipeline",
    status: "soon",
    fromCase: "hibreed",
  },
  {
    slug: "monday-agency-delivery",
    name: "Agency Client Delivery Board",
    platform: "Monday.com",
    useCase: "Agencies",
    price: 49,
    summary: "From signed deal to delivered project: tasks, approvals and client updates.",
    includes: ["Client and project boards", "Approval flow", "Automatic client updates", "Workload view"],
    preview: "pipeline",
    status: "soon",
  },
  {
    slug: "ghl-lead-to-booking",
    name: "Lead-to-Booking Funnel",
    platform: "GoHighLevel",
    useCase: "Service businesses",
    price: 89,
    summary: "Speed-to-lead routing, SMS, email and call sequences that turn enquiries into booked calls.",
    includes: ["Value-based lead routing", "SMS and email sequences", "Missed-call text-back", "Booking pipeline"],
    preview: "flow",
    status: "soon",
    fromCase: "apex-armor",
  },
  {
    slug: "ghl-real-estate",
    name: "Real Estate & Proptech Pipeline",
    platform: "GoHighLevel",
    useCase: "Real estate",
    price: 79,
    summary: "Buyer and seller pipelines, viewing reminders and nurture for long sales cycles.",
    includes: ["Buyer and seller pipelines", "Viewing reminders", "12-month nurture", "Agent dashboard"],
    preview: "pipeline",
    status: "soon",
  },
  {
    slug: "make-payment-alerts",
    name: "Payment Detection & Alerts",
    platform: "Make",
    useCase: "Fintech",
    price: 59,
    summary: "Webhook in, payment classified, CRM updated, Slack and email told. Works with Flutterwave, Paystack and Stripe.",
    includes: ["Make scenario blueprint", "Payment classifier", "CRM update module", "Slack and email alerts"],
    preview: "flow",
    status: "soon",
    fromCase: "digital-brothers",
  },
  {
    slug: "n8n-zoom-drive-archiver",
    name: "Zoom → Google Drive Archiver",
    platform: "n8n",
    useCase: "Operations",
    price: 39,
    summary: "The workflow behind a Zoom bill cut from about $1,000 a year to under $200: archive, verify, then free Zoom storage.",
    includes: ["n8n workflow", "Integrity check before delete", "Duplicate-safe migration log", "Set-up guide"],
    preview: "flow",
    status: "soon",
    fromCase: "zoom-to-drive",
  },
];

export const BUNDLE = { name: "All-Access Library", price: 299, note: "Every template, current and future, for one year" };
export const SETUP_ADDON = { name: "Done-for-you set-up", price: 350, note: "We install and adapt any template in your account" };
