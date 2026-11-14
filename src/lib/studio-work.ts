// Work shown on kummalabs.com. Every claim here was checked against the project's code on
// 2026-11-12. Test counts are only quoted where the full suite passed in that check.

export type WorkStatus = "Began as a paid project" | "Prototype" | "Internal tool" | "Open source" | "Internal audit";

export type Work = {
  id: string;
  name: string;
  kind: string;
  status: WorkStatus;
  shows: string;
  does: string;
  built: string;
  evidence: string;
  link?: { href: string; label: string };
};

export const work: Work[] = [
  {
    id: "kota",
    name: "KOTA",
    kind: "Phone ordering agent, English and Mandarin",
    status: "Began as a paid project",
    shows: "Voice, typed tool calls against a database, confirmations that are checked, and a hand-off to staff.",
    does:
      "Answers a restaurant’s phone, takes the order against the restaurant’s own menu database, saves it as a structured record, and texts the caller a confirmation. Pressing 0 transfers the call to a person.",
    built:
      "Twilio media streams; Deepgram for English; ByteDance speech with OpenAI tool calling for Mandarin; Python and FastAPI; PostgreSQL.",
    evidence:
      "The first working version was built as a paid project for a US restaurant point-of-sale company, which we don’t name. The code has been reworked since, and 111 automated tests pass on the current version.",
    link: { href: "/work/kota", label: "Read the KOTA case study" },
  },
  {
    id: "menu-onboarding",
    name: "Menu onboarding pipeline",
    kind: "Document extraction with validation",
    status: "Prototype",
    shows: "Turning photos and documents into structured data, with checks that remove anything the source doesn’t support.",
    does:
      "Reads menu photos or text, extracts sections, items, prices, and required options, then checks the result against the menu’s own catalog. Pairings, recommendations, or aliases that point at items not on the menu are removed and flagged before anything reaches the database.",
    built: "LLM extraction, a grounding checker, structure-preserving refinement, and schema and coverage validation. Part of KOTA.",
    evidence: "Covered by KOTA’s menu grounding, schema, and ingest tests. The linked page shows a recorded run with its real output.",
    link: { href: "/work/menu-validation", label: "See a recorded validation run" },
  },
  {
    id: "order-flow-diagnostic",
    name: "Order-flow diagnostic",
    kind: "Failure-case testing of an existing agent",
    status: "Internal audit",
    shows: "What an Improve project produces: defects found by forcing failures on purpose, each with evidence, a fix, and an acceptance test.",
    does:
      "We audited KOTA’s order path by replacing the database and the messaging provider with controlled fakes and triggering each failure deliberately. It found five issues we hadn’t known about, including a failed save being announced to the caller as a confirmed order, and confirmed two behaviours that hold up.",
    built: "Seven targeted tests against the real code, using the project’s own test harness.",
    evidence:
      "All five findings are open. Three are published in full as a sample report, written the way a client receives it. Two security findings are withheld from the public copy until they are fixed.",
    link: { href: "/work/sample-diagnostic", label: "Read the sample diagnostic report" },
  },
  {
    id: "research-agent",
    name: "Research agent with source checks",
    kind: "Research and monitoring",
    status: "Internal tool",
    shows: "An agent whose citations can be traced: every source it cites is checked against the log of pages it actually opened.",
    does:
      "Runs web research and logs every URL it opens. Each citation is then matched against that log: a URL the agent cited but never opened is marked unverified and discounted. That catches invented or misremembered links; it does not prove a source is right, so sources are also graded for credibility and a finding needs at least three independent ones. A person must approve before anything is spent, sent, or published.",
    built: "Node.js, OpenAI web search with structured outputs, SQLite for runs, sources, evidence, and approvals.",
    evidence: "208 automated tests pass.",
  },
  {
    id: "outreach-pipeline",
    name: "Approval-gated outreach pipeline",
    kind: "Lead research and follow-up drafts",
    status: "Internal tool",
    shows: "AI drafting with rule checks and a person in the loop before anything leaves.",
    does:
      "Takes a lead list, checks the opt-out list, researches each business from its public site, and drafts a first message. A rule check rejects claims the product can’t back. A person approves every message, and the send step enforces a daily limit and refuses duplicates.",
    built:
      "Python, SQLite, and a choice of Anthropic, OpenAI, or Gemini models. Each draft is stored with a fingerprint of the capability list it was checked against.",
    evidence: "157 automated tests pass.",
  },
  {
    id: "archon",
    name: "ARCHON",
    kind: "Agent runtime and orchestration",
    status: "Open source",
    shows: "The plumbing behind agents: tool registries, worker delegation, MCP, memory, and approvals.",
    does:
      "A personal agent runtime that runs from a terminal or Telegram. It registers tools, delegates coding tasks to Claude Code, Codex, or OpenCode workers, connects MCP servers, keeps memory across sessions, and blocks risky shell commands unless a person confirms them.",
    built: "Python, with Anthropic, OpenAI, and Google model support.",
    evidence: "Open source and in active development. Experimental.",
    link: { href: "https://github.com/Comma0101/archon", label: "ARCHON on GitHub" },
  },
];
