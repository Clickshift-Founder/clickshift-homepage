import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Terms", alternates: { canonical: "/terms" } };

const md = `These terms cover your use of clickshift.io. Each client project is governed by its own written proposal or agreement, which takes priority over this page.

## Prices

Prices on this site are in US dollars and are starting points unless marked "fixed". Every project gets a written quote before work begins. We invoice in USD or in naira at the day's rate.

## Templates

Templates marked "coming soon" are not yet for sale. Reserving one is not a purchase and costs nothing. When a template goes on sale, its own licence terms will apply.

## Case studies and figures

Each case study states our role. Figures come from project records, our founder's work history, or the public sources linked on the page.

## Content

The articles and designs on this site belong to ClickShift. You're welcome to quote short passages with a link back.

## Contact

Questions: [${SITE.email}](mailto:${SITE.email}).`;

export default function Terms() {
  return <LegalPage title="Terms" updated="12 November 2026" md={md} />;
}
