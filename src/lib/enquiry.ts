// Shared by the contact form (client) and the enquiry API (server).
// A lead at or above PRIORITY_BUDGET_USD is flagged priority: it is marked in the admin, the acknowledgement says it went
// to the lead engineer, and (optionally) a Telegram alert fires. The same rule we built for Apex Armor.

export const PRIORITY_BUDGET_USD = 2000;

export const BUDGET_OPTIONS: { label: string; usd: number | null }[] = [
  { label: "Under $1,000", usd: 500 },
  { label: "$1,000 – $2,000", usd: 1000 },
  { label: "$2,000 – $5,000", usd: 2000 },
  { label: "$5,000 – $15,000", usd: 5000 },
  { label: "$15,000+", usd: 15000 },
  { label: "Not sure yet", usd: null },
];

export const TIMELINES = ["As soon as possible", "Within a month", "This quarter", "Just exploring"];

export const ENQUIRY_STATUSES = [
  { key: "new", label: "New" },
  { key: "replied", label: "Replied" },
  { key: "call", label: "Call booked" },
  { key: "proposal", label: "Proposal sent" },
  { key: "won", label: "Won" },
  { key: "lost", label: "Lost" },
  { key: "spam", label: "Spam" },
] as const;
