import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy" } };

const md = `ClickShift ("we") runs clickshift.io. This page explains what we collect on this website and why.

## What we collect

- **Newsletter sign-ups:** your email address, stored with our email provider (Brevo) so we can send the Journal. Every email has an unsubscribe link.
- **Project briefs:** the contact form does not store anything on this site. It opens your own email app, and we receive what you choose to send.
- **Analytics:** Google Analytics records pages visited, device type and approximate location, so we can improve the site. It doesn't tell us who you are.

## What we don't do

- We don't sell or rent personal data.
- We don't use your data to train AI models.

## Client work

When we build systems for clients, their data is handled under a separate written agreement with each client, including the privacy controls described in our case studies.

## Your rights

You can ask us to see, correct or delete any personal data we hold about you. Write to [${SITE.email}](mailto:${SITE.email}). Under Nigeria's Data Protection Act 2023, the UK GDPR and the EU GDPR, you can also complain to your data protection authority.`;

export default function Privacy() {
  return <LegalPage title="Privacy" updated="12 November 2026" md={md} />;
}
