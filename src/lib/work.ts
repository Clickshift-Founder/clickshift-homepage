// Case studies. Every number here comes from the founder's CVs, the QuantumHire report (30 Oct 2026) or a public
// source linked in `sources`. Don't add a figure that has no source.

export type Pillar = "learn" | "secure" | "trace" | "sustain" | "care";
export type Line = "programmes" | "companies" | "products" | "institutions";

export type Case = {
  slug: string;
  client: string; // the brand we built for
  title: string; // what we built, in a line
  line: Line;
  year?: string;
  role: string; // our role, stated plainly
  location: string;
  summary: string;
  metric?: { value: string; label: string };
  challenge: string;
  built: string[];
  outcome: string[];
  stack: string[];
  pillars: Pillar[];
  links?: { label: string; href: string }[];
  sources?: { label: string; href: string }[];
  services?: string[]; // slugs in services.ts
  templates?: string[]; // slugs in templates.ts
  featured?: boolean;
  accent?: string;
};

export const LINES: Record<Line, { label: string; blurb: string }> = {
  programmes: { label: "Development programmes", blurb: "Platforms for donor-funded programmes" },
  companies: { label: "Companies", blurb: "Automation and CRM for growing teams" },
  products: { label: "Our products", blurb: "Ventures we build, own and run" },
  institutions: { label: "Institutions", blurb: "Platforms for schools, communities and campaigns" },
};

