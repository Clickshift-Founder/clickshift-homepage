// Email templates for the admin composer and the automatic acknowledgement.
// Placeholders: {first} {name} {company} {service} {item} {budget} {timeline} {message} {price} {link}
// The composer picks the template that matches the enquiry's service, fills the placeholders, and you edit before sending.

import { SERVICES } from "./services";
import { TEMPLATES } from "./templates";
import { SITE } from "./site";

export type EnquiryLike = {
  name: string;
  email: string;
  company?: string | null;
  service?: string | null;
  item?: string | null;
  budget_label?: string | null;
  timeline?: string | null;
  message?: string | null;
  priority?: boolean;
};

export type EmailTemplate = { key: string; label: string; subject: string; body: string };

const SIGN = `Best regards,
The ClickShift team
${SITE.url.replace("https://", "")}`;

export const TEMPLATES_EMAIL: EmailTemplate[] = [
  {
    key: "reply-general",
    label: "First reply: general",
    subject: "Re: your enquiry to ClickShift",
    body: `Hi {first},

Thank you for reaching out about {service}. We've read your note:

"{message}"

To give you a useful answer, could you tell us a little more?
- What happens today, step by step, and who does it?
- Which tools are involved?
- What would "done" look like for you?

Or, if it's easier, reply with two or three times that suit you this week and we'll set up a 30-minute call.

${SIGN}`,
  },
  {
    key: "reply-audit",
    label: "Automation Audit: next steps",
    subject: "Your Automation Audit: next steps",
    body: `Hi {first},

Thanks for booking interest in an Automation Audit ({price}).

Here's how it works:
1. A 45-minute call where you walk us through how work moves today.
2. We map every manual step and estimate the hours and money it costs.
3. Within 5 working days you get a ranked list of what to automate first, the tools to use, and a fixed quote for each.

The audit fee is credited in full if you go ahead with a build within 60 days.

Reply with two or three times that suit you and we'll send an invitation.

${SIGN}`,
  },
  {
    key: "reply-build",
    label: "Build / workflow: scoping call",
    subject: "Scoping your {service}",
    body: `Hi {first},

Thanks for the details on your {service}{company_suffix}. This is the kind of work we do every week.

Next step is a 30-minute scoping call, where we'll agree:
- the exact outcome and how we'll measure it
- the tools and data involved
- timeline and a fixed price

Budget you mentioned: {budget}. Timeline: {timeline}.

Could you share two or three times that suit you this week?

${SIGN}`,
  },
  {
    key: "reply-priority",
    label: "Priority: lead engineer call",
    subject: "Let's talk about your project",
    body: `Hi {first},

Thank you for your enquiry. Given the scope of what you've described, it has gone straight to our lead engineer.

We'd like to speak this week to understand the goal, the constraints and how you'll measure success. You'll leave the call with a clear plan, whether or not we work together.

Could you reply with a phone number and two or three times that suit you?

${SIGN}`,
  },
  {
    key: "reply-programme",
    label: "Programme technology",
    subject: "Technology for your programme",
    body: `Hi {first},

Thank you for thinking of us for your programme. We've delivered platforms, beneficiary CRMs and M&E dashboards for programmes funded by the World Bank, UN Women and the UK FCDO's Chevening network.

To prepare a proposal, could you share:
- the programme's goal, countries and number of beneficiaries
- the timeline and the funder's reporting requirements
- any systems already in place

Happy to start with a call. Reply with times that suit you.

${SIGN}`,
  },
  {
    key: "reply-template",
    label: "Template reservation",
    subject: "Your template reservation: {item}",
    body: `Hi {first},

Thanks for reserving {item}. You're on the early list, which means 40% off when it opens.

We'll email you as soon as it's ready to install. If you'd like it set up in your account by our team, just reply and we'll add the set-up service.

${SIGN}`,
  },
  {
    key: "follow-up",
    label: "Follow-up (no reply yet)",
    subject: "Following up on your enquiry",
    body: `Hi {first},

Just following up on your enquiry about {service}. Is this still something you're working on?

If the timing isn't right, no problem. Reply "later" and we'll check back in a few months.

${SIGN}`,
  },
  {
    key: "not-a-fit",
    label: "Not a fit (kind decline)",
    subject: "Re: your enquiry",
    body: `Hi {first},

Thank you for considering ClickShift. Having read your brief, we don't think we're the best fit for this one, and we'd rather tell you now than waste your time.

{suggestion}

We wish you every success with it.

${SIGN}`,
  },
  {
    key: "blank",
    label: "Blank email",
    subject: "",
    body: `Hi {first},



${SIGN}`,
  },
];

export function serviceName(slug?: string | null) {
  if (!slug) return "your project";
  if (slug === "template") return "a CRM template";
  if (slug === "other") return "your project";
  return SERVICES.find((s) => s.slug === slug)?.name ?? slug;
}

export function itemName(slug?: string | null) {
  if (!slug) return "";
  if (slug === "bundle") return "the All-Access template library";
  if (slug === "setup") return "template set-up";
  return TEMPLATES.find((t) => t.slug === slug)?.name ?? slug;
}

/** The template that best fits an enquiry. */
export function defaultTemplateKey(e: EnquiryLike) {
  if (e.priority) return "reply-priority";
  if (e.service === "template") return "reply-template";
  if (e.service === "audit") return "reply-audit";
  if (e.service === "programme-tech") return "reply-programme";
  if (e.service && e.service !== "other") return "reply-build";
  return "reply-general";
}

export function fill(text: string, e: EnquiryLike) {
  const first = (e.name || "").trim().split(/\s+/)[0] || "there";
  const svc = SERVICES.find((s) => s.slug === e.service);
  const excerpt = (e.message ?? "").trim().replace(/\s+/g, " ");
  const map: Record<string, string> = {
    first,
    name: e.name || "",
    company: e.company || "your team",
    company_suffix: e.company ? ` at ${e.company}` : "",
    service: serviceName(e.service),
    item: itemName(e.item) || "the template",
    budget: e.budget_label || "not stated",
    timeline: e.timeline || "not stated",
    message: excerpt.length > 280 ? excerpt.slice(0, 277) + "..." : excerpt,
    price: svc?.price ?? "",
    link: SITE.url,
    suggestion: "",
  };
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in map ? map[k] : m));
}

/** The automatic acknowledgement every enquiry receives. */
export function ackEmail(e: EnquiryLike) {
  const first = (e.name || "").trim().split(/\s+/)[0] || "there";
  const lines = [
    `Hi ${first},`,
    "",
    `Thank you for contacting ClickShift about ${serviceName(e.service)}${e.service === "template" && e.item ? ` (${itemName(e.item)})` : ""}. Your brief has reached us, and a real person will reply within one working day.`,
    "",
    e.priority
      ? "Because of the scope you described, your brief has gone straight to our lead engineer."
      : "While you wait, you might like to see how we've solved similar problems:",
    e.priority ? "" : `${SITE.url}/work`,
    "",
    "For your records, here is what you sent:",
    "",
    (e.message ?? "").trim(),
    "",
    "If you have anything to add, just reply to this email.",
    "",
    SIGN,
  ];
  return {
    subject: "We've received your brief",
    text: lines
      .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
      .join("\n"),
  };
}
