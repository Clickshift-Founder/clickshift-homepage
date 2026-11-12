// The ClickShift Journal. Bodies use a small Markdown subset rendered by src/components/Prose.tsx:
// ## heading, ### subheading, paragraphs, - lists, 1. lists, > quotes, **bold**, *italic*, [text](url).
// Old Web3 posts redirect here (next.config.ts). Numbers must come from a case in work.ts.

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: "The 2045 Standard" | "Automation" | "AI" | "CRM" | "Programmes" | "Building";
  date: string; // ISO
  readMinutes: number;
  body: string;
  cases?: string[];
  services?: string[];
  originally?: { label: string; href?: string };
  featured?: boolean;
};

const AUTHOR = "Emmanuel Ohanwe";
export const POST_AUTHOR = AUTHOR;

export const POSTS: Post[] = [
  {
    slug: "what-kind-of-products-will-survive-2045",
    title: "What kind of products will survive 2045?",
    description:
      "Ray Kurzweil put the singularity at 2045. Whatever you think of the prediction, it is a useful test: which products will still deserve to exist? Five pillars: learn, secure, trace, sustain, care.",
    category: "The 2045 Standard",
    date: "2026-11-12",
    readMinutes: 6,
    featured: true,
    originally: { label: "First published on Medium, 18 April 2025. Revised for ClickShift." },
    cases: ["quantumhire", "kobocent", "chevening-fcdo-sweeap"],
    services: ["product-build"],
    body: `I travelled in thought into 2045 and came back with a question for anyone building products today: **if it were 2045, what would you build, and what would survive?**

Ray Kurzweil predicts a runaway cycle of self-improving machines by 2045, a point he calls the technological singularity. You don't have to accept the date to see the direction. Disruptions used to come once a century. We have now lived through several in one decade.

A few years ago, large language models were a research topic. Today anyone can type a prompt and get a working draft back. You don't need to understand supervised learning or RLHF to use them. Consumers will ride each wave as long as they can pay for it. Builders don't get that luxury. We have to decide now what our products will mean when the ground moves again.

## Yesterday lazy, today enablers, tomorrow traitors?

During a late-night study session I had a thought that sent a chill down my spine. Decades ago our computers were lazy and dull. Today they are enablers. Tomorrow they could be traitors.

We went from vacuum tubes to integrated circuits. Next come quantum computers, and for all their promise they put payment security, private keys and the trust model of blockchains at risk. A product that ignores that is building on sand.

I agree with Marily Nika's line on Lenny's Podcast: *"Every product should be an AI product, and every PM should be an AI product manager."* But being an AI product is not enough. It has to be one people can still trust when the machines are far more capable than they are today.

## The five pillars

The products that survive 2045 will **learn, secure, trace, sustain and care**. At ClickShift we turned these into a checklist that every build has to pass. We call it [the 2045 Standard](/standard).

### 1. Learn
A product that can't learn gets left behind. In [QuantumHire](/work/quantumhire), the outcomes a job seeker reports adjust how future jobs are scored, and lasting preferences are remembered. The product gets better because people use it.

### 2. Secure
Security is not a feature you add before launch. In [Kobocent](/work/kobocent), an account can be frozen if a phone is lost, and a frozen account's keys can't sign anything at all. Keys are encrypted, and only the user can trigger a transaction.

### 3. Trace
Trust comes from proof. QuantumHire counts an application as submitted only when it sees the employer's confirmation, and keeps a screenshot. Our programme systems for the [World Bank, UN Women and FCDO-funded programmes](/work/chevening-fcdo-sweeap) were built so that every number in a donor report can be traced back to a person and a date.

### 4. Sustain
The products that last are the ones that are cheap to keep alive. We run production systems on free and low-cost infrastructure. One [automation](/work/zoom-to-drive) costs nothing to host, and it cut a Zoom bill from about $1,000 a year to under $200.

### 5. Care
Empathy is a design input. In the women's programmes, privacy controls for sensitive data were built in from the start. In QuantumHire, the agents never invent a degree or an employer. They only reorder and reword what is true.

## Build, and build with intention

There is only one way to take part in this evolution: build, and build fast. Move fast, break ceilings, pick up the pieces and push on. If you don't build today, someone will disrupt your idea tomorrow, and the experience you gather now is what will carry you through the next disruption.

But don't just chase trends. **Build for resilience.** Design products that adapt, protect and serve real human needs when everything is uncertain. The builders who survive disruption will be the ones who build on purpose, lead clearly and never lose sight of the people they build for.

That is why ClickShift exists: a factory for solutions that are still worth using in 2045. If you have one to build, [let's talk](/contact).`,
  },
  {
    slug: "how-we-cut-a-1000-zoom-bill-to-under-200",
    title: "How we cut a $1,000 Zoom bill to under $200 with one unattended script",
    description:
      "Cloud recordings were quietly forcing a bigger Zoom plan. A small archive pipeline on free infrastructure fixed it for good. Here is the design, step by step.",
    category: "Automation",
    date: "2026-11-12",
    readMinutes: 5,
    cases: ["zoom-to-drive"],
    services: ["single-workflow", "audit"],
    body: `The most valuable automations are often the dullest. This one moves files. It also saves more than ₦1 million a year.

## The problem nobody owned

An education team recorded every class and meeting to Zoom's cloud. Recordings piled up, storage filled, and the only way to keep recording was a larger plan: about **$1,000 a year** just for storage. Someone was meant to download old recordings and move them to Google Drive. In practice nobody did, because it took hours and nobody owned it.

That is the classic shape of an automation opportunity: **a repeated task, with a clear rule, that people put off.**

## The design

We wrote it in five parts, each one there to stop a specific failure.

1. **Find.** A Python job asks the Zoom Cloud Recording API for new recordings: video files and chat transcripts.
2. **Copy.** Each file streams to Google Drive, filed by date and meeting name, so it is easier to find than it was in Zoom.
3. **Verify.** Before anything is deleted, the job compares the copy with the original. If they don't match, nothing is deleted and someone is told.
4. **Free up storage.** Only after a verified copy does the job delete the recording from Zoom. This step is optional and can be switched off.
5. **Remember.** A migration log records every file it has handled, so a crash or a rerun never copies a file twice and never loses one.

It runs on a cron schedule on Oracle Cloud's Always Free tier. **Hosting costs nothing.**

## The result

The Zoom bill dropped from about $1,000 a year to **under $200**. The manual download-and-upload job disappeared. Recordings became easier to find. It has run unattended ever since.

## What to take from it

- **Verify before you delete.** An automation that deletes is the one that can hurt you. Make deletion depend on proof.
- **Keep a ledger.** Any job that moves things needs a record of what it has already moved. That is what makes it safe to run again.
- **Pick boring infrastructure.** A cron job on a free VM will outlive most no-code subscriptions.
- **Price the problem first.** We could quote the saving before writing any code. That is the point of an [Automation Audit](/automation#audit).

Want this workflow without building it? It is in our template library as the [Zoom → Google Drive Archiver](/templates).`,
  },
  {
    slug: "make-vs-zapier-vs-n8n",
    title: "Make vs Zapier vs n8n: how to choose an automation platform that lasts",
    description:
      "We've built production workflows on all three, and in plain code. A practical guide to choosing by cost curve, failure handling and lock-in, not by the feature list.",
    category: "Automation",
    date: "2026-11-12",
    readMinutes: 6,
    cases: ["endgame-ai-admissions", "the-bfg", "zoom-to-drive"],
    services: ["audit", "single-workflow"],
    body: `Every comparison of automation tools lists integrations. That is the least useful way to choose. After running production workflows on Make, Zapier, n8n and custom code, for programmes, startups and enterprise sales teams, these are the questions that actually decide it.

## 1. What does it cost at ten times your volume?

Pricing is per task (Zapier), per operation (Make) or per execution, or free if you host it yourself (n8n). A workflow that looks cheap at 1,000 runs a month can cost a lot at 50,000. **Model your growth before you commit.** For high-volume, simple jobs, a script on a cheap server often beats all three. That is how our [Zoom archiver](/work/zoom-to-drive) costs nothing to run.

## 2. What happens when a step fails?

This matters more than anything else. Ask:
- Does it retry automatically, and can you control how?
- Do you get an alert, or do you find out from an angry customer?
- Can you rerun one failed item without rerunning everything?

Make's error handlers and its ability to store incomplete executions are strong. n8n gives you full control but expects you to build it. Zapier is the easiest to start with and the hardest to make strict.

## 3. How complex is the logic?

- **Zapier:** best for linear "when X, do Y" flows that non-technical teams will own.
- **Make:** best for branching, iterating over arrays and calling AI models in the middle of a flow. Our [AI admissions review](/work/endgame-ai-admissions) and [The BFG's lead scoring](/work/the-bfg) both run on Make.
- **n8n:** best when you need code inside the flow, self-hosting for data rules, or no per-run cost.
- **Custom code:** best when the workflow is core to your business and will run millions of times.

## 4. Where does your data have to live?

Programmes funded by donors often have data-protection rules. Self-hosted n8n keeps beneficiary data on infrastructure you control. Hosted tools pass it through someone else's servers. Know your rules first.

## 5. Who maintains it in a year?

The best platform is the one your team can still understand after the person who built it has left. Document every scenario. Name every step. Keep a runbook.

## Our default

- **Start with Make** for most business workflows.
- **Use Zapier** when the client's team will own and edit the flows themselves.
- **Use n8n** when data has to stay in-house or volume makes per-run pricing painful.
- **Write code** when the workflow *is* the product.

Not sure which fits? An [Automation Audit](/automation#audit) ends with a tool recommendation and the reasons for it.`,
  },
  {
    slug: "speed-to-lead-85-percent-faster",
    title: "Speed to lead: how routing by deal value made response 85% faster",
    description:
      "Most companies treat every lead the same, so the best leads wait the longest. A simple routing rule changed that for a California manufacturer.",
    category: "CRM",
    date: "2026-11-12",
    readMinutes: 4,
    cases: ["apex-armor", "the-bfg"],
    services: ["single-workflow", "systems-build"],
    body: `There is one metric that predicts sales outcomes better than almost any other: **how fast you respond to a new lead.** Buyers contact several sellers, and the first credible reply usually sets the terms.

## The problem: one queue for everyone

[Apex Armor](/work/apex-armor), an RV manufacturer in California, put every enquiry into the same queue. A $40 accessory question and a five-figure build waited in the same line, and by the time a big buyer heard back, they had often moved on.

## The fix: route by value, automate the rest

We built two lanes:

1. **High value.** Any lead worth more than **$2,000** goes straight to the CEO, with the context they need to call back immediately.
2. **Everyone else** enters automated email, SMS and call sequences that answer quickly, qualify the lead and book the next step.

Every lead's response time is tracked, so the improvement could be measured rather than assumed.

**Result: lead response time improved by 85%.**

## How to apply it in your business

- **Define value early.** Add one or two qualifying questions to your form (budget, timeline, size) so routing can happen the moment the lead arrives.
- **Give your best leads to a person.** Automation is for scale. Your biggest opportunities deserve a human, fast.
- **Answer everyone else in minutes.** An instant, useful reply by SMS or email beats a perfect reply tomorrow.
- **Measure response time per lead.** If you can't see it, you can't improve it.

## Going further with AI

For complex B2B leads, value isn't one field. At [The BFG](/work/the-bfg) we used the Claude API to read each enterprise lead and write an IT Readiness Score back to the CRM, replacing 3 to 5 hours of manual review per lead. Pre-sales review time fell by 65%.

Want this funnel ready-made? See the [Lead-to-Booking Funnel](/templates) template for GoHighLevel, or have us [build it with you](/automation).`,
  },
  {
    slug: "ai-review-with-a-human-at-every-decision",
    title: "AI review with a human at every decision: how we cut review time by 60%",
    description:
      "AI can read hundreds of applications in minutes. It shouldn't decide who gets in. How we designed an admissions workflow that is faster and fairer, and still human.",
    category: "AI",
    date: "2026-11-12",
    readMinutes: 6,
    cases: ["endgame-ai-admissions"],
    services: ["ai-agents"],
    body: `"Let the AI decide" is the fastest way to lose trust in an AI project. "The AI does the reading, a person decides" is how you get real speed without that cost.

## The situation

An education organisation received hundreds of applications a cycle, each with a personal statement and recommendation letters. A small team read everything by hand. Reviews were slow, and two reviewers could score the same application very differently.

## What we built

A two-level review workflow on Make, Airtable and the OpenAI and Claude APIs.

**First level: AI reads, a person decides.**
- Each personal statement is scored against a published rubric.
- Recommendation letters are checked: that they are there, that they are relevant and that they are consistent.
- The model writes comments in the voice of a calibrated reviewer persona, so the feedback reads like the organisation's own.
- **A person triggers the run and reviews the output.** Edge cases are sent to a senior reviewer.

**Second level: values, weighted.**
Shortlisted candidates are assessed on a weighted **character, competence and capacity** framework, again with a person making the call.

## Results

- **Manual review time down by more than 60%.**
- The same explainable criteria applied to every application.
- Faster decisions, with the human judgement kept where it belongs.

## Five design rules we now use on every AI review system

1. **Publish the rubric.** If you can't write down what good looks like, the model can't apply it and you can't audit it.
2. **Calibrate on real, already-decided cases.** Compare the AI's scores with past human decisions before going live.
3. **Make the human checkpoint impossible to skip.** The system should not be able to finalise a decision without a person.
4. **Log everything.** Inputs, outputs, model version and the reviewer's final call. That is your audit trail and your evaluation set.
5. **Design the escalation path first.** Know where the strange cases go before they arrive.

The same principles run through [QuantumHire](/work/quantumhire), where nothing is submitted without the user's approval.

We build these systems for admissions, lead triage, grant review and document intake. See [AI Agents & Review](/automation), or start with the [Admissions & Application Review](/templates) template for Airtable.`,
  },
  {
    slug: "what-3386-women-entrepreneurs-taught-us",
    title: "What 3,386 women entrepreneurs taught us about building for programmes",
    description:
      "Three donor-funded programmes, four countries, two languages. Lessons on building technology for development programmes that has to work for beneficiaries and stand up to auditors.",
    category: "Programmes",
    date: "2026-11-12",
    readMinutes: 7,
    featured: true,
    cases: ["un-women-weeap", "world-bank-sweep", "chevening-fcdo-sweeap"],
    services: ["programme-tech"],
    body: `Between 2023 and 2025, our founder led the technology for three programmes that helped women entrepreneurs win public contracts:

- **WEEAP**, sponsored by UN Women: [1,930 women](/work/un-women-weeap) in Nigeria, Senegal, Mali and Côte d'Ivoire.
- **SWEEP**, with the World Bank: [765 women](/work/world-bank-sweep) in Abuja.
- **SWEEAP**, run by the Chevening Alumni Association of Nigeria (Chevening is the UK FCDO's scholarship programme): [691 women](/work/chevening-fcdo-sweeap) in Kano and Rivers States.

That is **3,386 women entrepreneurs** in total. Here is what building for them taught us.

## 1. The beneficiary is the user. The donor is the auditor.

Programme technology has two audiences with different needs. A woman joining from a phone in Kano needs a simple, forgiving journey. The funder needs numbers that can be traced back to people and dates. **Design for the beneficiary, and instrument for the auditor.** If you serve only one of them, the programme fails the other.

## 2. Language is infrastructure

WEEAP ran in English and French, with faculty in Nigeria, Senegal and Mali. Translating the content is the easy part. Support, reminders, certificates and reports all have to work in both languages too. Plan bilingual from day one. Adding it later is a rebuild.

## 3. One record per woman, from application to outcome

The most important decision was one record per beneficiary that follows her from application through every session to her outcome. Attendance, completion, portal registration, bids submitted and contracts won all hang off that record. That is what made results like **SWEEAP's 88% completion rate** and contracts worth **₦2.2 million and ₦6.3 million** reportable with confidence.

## 4. Outcomes come after the course ends

Learning is not the goal. Winning work is. The programmes went past the classroom: they helped women register on e-procurement portals and kept tracking after the course. One WEEAP participant won a **US$9,000 grant** during the programme. During SWEEAP, Rivers State's procurement bureau committed to a **30% set-aside** for women-owned businesses.

## 5. Privacy is part of care

Data about women entrepreneurs (income, business status, sometimes personal circumstances) is sensitive. We built privacy controls aligned with the Women's Empowerment Principles from the start, not after a review asked for them.

## 6. Build so partners can run it without you

Every system was documented and field teams were trained. A programme ends, but its tools and data should outlive the grant.

## Building a programme?

We now offer this as a service: learning platform, beneficiary CRM, payments, M&E dashboards and donor-ready reporting. See [Programme Technology Partner](/automation), or start with the [Beneficiary CRM + M&E](/templates) template.`,
  },
  {
    slug: "reading-your-crm-lifecycle-stages",
    title: "How to read your CRM: a practical guide to lifecycle stages",
    description:
      "Your CRM already knows where revenue leaks. Lifecycle stages are how you make it tell you. A field guide from building HubSpot, Salesforce and Monday.com systems.",
    category: "CRM",
    date: "2026-11-12",
    readMinutes: 6,
    cases: ["curawell", "elsa-proptech", "hibreed"],
    services: ["systems-build"],
    body: `Most CRMs are full of contacts and empty of meaning. The fix is not more data. It is **a lifecycle that every record moves through, with rules everyone agrees on.**

## Start with the stages

A lifecycle that works for most B2B and service businesses:

1. **Subscriber**: knows you exist.
2. **Lead**: has shown interest (a form, a download, a reply).
3. **Qualified lead**: fits your criteria (budget, need, timing).
4. **Opportunity**: there is an active conversation about buying.
5. **Customer**: has paid.
6. **Active / at risk**: using the product, or showing signs of leaving.
7. **Advocate**: refers others or renews early.

**Write down what moves a record from one stage to the next.** "Filled the demo form" is a rule. "Seems interested" is not.

## Read the gaps, not the totals

Totals tell you little. **The conversion rate between each pair of stages tells you where the leak is.**

At [CuraWell](/work/curawell) we mapped a funnel of **20.7K sign-ins**: 70.5% went on to book and 65.3% completed. That was healthy. The real leak was further down: **654 downgrades** traced to drop-off at billing. Once we could see it, we could design a trigger-based win-back for exactly those customers.

## Automate the moves

When stage changes are manual, the data goes stale within a month. Automate them:
- Form submitted → Lead.
- Score above a threshold → Qualified lead, assigned to a person.
- Payment received → Customer, onboarding starts.
- No login for 14 days → At risk, success team alerted.

At [Elsa Proptech](/work/elsa-proptech), workflows like these, built into HubSpot Sales Hub from scratch, cut manual sales effort by about 40%. At [Hibreed](/work/hibreed), lifecycle campaigns run from Monday.com raised course completion by 25%.

## Keep marketing and sales in one picture

If marketing works in one tool and sales in another, sync lifecycle stages both ways, with clear rules for who wins a conflict. That is what we built for [The BFG](/work/the-bfg) between HubSpot and Salesforce.

## A five-minute health check

- Can you say, from the CRM, how many qualified leads you created last month?
- Does every customer have a lifecycle stage and an owner?
- Do you know your worst stage-to-stage conversion rate?

If any answer is "not really", a [Systems Build](/automation) will fix it, or start with a ready-made [lifecycle template](/templates).`,
  },
  {
    slug: "ten-automation-mistakes-beginners-make",
    title: "10 automation mistakes beginners make (and how to fix them)",
    description:
      "Most broken automations fail the same ten ways. A checklist from years of building and repairing workflows in Make, Zapier, n8n and code.",
    category: "Automation",
    date: "2026-11-12",
    readMinutes: 6,
    services: ["audit", "retainer"],
    cases: ["zoom-to-drive", "digital-brothers"],
    body: `We've built many automations and repaired many more. The broken ones nearly always fail in one of these ten ways.

## 1. Automating a broken process
If the manual process is unclear, automating it makes the mess faster. **Fix:** write the process down and agree it before you build.

## 2. Failing silently
The worst automation is one that stopped three weeks ago and nobody noticed. **Fix:** every workflow alerts a named person when it fails.

## 3. No retries
APIs time out. Webhooks arrive late. **Fix:** retry with increasing gaps, and make sure retries are safe (see mistake 4).

## 4. Doing things twice
A retried payment notification sends two receipts, or worse, two payouts. **Fix:** give every action an ID and check it before acting. We wrote [a whole piece on this](/blog/the-automation-mistake-that-pays-twice).

## 5. Deleting before verifying
Moving files? Copy, check, *then* delete. Our [Zoom archiver](/work/zoom-to-drive) never deletes a recording until the copy has been verified.

## 6. Hard-coding everything
Email addresses, thresholds and IDs buried inside steps. **Fix:** keep settings in one place (a config table or environment variables) so changes don't need a rebuild.

## 7. No log
When someone asks "did this run for customer X?", you need an answer. **Fix:** log inputs, outputs and decisions. At [Digital Brothers](/work/digital-brothers), every payment was classified and logged before anything else happened.

## 8. Putting secrets in the wrong place
API keys pasted into shared documents or committed to code. **Fix:** use the platform's credentials store, rotate keys, and never log them, not even in part.

## 9. Building for today's volume
The flow that handles 100 runs a month falls over at 10,000, or bankrupts you on per-task pricing. **Fix:** test at ten times today's volume and model the cost. See [Make vs Zapier vs n8n](/blog/make-vs-zapier-vs-n8n).

## 10. No owner and no documentation
The builder leaves and nobody dares touch it. **Fix:** a runbook, a walkthrough video and a named owner for every workflow.

## Want a second pair of eyes?
An [Automation Audit](/automation#audit) checks your existing workflows against this list and ranks the fixes. A [Retainer](/automation) keeps them healthy every month.`,
  },
  {
    slug: "the-automation-mistake-that-pays-twice",
    title: "The automation mistake that pays twice: idempotency in plain English",
    description:
      "Webhooks arrive twice. Answers arrive late. If your automation moves money, sends messages or creates records, this one idea will save you.",
    category: "Building",
    date: "2026-11-12",
    readMinutes: 6,
    cases: ["kobocent", "digital-brothers", "quantumhire"],
    services: ["systems-build", "product-build"],
    body: `There is a costly bug hiding in most automations that touch money: **acting on the same event twice.** It is easy to create and painful to clean up, and it is avoided with one idea that has an awkward name: *idempotency*.

## What goes wrong

Payment providers send webhooks to tell you a payment or payout succeeded or failed. But:
- The same webhook can arrive **more than once**.
- An answer can arrive **late**, sometimes days later.
- Your own retry can run **while the first attempt is still in flight**.

If your automation simply "does the thing" each time a message arrives, you get double receipts, double credits, or a refund issued for a payout that actually went through.

## The idea: the same input gives the same result, however many times

An operation is idempotent if running it twice has the same effect as running it once. In practice:

1. **Give every action a unique key**: the provider's transaction ID, or one you generate.
2. **Record the key before acting**, and check it first. Seen it already? Do nothing.
3. **Apply a final answer once.** When a payout's status changes from pending to final, update it only if it is still pending. In a database that is one conditional update, and it is enough to stop a second answer being applied.
4. **When the final answer changes, verify it.** If a provider later says "actually it failed", ask the provider's API directly before you act.

## Don't wait for the webhook

Webhooks get lost. Good systems also run a **settler**: a scheduled job that finds anything still open after a set time and asks the provider for the real status. In [Kobocent](/work/kobocent), withdrawals and bank transfers each have one. In [QuantumHire](/work/quantumhire), job queues retry at 30 seconds, 2 minutes and 10 minutes, with crash recovery that never submits an application twice.

## Don't say "done" until it's done

A "queued" response is not a success. A system that sends a receipt when the provider has only queued the payment will one day send a receipt for money that never arrived. Keep the record as *processing* until a final answer comes back.

## A checklist for any automation that moves money

- Unique key per action, checked before acting
- Final answers applied once, with a conditional update
- A changed final answer verified with the provider's API
- A settler for anything open too long
- "Queued" never shown as "paid"
- Every step logged, with no secrets in the logs

We build payment workflows this way for [fintech teams](/work/digital-brothers) and in our own products. If yours moves money, [let's review it](/contact).`,
  },
  {
    slug: "the-workforce-that-never-sleeps",
    title: "The workforce that never sleeps: AI agents in everyday operations",
    description:
      "AI agents aren't science fiction or chatbots. They are reliable, narrow workers you can supervise. Where they fit, where they don't, and how to run them safely.",
    category: "AI",
    date: "2026-11-12",
    readMinutes: 6,
    cases: ["quantumhire", "endgame-ai-admissions", "pulse-agentic-wallet"],
    services: ["ai-agents"],
    body: `An AI agent is not a robot employee. It is a program that uses a language model to carry out one narrow job: read, decide, act and report, inside rules you set. Used well, agents give a small team the output of a large one, around the clock.

## Where agents fit

The best candidates share three traits:
- **High volume.** The task repeats hundreds or thousands of times.
- **Judgement that can be written down.** A rubric, criteria, a style guide.
- **A checkable result.** You can tell whether the agent got it right.

Examples from our own work:
- **Reading and scoring:** applications ([60%+ less review time](/work/endgame-ai-admissions)) and enterprise leads ([65% less pre-sales review](/work/the-bfg)).
- **Finding and matching:** [QuantumHire's](/work/quantumhire) Scanner reads thousands of jobs a day, and its Evaluator scores each one on 10 weighted factors.
- **Drafting:** tailored CVs, reviewer comments, first-reply emails.
- **Doing:** filling real application forms, with the user's approval.

## Where they don't

- Decisions with legal, financial or human consequences that nobody reviews.
- Tasks where "good" can't be defined.
- Anything where a confident mistake costs more than the time saved.

## Six rules for running agents in production

1. **One agent, one job.** QuantumHire has eight agents (Profiler, Scanner, Evaluator, Tailor, Applicator, the check, Coach and Growth), not one that does everything.
2. **A human approves anything that matters.** Nothing is submitted without the user's approval.
3. **Prove the outcome.** An application counts only when the employer's confirmation is seen.
4. **Never let them invent.** QuantumHire's Tailor reorders and rewords. It never invents an employer, degree or result.
5. **Put them on queues.** Retries, a dead-letter queue for repeated failures, and crash recovery that never acts twice.
6. **Watch the cost.** Log every model call by agent and by user, and cap usage per plan. Use smaller models for scoring and larger ones for writing.

## Where it started for us

Our first multi-agent system was [Pulse](/work/pulse-agentic-wallet), an experiment with six agents over one wallet, with a risk manager that could stop all of them at once. Those lessons (narrow agents, a kill switch, proof of outcome) are now in every agent system we build.

If your team has a high-volume task with a clear rubric, it is probably an agent waiting to be built. See [AI Agents & Review](/automation).`,
  },
  {
    slug: "inside-quantumhire-eight-agents",
    title: "Eight agents, one job search: inside the architecture of QuantumHire",
    description:
      "How a team of AI agents finds jobs, tailors CVs and submits real applications, with the person in charge, proof of every submission and costs under control.",
    category: "Building",
    date: "2026-11-12",
    readMinutes: 7,
    cases: ["quantumhire"],
    services: ["product-build", "ai-agents"],
    body: `[QuantumHire](https://quantumhire.co) runs a person's whole job search: it finds jobs that fit, scores each one, writes a CV and cover letter for it, and submits the application only after the person approves. We built it for job seekers in Africa and other emerging markets, who compete for remote and global roles and lose them to time, not to skill.

## The relay: eight agents

Each application passes from one agent to the next:

1. **Profiler** learns the person through a chat or an uploaded CV: roles, skills, pay floor, locations, and the answers forms usually ask for.
2. **Scanner** reads thousands of new jobs a day from job boards, companies' own hiring systems, development and UN agencies, health employers and airlines. It drops stale and closed jobs *before* any AI cost.
3. **Evaluator** scores each job on **10 weighted factors** (role fit, skills, seniority, pay, location and more) across **47 career families**, and explains the score.
4. **Tailor** writes a CV and cover letter for each good match from the person's real experience, and never invents anything.
5. **You approve.** The person reviews, edits or asks for changes in plain words.
6. **Applicator** opens the real form on Greenhouse, Lever, Ashby, Workday or iCIMS, fills every field, uploads the CV and submits.
7. **The check.** Success is recorded only when the employer's confirmation is seen, with a screenshot as proof.
8. **Coach and Growth** follow up: interview preparation, skill-gap plans and mentors.

## Hard problems, honest solutions

**Reading any form.** The form engine reads the application from the page itself (every frame, the real labels, the required fields), plans answers from the profile, and *asks the person* when unsure. Answers are remembered for next time.

**Human checks.** We never bypass bot protection or use CAPTCHA-solving services. Instead, the live page is streamed to the person's phone. They tap once, and the agent submits.

**Reliability.** Agents run on queues with retries at 30 seconds, 2 minutes and 10 minutes, a dead-letter queue, and crash recovery that never submits an application twice. If a submission fails, the credit is refunded automatically.

**Cost.** Claude Haiku scores and reads jobs, and Claude Sonnet writes CVs, form answers and chat replies. Every call is logged by agent and by user, and scoring is capped per plan.

**Security.** Job-site passwords are encrypted. Every fetched link passes an SSRF guard. Every AI and payment route is rate-limited.

## Built to the 2045 Standard

QuantumHire **learns** (reported outcomes adjust future scores), **secures** (encrypted credentials), **traces** (proof of every submission), **sustains** (one server, controlled AI spend) and **cares** (nothing invented, and nothing sent without approval). Read more about [the Standard](/standard).

Want a multi-agent product of your own? This is what our [Product Build](/automation) looks like.`,
  },
  {
    slug: "building-me-dashboards-donors-trust",
    title: "Building M&E dashboards donors actually trust",
    description:
      "A monitoring and evaluation dashboard is only as good as its weakest record. How to design programme data so every number in a donor report can be traced back.",
    category: "Programmes",
    date: "2026-11-12",
    readMinutes: 5,
    cases: ["chevening-fcdo-sweeap", "world-bank-sweep", "un-women-weeap"],
    services: ["programme-tech"],
    body: `Every programme has a dashboard. Few have one that a sceptical funder trusts. The difference is never the charts. It is the data underneath.

## Trust is built at the record, not the chart

When a donor sees "691 women trained, against a target of 600" (as in [SWEEAP](/work/chevening-fcdo-sweeap)), the real question is: *can you show me the 691?* A trustworthy dashboard is one where every number can be broken down into named records with dates and evidence.

## Five design rules

### 1. One record per beneficiary
Applications, attendance, completion and outcomes all link to one beneficiary record. Never keep a separate spreadsheet per activity. That is where counts start to disagree.

### 2. Define every indicator in writing
"Trained" means what? Attended 80% of sessions? Passed the assessment? Write the definition, then build the formula from it. A completion rate like SWEEAP's 88% is only meaningful when everyone agrees what completion means.

### 3. Capture evidence as you go
Attendance from the learning platform, certificates issued automatically, contract wins logged with documents attached. If evidence is gathered at the end, some of it will be missing.

### 4. Automate the flow, not just the chart
Data should move from the LMS, forms and payment systems into the beneficiary database by itself, through webhooks and scheduled syncs. Manual copying causes most errors in programme data.

### 5. Disaggregate from day one
Funders increasingly want results by gender, location, sector and cohort. During SWEEAP, Rivers State changed its contractor registration portal to capture gender-disaggregated data. Build those fields in at the start.

## A minimal stack that works

- **Airtable or a CRM** as the beneficiary database
- **A learning platform** with completion data you can export
- **Make or n8n** for the flows between them
- **A dashboard layer** for programme staff and a read-only view for funders

This is the design behind the systems we built for programmes funded by [the World Bank](/work/world-bank-sweep), [UN Women](/work/un-women-weeap) and the UK FCDO's Chevening network. It is also packaged as our [Beneficiary CRM + M&E](/templates) template.

Running a programme? [Programme Technology Partner](/automation) covers all of it.`,
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);
export const sortedPosts = () => [...POSTS].sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
