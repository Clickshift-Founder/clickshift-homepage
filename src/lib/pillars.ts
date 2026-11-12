import type { Pillar } from "./work";

// The 2045 Standard: five pillars from Emmanuel Ohanwe's essay "What Kind of Products Will Survive 2045?" (April 2025).

export const PILLARS: { key: Pillar; n: string; name: string; line: string; test: string[]; proof: { text: string; href: string } }[] = [
  {
    key: "learn",
    n: "01",
    name: "Learn",
    line: "It gets better the more it is used.",
    test: ["Does it capture outcomes, not just activity?", "Can it improve without a rebuild?", "Is the AI calibrated against real decisions?"],
    proof: { text: "QuantumHire uses the outcomes people report to adjust future job scores.", href: "/work/quantumhire" },
  },
  {
    key: "secure",
    n: "02",
    name: "Secure",
    line: "Safe by design, not by patch.",
    test: ["Are secrets encrypted and never logged?", "Can a stolen device be stopped?", "Is every door behind one gate?"],
    proof: { text: "Kobocent: your keys are encrypted, and only you can trigger a transaction.", href: "/work/kobocent" },
  },
  {
    key: "trace",
    n: "03",
    name: "Trace",
    line: "Every claim can be traced back to a record.",
    test: ["Can every reported number be broken down to records?", "Is success counted only with proof?", "Is there an audit trail?"],
    proof: { text: "SWEEAP's 691 women trained, each one traceable for the close-out report.", href: "/work/chevening-fcdo-sweeap" },
  },
  {
    key: "sustain",
    n: "04",
    name: "Sustain",
    line: "Cheap to run, easy to hand over.",
    test: ["Will it survive the builder leaving?", "Does its cost grow slower than its use?", "Is it documented?"],
    proof: { text: "An archive on free infrastructure took a Zoom bill from $1,000 a year to under $200.", href: "/work/zoom-to-drive" },
  },
  {
    key: "care",
    n: "05",
    name: "Care",
    line: "Built for the person at the other end.",
    test: ["Is a person in charge of decisions that affect people?", "Is sensitive data protected by default?", "Does it work on a cheap phone?"],
    proof: { text: "Women's programme data protected by privacy controls from day one.", href: "/work/un-women-weeap" },
  },
];

export const pillarName = (k: Pillar) => PILLARS.find((p) => p.key === k)?.name ?? k;