export const CASES: Case[] = [
  {
    slug: "world-bank-sweep",
    client: "World Bank · DO Take Action",
    title: "The SWEEP learning and procurement platform",
    line: "programmes",
    year: "2024 – 2025",
    role: "Technical specialist: ran the programme's technology end to end and built the platform",
    location: "Abuja, Nigeria",
    summary:
      "A hybrid learning programme that got women-led businesses in Abuja ready to win public contracts, run on a platform we built and operated.",
    metric: { value: "765", label: "women entrepreneurs supported" },
    challenge:
      "Women run about 40% of Nigerian businesses, yet few win public contracts. SWEEP (Scaling Women's Economic Empowerment through Affirmative Procurement Reforms) ran with the World Bank and the Young Professionals Program. It needed one place where hundreds of women could enrol, learn, follow their progress and reach e-procurement portals, and one source of truth the funder could audit.",
    built: [
      "The programme platform at sweepworldbankxdo.com: enrolment, cohort pages and the course journey",
      "A 4-week hybrid curriculum delivered online: 3 modules and 11 classes (procurement access, financial inclusion, digital skills)",
      "A beneficiary CRM that tracks each woman from application through training to outcome",
      "Webhook integrations between payments, accounting and beneficiary records",
      "M&E dashboards and automated reporting for programme staff and the funder",
    ],
    outcome: [
      "765 women entrepreneurs supported through the programme",
      "Funder reporting came from live data, not end-of-cohort spreadsheets",
      "Field teams were trained, and every process was documented so partners could run it",
    ],
    stack: ["Airtable", "Make", "Webhooks", "Thinkific", "Google Workspace", "Dashboards"],
    pillars: ["trace", "care", "sustain"],
    links: [{ label: "Programme page", href: "https://dotakeaction.org/worldbank-sweep/" }],
    sources: [{ label: "DO Take Action: World Bank SWEEP", href: "https://dotakeaction.org/worldbank-sweep/" }],
    services: ["programme-tech", "systems-build"],
    templates: ["airtable-beneficiary-crm"],
    featured: true,
    accent: "#2E44FF",
  },
  {
    slug: "un-women-weeap",
    client: "UN Women · DO Take Action",
    title: "A learning platform and e-procurement onboarding across four countries",
    line: "programmes",
    year: "2023 – 2024",
    role: "Technical lead: built the learning platform and managed the e-procurement integrations",
    location: "Nigeria, Senegal, Mali, Côte d'Ivoire",
    summary:
      "WEEAP (Women's Economic Empowerment through Affirmative Procurement) trained women entrepreneurs in English and French and helped them register on public e-procurement portals.",
    metric: { value: "1,930", label: "women entrepreneurs in the programme" },
    challenge:
      "One programme ran in four countries and two languages, with French-speaking faculty in Senegal and Mali and English-speaking faculty in Nigeria. Women had to learn procurement, adapt their business models after COVID-19, and get onto e-procurement platforms they had never used. All of it had to be measurable for UN Women.",
    built: [
      "The DO Academy learning platform: 3 modules and 21 classes, in English and French",
      "Onboarding and support for women registering on government e-procurement portals",
      "Automated beneficiary onboarding, progress tracking and impact measurement",
      "A CRM for women entrepreneurs and partner organisations",
      "Technical reports on programme impact and system performance",
    ],
    outcome: [
      "1,930 women entrepreneurs supported across Nigeria, including Kaduna and Lagos",
      "Delivered across Nigeria, Senegal, Mali and Côte d'Ivoire",
      "One participant went on to win a US$9,000 grant during the programme",
    ],
    stack: ["Thinkific", "Airtable", "Make", "Mailchimp", "Zoom"],
    pillars: ["learn", "care", "trace"],
    links: [
      { label: "Programme page (English)", href: "https://dotakeaction.org/unwomen/" },
      { label: "Programme page (French)", href: "https://dotakeaction.org/unwomenx-fr/" },
    ],
    sources: [{ label: "DO Take Action: UN Women WEEAP", href: "https://dotakeaction.org/unwomen/" }],
    services: ["programme-tech"],
    templates: ["airtable-beneficiary-crm", "monday-course-delivery"],
    featured: true,
    accent: "#00A3E0",
  },
  {
    slug: "chevening-fcdo-sweeap",
    client: "Chevening Alumni (UK FCDO) · DO Take Action",
    title: "The SWEEAP platform for Kano and Rivers States",
    line: "programmes",
    year: "2025",
    role: "Technical lead: built the platform and its monitoring and evaluation systems",
    location: "Kano and Rivers States, Nigeria",
    summary:
      "The Chevening Alumni Association of Nigeria's procurement programme trained 691 women against a target of 600, and Rivers State committed to a 30% procurement set-aside for women-owned businesses during it.",
    metric: { value: "691", label: "women trained, against a target of 600" },
    challenge:
      "SWEEAP ran two cohorts in two states between August and December 2025. It covered procurement access, financial inclusion, digital skills and export readiness. The data had to stand up at a close-out at the British High Commission and protect sensitive information about women entrepreneurs.",
    built: [
      "The programme platform and a beneficiary database",
      "Gender-sensitive tools aligned with the Women's Empowerment Principles, with privacy controls for sensitive records",
      "Integrations linking training platforms, beneficiary records and impact reporting",
      "Monitoring and evaluation dashboards used for the close-out reporting",
    ],
    outcome: [
      "691 women trained against a target of 600, with an 88% completion rate",
      "Participants won procurement contracts worth ₦2.2 million and ₦6.3 million",
      "Over 500 women-owned businesses now pursuing procurement opportunities, per the British Deputy High Commissioner",
      "Rivers State committed to a 30% affirmative procurement set-aside for women-owned businesses",
    ],
    stack: ["Airtable", "Make", "Webhooks", "Dashboards", "Google Workspace"],
    pillars: ["care", "secure", "trace"],
    sources: [
      {
        label: "Chevening: opening procurement opportunities for women",
        href: "https://www.chevening.org/news/how-chevening-alumni-are-opening-procurement-opportunities-for-women-entrepreneurs-in-nigeria/",
      },
      {
        label: "ThisDay: SWEEAP close-out",
        href: "https://www.thisdaylive.com/2026/03/04/chevening-alumni-association-completes-close-out-of-sweeap-project/",
      },
      {
        label: "TheCable: 691 women trained",
        href: "https://www.thecable.ng/chevening-alumni-in-nigeria-trains-691-women-entrepreneurs-on-public-procurement/",
      },
    ],
    services: ["programme-tech", "systems-build"],
    templates: ["airtable-beneficiary-crm", "salesforce-donor-grants"],
    featured: true,
    accent: "#C8102E",
  },
  {
    slug: "endgame-ai-admissions",
    client: "EndGame",
    title: "AI admissions review, with a person at every decision",
    line: "companies",
    year: "2023 – present",
    role: "Technical automations and product lead: led the design and rollout",
    location: "Five-country operations",
    summary:
      "First-level application review scored by AI against a values framework, with the comments written for a human reviewer who makes every call.",
    metric: { value: "60%+", label: "less manual review time" },
    challenge:
      "Hundreds of applications a cycle, each with a personal statement and recommendation letters, read by a small team. Reviews were slow and inconsistent between reviewers.",
    built: [
      "A Make + Airtable pipeline that scores personal statements and checks recommendation letters",
      "Reviewer comments written in a calibrated reviewer voice, then handed to a human",
      "A second-level pipeline that applies a weighted character, competence and capacity framework to shortlisted candidates",
      "A trigger a person controls, and an escalation path for edge cases",
    ],
    outcome: [
      "Manual review time down by more than 60%",
      "The same explainable criteria applied to every application",
      "Faster admissions decisions, with a person still making each one",
    ],
    stack: ["Make", "Airtable", "OpenAI API", "Claude API"],
    pillars: ["learn", "trace", "care"],
    links: [{ label: "EndGame: Technology & Digital Solutions", href: "https://endgamehq.com/technology-digital-solutions/" }],
    services: ["ai-agents", "single-workflow"],
    templates: ["airtable-admissions-review"],
    featured: true,
    accent: "#FF6B2C",
  },
  {
    slug: "zoom-to-drive",
    client: "EndGame",
    title: "A Zoom archive that cut a US$1,000 bill to under US$200",
    line: "companies",
    role: "Designed, built and runs it",
    location: "Remote",
    summary:
      "An unattended pipeline moves every Zoom cloud recording to Google Drive, checks the copy, then frees the Zoom storage.",
    metric: { value: "$1,000 → <$200", label: "a year on Zoom storage" },
    challenge:
      "Classes and meetings were recorded to Zoom's cloud, and storage grew every month. Keeping it meant a larger Zoom plan. Moving recordings by hand took hours, and people forgot.",
    built: [
      "A Python job that finds new Zoom cloud recordings (video and chat transcripts)",
      "Transfer to Google Drive, organised by date and meeting, with an integrity check before anything is deleted",
      "A migration log, so a recording is never copied twice or lost",
      "A cron schedule on Oracle Cloud's Always Free tier, so hosting costs nothing",
    ],
    outcome: [
      "The Zoom bill went from about US$1,000 a year to under US$200, saving more than ₦1 million a year",
      "No more manual downloads and uploads",
      "Recordings are easier to find in Drive than they were in Zoom",
    ],
    stack: ["Python", "Zoom API", "Google Drive API", "Oracle Cloud", "cron"],
    pillars: ["sustain", "trace"],
    services: ["single-workflow", "audit"],
    templates: ["n8n-zoom-drive-archiver"],
    featured: true,
    accent: "#2D8CFF",
  },
  {
    slug: "endgame-platforms",
    client: "EndGame",
    title: "Peer review, scheduling and graduation platforms",
    line: "institutions",
    year: "2023 – present",
    role: "Built and shipped each platform",
    location: "Nigeria and Kenya",
    summary:
      "Small, sharp systems that replaced spreadsheets: a 360° peer review used by 400+ students, an interview scheduling engine, and a graduation platform for a new Kenya cohort.",
    metric: { value: "400+", label: "students on the peer-review platform" },
    challenge:
      "Peer reviews for 20+ student groups were compiled by hand. Interview panels were planned in spreadsheets. A new country cohort needed its own graduation process.",
    built: [
      "A peer-review platform: identity confirmed by live name search, peers found automatically, real-time tracking, and a pending-submissions view with one-click contact copy",
      "An interview scheduler with rules for minimum availability, buffers and a forced break after back-to-back interviews",
      "A Kenya graduation interface for data management and ceremony coordination",
      "Automated graduation checks and personalised PDF letters for hundreds of students",
      "Learner onboarding connecting Airtable, Thinkific, Zoom, Mailchimp and ClickUp, plus monthly reminders for unpaid tuition",
    ],
    outcome: [
      "400+ students using the peer-review platform in production",
      "The pending-submissions tracker, built after watching the team at work, became the team's most-used feature",
      "Hours of manual scheduling removed, with the same rules applied to every panellist",
    ],
    stack: ["Next.js", "PostgreSQL (Neon)", "Vercel", "Airtable", "Thinkific", "Mailchimp"],
    pillars: ["learn", "sustain"],
    links: [{ label: "EndGame", href: "https://endgamehq.com/technology-digital-solutions/" }],
    services: ["systems-build", "single-workflow"],
    templates: ["airtable-recruitment-scheduling", "monday-course-delivery"],
    accent: "#FF6B2C",
  },
  {
    slug: "the-bfg",
    client: "The BFG",
    title: "AI lead readiness scoring and a HubSpot–Salesforce sync",
    line: "companies",
    year: "2025",
    role: "AI automation consultant (contract)",
    location: "Canada",
    summary:
      "A middleware layer gives every enterprise lead an IT Readiness Score and routes it in real time, so pre-sales stops reading every file by hand.",
    metric: { value: "65%", label: "less pre-sales review time" },
    challenge:
      "Each enterprise lead took 3 to 5 hours of manual review before anyone could decide where it should go. Marketing worked in HubSpot and sales in Salesforce, and the two disagreed.",
    built: [
      "Make middleware, triggered from ActiveCampaign, that reads each lead with the Claude API and Pinecone retrieval",
      "An IT Readiness Score written back to the CRM, with routing in real time",
      "A two-way HubSpot–Salesforce sync that keeps lifecycle stages and activity current on both sides",
    ],
    outcome: [
      "Pre-sales review time down 65%",
      "Onboarding capacity up 40% with no new hires",
      "One view of each lead for marketing and sales",
    ],
    stack: ["Make", "Claude API", "Pinecone", "ActiveCampaign", "HubSpot", "Salesforce"],
    pillars: ["learn", "trace"],
    services: ["ai-agents", "systems-build"],
    templates: ["salesforce-hubspot-sync", "hubspot-b2b-pipeline"],
    accent: "#7B61FF",
  },
  {
    slug: "digital-brothers",
    client: "Digital Brothers",
    title: "Payment detection and reconciliation in four currencies",
    line: "companies",
    year: "2024 – 2025",
    role: "Product automation specialist",
    location: "Dubai, UAE",
    summary:
      "Every payment in USD, EUR, GBP and NGN is detected, classified and reconciled, and the right people are told within moments.",
    metric: { value: "~60%", label: "less manual reconciliation" },
    challenge:
      "Recurring, one-off and failed payments arrived in four currencies across several providers. Finance matched them by hand, and customers heard nothing when a payment failed.",
    built: [
      "A detection pipeline: webhook, classifier, CRM update, then Slack and email alerts",
      "Multi-currency wallet and FX routing automation",
      "Region-aware CRM workflows and customer messages triggered by payments",
    ],
    outcome: [
      "Manual reconciliation down by about 60%",
      "Failed payments flagged immediately, not at month end",
      "Customers get the right message for their region and payment",
    ],
    stack: ["Webhooks", "Make", "HubSpot", "Slack", "Flutterwave", "Paystack"],
    pillars: ["trace", "secure"],
    services: ["single-workflow", "systems-build"],
    templates: ["make-payment-alerts", "hubspot-payment-messaging"],
    accent: "#00B37E",
  },
  {
    slug: "apex-armor",
    client: "Apex Armor",
    title: "Lead routing that puts big deals in front of the CEO",
    line: "companies",
    year: "2024",
    role: "AI automation consultant (contract)",
    location: "California, USA",
    summary:
      "Leads worth more than US$2,000 go straight to the CEO. Everything else runs through automated email, SMS and call sequences.",
    metric: { value: "85%", label: "faster lead response" },
    challenge:
      "An RV manufacturer's best leads waited in the same queue as everyone else's, so by the time someone called, the buyer had moved on.",
    built: [
      "Value-based routing: deals over US$2,000 go to the CEO immediately",
      "Automated email, SMS and call sequences for the rest",
      "Response-time tracking on every lead",
    ],
    outcome: ["Lead response time improved by 85%", "The CEO's time spent on the deals that matter"],
    stack: ["CRM workflows", "SMS", "Email automation", "Make"],
    pillars: ["trace", "care"],
    services: ["single-workflow"],
    templates: ["ghl-lead-to-booking"],
    accent: "#E8A33D",
  },
  {
    slug: "curawell",
    client: "CuraWell",
    title: "Lifecycle analytics and a win-back programme",
    line: "companies",
    year: "2024",
    role: "Product manager, lifecycle and analytics (contract)",
    location: "US West Coast",
    summary:
      "Mapped a 20.7K sign-in funnel, traced 654 downgrades to billing drop-off, and designed the triggers to win those customers back.",
    metric: { value: "654", label: "downgrades traced to their cause" },
    challenge:
      "A healthtech SaaS company was losing paying customers and couldn't see where.",
    built: [
      "Mixpanel instrumentation and cohort definitions",
      "Iterable journeys for activation and retention",
      "Trigger-based win-back flows for customers who downgraded",
    ],
    outcome: [
      "A clear funnel: 70.5% of sign-ins booked and 65.3% completed",
      "654 downgrades traced to billing drop-off, then targeted for win-back",
    ],
    stack: ["Mixpanel", "Iterable", "Segment"],
    pillars: ["trace", "learn"],
    services: ["systems-build", "audit"],
    templates: ["hubspot-onboarding-lifecycle"],
    accent: "#14B8A6",
  },
  {
    slug: "hibreed",
    client: "Hibreed",
    title: "Lifecycle campaigns that raised course completion",
    line: "companies",
    year: "2023 – 2024",
    role: "Product and customer success manager",
    location: "Canada",
    summary: "Behavioural analytics and lifecycle campaigns run from Monday.com.",
    metric: { value: "+25%", label: "course completion" },
    challenge: "Learners enrolled and then faded away. There was no system for spotting who was slipping.",
    built: [
      "Behavioural tracking for every learner",
      "Lifecycle campaigns triggered by each learner's progress",
      "Monday.com boards for the success team",
    ],
    outcome: ["Course completion up 25%"],
    stack: ["Monday.com", "Email automation", "Analytics"],
    pillars: ["learn", "care"],
    services: ["systems-build"],
    templates: ["monday-course-delivery"],
    accent: "#FF3D57",
  },
  {
    slug: "elsa-proptech",
    client: "Elsa Proptech",
    title: "HubSpot Sales Hub, built from scratch",
    line: "companies",
    year: "2022 – 2023",
    role: "CRM automation expert",
    location: "London, UK",
    summary: "A full HubSpot Sales Hub build with lead-qualification and lifecycle workflows.",
    metric: { value: "~40%", label: "less manual sales effort" },
    challenge: "Leads lived in inboxes and spreadsheets, and qualification was done by hand.",
    built: ["The HubSpot Sales Hub set-up and pipeline design", "Lead-qualification workflows", "Lifecycle-stage flows for retention"],
    outcome: ["Manual sales effort down by about 40%", "Better retention through lifecycle-stage flows"],
    stack: ["HubSpot Sales Hub"],
    pillars: ["trace"],
    services: ["systems-build"],
    templates: ["hubspot-b2b-pipeline", "ghl-real-estate"],
    accent: "#FF7A59",
  },
  {
    slug: "kobocent",
    client: "Kobocent",
    title: "A payments platform on stablecoin rails",
    line: "products",
    year: "2025 – present",
    role: "Our venture: designed, built and run in-house",
    location: "Built in Abuja, for emerging markets",
    summary:
      "Buy stablecoins with local currency, send across borders, pay bills, withdraw to a bank, trade and earn: on Telegram, on the web and on your phone.",
    metric: { value: "Multichain", label: "powered by stablecoins" },
    challenge:
      "People in emerging markets earn in local currency, get paid across borders and lose money at every step. Crypto rails are fast and cheap but hard to use. The job was to make stablecoins feel like a bank account, and to keep each user's money safe.",
    built: [
      "Wallets on Solana and EVM chains, created when the account is",
      "Bank withdrawals, bill payments, airtime and cross-chain bridges, with the treasury paying network fees on payment paths",
      "A Telegram bot, a web app and an installable app, all driven by the same backend",
      "Account freezing, security questions and cooling-off periods for new payout destinations",
      "Settlers that check payout status with the payment provider when a webhook is late, so each answer is applied exactly once",
    ],
    outcome: [
      "Live at kobocent.com and on Telegram",
      "Your keys are encrypted, and only you can trigger a transaction",
      "Gasless payments, bills, withdrawals and stablecoin transfers",
    ],
    stack: ["Node.js", "PostgreSQL", "Next.js", "Solana", "EVM", "Flutterwave", "Telegram"],
    pillars: ["secure", "trace", "care"],
    links: [{ label: "kobocent.com", href: "https://kobocent.com" }],
    services: ["product-build"],
    templates: ["make-payment-alerts"],
    featured: true,
    accent: "#C1502E",
  },
  {
    slug: "quantumhire",
    client: "QuantumHire",
    title: "Eight AI agents that run a whole job search",
    line: "products",
    year: "2026 – present",
    role: "Our venture: designed, built and run in-house",
    location: "For job seekers in Africa and other emerging markets",
    summary:
      "Finds jobs that fit, scores each one, tailors a CV and cover letter, and submits the application only after the person approves, with proof of every submission.",
    metric: { value: "8", label: "AI agents in production" },
    challenge:
      "Talented people in emerging markets lose jobs to time, not to skill. A strong application takes hours, and the tools that exist are priced in dollars and stop at a list of jobs.",
    built: [
      "Eight agents on reliable queues: Profiler, Scanner, Evaluator, Tailor, Applicator, the check, Coach and Growth",
      "A browser form engine that fills real forms on Greenhouse, Lever, Ashby, Workday and iCIMS",
      "A score from 10 weighted factors across 47 career families, explained to the user",
      "A live hand-off that streams a human check to the person's phone, so the agent never bypasses bot protection",
      "QuantX, an in-app copilot using Claude tool calling",
      "Payments in naira and in crypto, each checked on-chain",
    ],
    outcome: [
      "Thousands of new jobs read every day, with 9,700 scanned in one week of October 2026",
      "An application counts as submitted only when the employer's confirmation is seen, with a screenshot kept as proof",
      "Nothing in a CV is invented: the agents reorder and reword, they never make things up",
    ],
    stack: ["Claude", "Python", "Next.js", "PostgreSQL", "Redis", "Playwright"],
    pillars: ["learn", "trace", "care", "secure"],
    links: [{ label: "quantumhire.co", href: "https://quantumhire.co" }],
    services: ["ai-agents", "product-build"],
    templates: ["airtable-recruitment-scheduling"],
    featured: true,
    accent: "#6D5BFF",
  },
  {
    slug: "clickshift-alpha",
    client: "ClickShift Labs",
    title: "Alpha: a DeFi analysis agent",
    line: "products",
    year: "2025",
    role: "Our lab product",
    location: "Solana",
    summary:
      "A token analysis agent with rug-pull detection and whale tracking. It was entered in the Nosana x ElizaOS Builders Challenge.",
    challenge: "On-chain traders were losing money to rug pulls and couldn't read risk fast enough.",
    built: ["An ElizaOS agent that analyses tokens and checks them for rug pulls", "Whale-flow tracking and RSI signals", "A web interface for people, using the same intelligence"],
    outcome: ["Live at alpha.clickshift.io", "Our first agent shipped to production"],
    stack: ["ElizaOS", "Docker", "Solana RPC"],
    pillars: ["secure", "learn"],
    links: [{ label: "alpha.clickshift.io", href: "https://alpha.clickshift.io" }],
    services: ["ai-agents"],
    accent: "#D4FF3A",
  },
  {
    slug: "clickshift-leverage",
    client: "ClickShift Labs",
    title: "Leverage: futures risk calculator",
    line: "products",
    year: "2025",
    role: "Our lab product",
    location: "Web",
    summary: "A futures calculator with MACD and OBV signals, built around one thing: keeping the trader away from liquidation.",
    challenge: "Leverage traders found out where their liquidation price was only after they'd been liquidated.",
    built: ["Position sizing and liquidation maths", "Combined MACD and OBV signals", "Guardrails that warn before risk gets out of hand"],
    outcome: ["Live at leverage.clickshift.io"],
    stack: ["Next.js", "Market data APIs"],
    pillars: ["secure"],
    links: [{ label: "leverage.clickshift.io", href: "https://leverage.clickshift.io" }],
    services: ["product-build"],
    accent: "#D4FF3A",
  },
  {
    slug: "pulse-agentic-wallet",
    client: "ClickShift Labs",
    title: "Pulse: six agents, one vault",
    line: "products",
    year: "2025",
    role: "Our lab product (archived)",
    location: "Solana",
    summary:
      "An agentic wallet OS: an orchestrator coordinating DCA, trailing-stop, scout, risk and off-ramp agents over one vault, driven by plain-language commands.",
    challenge: "Could a wallet run a strategy while its owner sleeps, without giving up safety?",
    built: [
      "An orchestrator that turns natural language into agent tasks",
      "DCA, trailing-stop, scout and off-ramp agents",
      "A risk manager that can stop every agent at once",
    ],
    outcome: ["The agent architecture behind our later multi-agent products, QuantumHire among them"],
    stack: ["TypeScript", "Jupiter", "Solana"],
    pillars: ["secure", "learn"],
    services: ["ai-agents"],
    accent: "#D4FF3A",
  },
  {
    slug: "sppg-digital-library",
    client: "School of Politics, Policy and Governance",
    title: "A digital library with tiered access",
    line: "institutions",
    role: "Built and deployed",
    location: "Nigeria",
    summary:
      "Department libraries with separate locked areas for leadership and finance, plus Zoom scheduling, recordings and an institutional calendar.",
    metric: { value: "70%", label: "live within one week" },
    challenge: "Knowledge was scattered across drives and inboxes, and some of it was confidential.",
    built: ["Libraries per department, with tiered access control", "Zoom scheduling and recordings in the library", "An institutional calendar"],
    outcome: ["70% of the platform live within a week", "Content across the institution became much easier to find"],
    stack: ["Next.js", "TypeScript", "Access control"],
    pillars: ["secure", "learn"],
    services: ["systems-build"],
    accent: "#0E7C66",
  },
  {
    slug: "edu-data",
    client: "DO Take Action",
    title: "Edu-Data: a public education data portal",
    line: "institutions",
    year: "2023 – 2024",
    role: "Designed and built the MVP",
    location: "Nigeria",
    summary:
      "Pulls public education data on enrolment, funding and infrastructure from scattered government sources into one dashboard ready for decisions.",
    challenge: "Policy debates ran on guesses because the data sat in dozens of PDFs and portals.",
    built: ["Python crawlers on scheduled refreshes", "A PostgreSQL warehouse and a Next.js dashboard", "A phased roadmap for compliance scoring and monthly briefs"],
    outcome: ["A fundable MVP ready for stakeholders", "A full architecture scoped and phased for funded build-out"],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Python", "Nginx", "PM2"],
    pillars: ["trace", "learn"],
    links: [{ label: "Edu-Data", href: "https://dotakeaction.org/edudata/" }],
    services: ["product-build"],
    accent: "#2E44FF",
  },
  {
    slug: "dc-connect",
    client: "Dominion City",
    title: "DC Connect: newcomer follow-up for a congregation",
    line: "institutions",
    role: "Built and runs it",
    location: "Abuja, Nigeria",
    summary: "Newcomer registration, portals for cell leaders and weekly reports, so nobody who visits is forgotten.",
    challenge: "Newcomers filled in paper cards, and follow-up depended on someone remembering.",
    built: ["Newcomer registration", "Cell-leader portals", "Automated weekly reports"],
    outcome: ["Every newcomer assigned and followed up"],
    stack: ["Next.js", "PostgreSQL", "Automation"],
    pillars: ["care"],
    services: ["systems-build"],
    accent: "#8B5CF6",
  },
];

export const caseBySlug = (slug: string) => CASES.find((c) => c.slug === slug);

// For the marquee: brands we've built for.
export const BRANDS = [
  "World Bank",
  "UN Women",
  "UK FCDO · Chevening",
  "EndGame",
  "DO Take Action",
  "Kobocent",
  "QuantumHire",
  "The BFG",
  "Digital Brothers",
  "Apex Armor",
  "CuraWell",
  "Hibreed",
  "Elsa Proptech",
  "SPPG",
  "Dominion City",
];

// Headline numbers. Each has a source in CASES above.
export const PROOF = [
  { value: "3,386", label: "women entrepreneurs served by programme systems we built", href: "/work/un-women-weeap" },
  { value: "4", label: "countries in a single programme rollout", href: "/work/un-women-weeap" },
  { value: "60%+", label: "less manual review, with a human at every decision", href: "/work/endgame-ai-admissions" },
  { value: "85%", label: "faster lead response", href: "/work/apex-armor" },
  { value: "$1,000 → <$200", label: "a year on Zoom storage", href: "/work/zoom-to-drive" },
  { value: "8", label: "AI agents running in production", href: "/work/quantumhire" },
];
