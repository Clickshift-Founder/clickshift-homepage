// Automation as a Service and builds. Prices are starting points in US dollars; we invoice in USD or in naira at
// the day's rate. Change them here and /automation, /pricing and the home page all follow.

export type Service = {
  slug: string;
  name: string;
  kicker: string;
  price: string;
  unit: string;
  timeline: string;
  summary: string;
  includes: string[];
  bestFor: string;
  cases: string[]; // slugs in work.ts
  highlight?: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: "audit",
    name: "Automation Audit",
    kicker: "Start here",
    price: "$250",
    unit: "fixed",
    timeline: "5 working days",
    summary:
      "We map how work actually moves through your team, find the manual steps that cost the most, and hand you a ranked plan with the cost and payback of each.",
    includes: [
      "Two working sessions with your team",
      "A process map of your top workflows",
      "Your 5 best automation opportunities, each with its cost and payback",
      "A tool recommendation (HubSpot, Airtable, Make, n8n…) with reasons",
      "The full fee credited if you go on to a build within 60 days",
    ],
    bestFor: "Teams who know they're drowning in manual work but not where to start",
    cases: ["zoom-to-drive", "curawell"],
  },
  {
    slug: "single-workflow",
    name: "Single Workflow",
    kicker: "One problem, solved",
    price: "from $600",
    unit: "per workflow",
    timeline: "1 – 2 weeks",
    summary:
      "One automation built end to end: lead routing, payment alerts, onboarding emails, a recordings archive, document generation. Tested, documented and handed over.",
    includes: [
      "Scoping call and a written spec",
      "The build in Make, Zapier, n8n or code: whatever will last",
      "Error alerts, retries and a log, so nothing fails silently",
      "A Loom walkthrough and a written runbook",
      "30 days of fixes included",
    ],
    bestFor: "A single, painful, repeated task",
    cases: ["apex-armor", "zoom-to-drive", "digital-brothers"],
  },
  {
    slug: "systems-build",
    name: "Systems Build",
    kicker: "Most chosen",
    price: "from $2,500",
    unit: "per project",
    timeline: "3 – 6 weeks",
    summary:
      "Your CRM, set up or rebuilt properly, with up to five connected workflows and a dashboard your leadership will actually open.",
    includes: [
      "CRM set-up or migration: HubSpot, Salesforce, Airtable, Monday.com or GoHighLevel",
      "Pipelines, lifecycle stages and properties designed around how you sell or serve",
      "Up to 5 automations: routing, onboarding, payments, reminders, reporting",
      "A live dashboard for the numbers that matter",
      "Team training, documentation and 60 days of support",
    ],
    bestFor: "Growing teams whose tools don't talk to each other",
    cases: ["the-bfg", "elsa-proptech", "hibreed", "digital-brothers"],
    highlight: true,
  },
  {
    slug: "ai-agents",
    name: "AI Agents & Review",
    kicker: "AI with a person in the loop",
    price: "from $3,500",
    unit: "per agent system",
    timeline: "4 – 8 weeks",
    summary:
      "AI that reads, scores, drafts and routes (applications, leads, documents, tickets) with a person at every decision that matters.",
    includes: [
      "Use-case design and a calibrated scoring framework",
      "Agents built on Claude or OpenAI, with retrieval where it helps",
      "A human checkpoint, an escalation path and an audit trail",
      "Cost controls: every model call logged and capped",
      "An evaluation set, so quality is measured, not assumed",
    ],
    bestFor: "High-volume review, triage or drafting work",
    cases: ["endgame-ai-admissions", "the-bfg", "quantumhire"],
  },
  {
    slug: "retainer",
    name: "Automation Retainer",
    kicker: "Your automation team",
    price: "$900",
    unit: "a month",
    timeline: "Monthly, cancel any time",
    summary:
      "An on-call automation team: we watch what we've built, fix it before you notice, and ship new workflows every month.",
    includes: [
      "Up to 20 hours a month of build and support",
      "Monitoring and alerts on every workflow",
      "A monthly report: what ran, what broke, what we shipped",
      "Priority response within one working day",
      "Unused hours roll over for one month",
    ],
    bestFor: "Teams who want automation to keep improving",
    cases: ["endgame-platforms", "digital-brothers"],
  },
  {
    slug: "programme-tech",
    name: "Programme Technology Partner",
    kicker: "For NGOs and donor programmes",
    price: "from $4,000",
    unit: "per programme",
    timeline: "Set-up in 3 – 5 weeks, then each cohort",
    summary:
      "The whole technology layer of a funded programme: learning platform, beneficiary CRM, payments, M&E dashboards and reporting that will survive an audit.",
    includes: [
      "Learning platform (LMS) set-up, in English and French where needed",
      "A beneficiary CRM, from application through outcome",
      "Payment and stipend integrations with reconciliation",
      "M&E dashboards and reports in the format your donor wants",
      "Privacy controls for sensitive data, and field-team training",
    ],
    bestFor: "Programmes funded by the World Bank, UN agencies, FCDO and foundations",
    cases: ["world-bank-sweep", "un-women-weeap", "chevening-fcdo-sweeap"],
  },
  {
    slug: "product-build",
    name: "Product Build",
    kicker: "The factory floor",
    price: "from $7,500",
    unit: "per MVP",
    timeline: "6 – 10 weeks to launch",
    summary:
      "A new product, from spec to live users: web app, mobile-ready, payments, AI and an admin dashboard. The way we build our own ventures.",
    includes: [
      "Product spec, user flows and the 2045 Standard review",
      "A Next.js web app installable on phones (PWA), with a backend and database",
      "Payments: cards, bank transfers, mobile money or stablecoins",
      "AI features, analytics and an admin dashboard",
      "Launch support and a handover, or we run it for you",
    ],
    bestFor: "Founders and organisations with a product to bring to life",
    cases: ["kobocent", "quantumhire", "edu-data"],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);

export const FAQ = [
  {
    q: "Which tools do you work with?",
    a: "HubSpot, Salesforce, Airtable, Monday.com, GoHighLevel, ActiveCampaign, Make, Zapier and n8n, plus custom code (Python, Node.js, Next.js) when no tool will last. We choose by what you already pay for and what will still work in five years, not by what's in fashion.",
  },
  {
    q: "How do you price?",
    a: "Fixed prices for an audit and for templates. Builds are quoted after scoping, starting at the prices shown. You see the full price before anything starts, and nothing is billed by the hour unless you're on a retainer.",
  },
  {
    q: "Do you work with organisations outside Nigeria?",
    a: "Yes. Our work has run for teams in Nigeria, Senegal, Mali, Côte d'Ivoire, Kenya, the UK, the UAE, the US and Canada. We work remotely and overlap with UK, EU and US hours.",
  },
  {
    q: "Can we pay in naira?",
    a: "Yes. We invoice in US dollars or in naira at the day's rate.",
  },
  {
    q: "What happens when an automation breaks?",
    a: "Everything we build alerts someone when it fails, retries safely and keeps a log. Every build includes a support period, and the retainer covers ongoing monitoring.",
  },
  {
    q: "Is AI safe for our data?",
    a: "We design for it. We send models only the data they need, log every call, and keep a person in charge of every decision that affects someone. Sensitive programme data gets privacy controls from day one.",
  },
  {
    q: "Who owns what you build?",
    a: "You do: the workflows, the code and the accounts. We document everything so your team, or anyone else, can run it.",
  },
];
