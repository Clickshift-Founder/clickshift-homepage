import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy" } };

const md = `ClickShift ("we") runs clickshift.io. This page explains what we collect on this website and why.

## What we collect

- **Project briefs:** when you send a brief, we store what you wrote (name, email, organisation, budget, timeline and message) in our own database so we can reply and follow up. We send you an automatic confirmation by email through our email provider, Resend.
- **Newsletter sign-ups:** your email address, stored in our own database so we can send the Journal. Every email has an unsubscribe link, and you can ask us to remove you at any time.
- **Our own visitor analytics:** which pages are visited, for how long, how far down the page, the site that referred you, your device type, browser and approximate location (country and city, worked out by our hosting provider from your connection). We do **not** store your IP address and we do **not** use cookies for this. Your browser keeps a random identifier so we can count returning visitors; you can clear it at any time by clearing this site's data. If your browser sends **Do Not Track** or **Global Privacy Control**, we don't record your visit at all.
- **Google Analytics:** also records pages visited, device type and approximate location, using its own cookies.
- If you send a brief from the same browser, we can see which pages you read before writing to us. We use this only to answer you better.

## What we don't do

- We don't sell or rent personal data.
- We don't use your data to train AI models.
- We keep analytics for as long as it is useful to understand trends, and briefs for as long as we are in conversation with you or have a working relationship.

## Client work

When we build systems for clients, their data is handled under a separate written agreement with each client, including the privacy controls described in our case studies.

## Your rights

You can ask us to see, correct or delete any personal data we hold about you. Write to [${SITE.email}](mailto:${SITE.email}). Under Nigeria's Data Protection Act 2023, the UK GDPR and the EU GDPR, you can also complain to your data protection authority.`;

export default function Privacy() {
  return <LegalPage title="Privacy" updated="12 November 2026" md={md} />;
}
