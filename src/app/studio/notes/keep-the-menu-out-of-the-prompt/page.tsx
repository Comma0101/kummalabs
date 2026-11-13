import Link from "next/link";
import { Code, NoteShell, Recorded, noteMetadata } from "@/components/studio/Note";

const SLUG = "keep-the-menu-out-of-the-prompt";

export const metadata = noteMetadata(SLUG);

const DOCS_FUNCTION = "https://docs.retellai.com/build/single-multi-prompt/custom-function";

// Recorded strings are verbatim lines from typed conversations with our Retell agent in Retell's
// playground: the first English and Mandarin tests on 2026-11-12, and the repeat of the off-menu
// question on 2026-11-13 (three separate conversations against the deployed backend, same lines each
// time). Only the transcript script's layout spacing is dropped. Do not edit them by hand; re-run and paste.
// Code blocks are checked against the files they name by tests/studio-notes.test.mjs.
// The character limit on function results is from Retell's documentation, read on 2026-11-13.
export default function Note() {
  return (
    <NoteShell
      slug={SLUG}
      record={[
        {
          label: "Based on",
          value: "Our ordering demo on Retell: an agent whose prompt holds no menu, and five tools on our own server.",
        },
        {
          label: "Evidence",
          value: "Typed conversations in Retell’s playground and unit tests, quoted exactly. The restaurant and its menu are made up.",
        },
        {
          label: "Not tested",
          value: "Live phone calls, response time, and a large menu. We have not tested a menu-in-prompt agent to compare.",
        },
      ]}
    >
      <h2>What happened</h2>
      <p>
        Our demo agent takes pickup orders for a made-up restaurant. Its prompt contains no menu and no prices. To say
        anything about the food, it has to call a tool on our server. In the first typed test, the caller asked for
        something the restaurant doesn’t have.
      </p>
      <Recorded label="First test, November 12">{`USER: Can I get a mango pudding?
-> search_menu({"query":"mango pudding"})
<- {"status":"nothing_found","items":[]}
AGENT: Sorry, mango pudding isn’t on the menu. Would you like to hear dessert options?`}</Recorded>
      <p>
        The first sentence is right. The second is invented. The menu has five sections, and none of them is dessert.
      </p>
      <p>
        Nothing in the prompt mentions dessert. The tool said what was missing and nothing about what exists. Our
        reading is that the agent filled the gap with what restaurants usually have.
      </p>

      <h2>Why the menu isn’t in the prompt</h2>
      <p>
        Pasting the menu into the prompt is the fastest way to a working demo. It also means that nothing checks what
        the agent says against the menu, the total is arithmetic done by a language model, “ask for the spice level”
        is a sentence it may or may not follow, and a price change is a prompt edit.
      </p>
      <p>
        We have not tested that design, so this note makes no claim about how often it goes wrong. It shows the other
        design, and the place where that one still failed.
      </p>

      <h2>The design</h2>
      <p>
        <strong>The prompt holds behaviour.</strong> This is the part of it that deals with facts.
      </p>
      <Code file="scripts/retell/agent-config.mjs" caption="part of the prompt. It is a JavaScript string, so backticks appear escaped.">{`## Source of truth

You do not know the menu, the prices, or what is in the cart. All of it comes from tools.

- Before you name, describe, recommend, or price any item, call \\\`search_menu\\\`. Call it with an empty query to get the whole menu.
- Never state an item, price, option, or total that did not come from a tool result in this call.
- If a tool result has an \\\`instruction\\\`, follow it.
- If a tool call fails or returns status \\\`failed\\\`, tell the caller plainly. Never say something was added or placed unless a tool result says so.`}</Code>
      <p>
        <strong>Facts come from tools.</strong> <code>search_menu</code> returns names, prices, and the choices each
        item needs, all from one file on the server. A price change is a change to that file. The prompt stays as it
        is.
      </p>
      <p>
        <strong>Rules run in code.</strong> The lunch combo needs a main dish, and a spice level only when the main is
        a spicy one. That is a loop on the server, not a sentence in the prompt.
      </p>
      <Code file="src/lib/demo-order/engine.ts">{`for (const slot of item.slots) {
  // A conditional choice (e.g. spice level for a combo) applies only for certain earlier choices.
  if (slot.onlyWhen && !slot.onlyWhen.in.includes(options[slot.onlyWhen.slot])) continue;
  const choice = resolveChoice(slot, given);
  if (choice === undefined || choice === null) {
    return {
      ok: false,
      reason: choice === undefined ? "needs_choice" : "unknown_choice",
      item: item.name,
      slot: slot.name,
      options: slot.options.map((o) => o.name),
    };
  }
  options[slot.id] = choice;
}`}</Code>
      <p>
        In the same first test, the caller asked for a lunch combo with mapo tofu. The agent tried to add it without a
        spice level.
      </p>
      <Recorded label="The tool call, the tool’s answer, and what the agent said" tone="pass">{`-> add_item({"item":"Lunch Combo","options":{"Main":"Mapo Tofu"},"quantity":1})
<- {"status":"needs_choice","item":"Lunch Combo","choice":"Spice level","options":["Mild","Medium","Spicy"],"instruction":"Nothing was added. Ask the caller to pick one option, then call add_item again with it."}
AGENT: What spice level would you like for the mapo tofu: mild, medium, or spicy?`}</Recorded>
      <p>
        Nothing was added until the caller chose. The total read back at the end of that call, $20.45, was added up by
        the server in whole cents.
      </p>

      <h2>The fix: an empty answer has to say what is true</h2>
      <p>
        The dessert offer came from a result that was correct and incomplete. We changed what the tool returns when
        nothing matches.
      </p>
      <Code file="src/lib/demo-order/tools.ts">{`if (items.length === 0) {
  return {
    status: "nothing_found",
    menu_sections: [...new Set(MENU.map((i) => i.section))],
    instruction: "Nothing on the menu matches. Say so. Only these sections exist; do not offer any other kind of food.",
  };
}`}</Code>
      <Code file="tests/demo-order.test.mjs">{`test("tools: a search with no match lists the real sections and tells the model not to improvise", async () => {
  const store = createMemoryStore();
  const r = await handleTool(store, "call_H", "search_menu", { query: "mango pudding" });
  assert.equal(r.status, "nothing_found");
  assert.deepEqual(r.menu_sections, ["Appetizers", "Mains", "Noodles and rice", "Combos", "Drinks"]);
  assert.match(r.instruction, /do not offer/i);
});`}</Code>
      <p>
        Then we asked the same question again, in three separate conversations. The answer was the same each time.
      </p>
      <Recorded label="The same question, November 13" tone="pass">{`USER: Can I get a mango pudding?
-> search_menu({"query":"mango pudding"})
<- {"status":"nothing_found","menu_sections":["Appetizers","Mains","Noodles and rice","Combos","Drinks"],"instruction":"Nothing on the menu matches. Say so. Only these sections exist; do not offer any other kind of food."}
AGENT: Sorry, mango pudding isn’t on the menu. We have appetizers, mains, noodles and rice, combos, and drinks.`}</Recorded>
      <p>
        Three conversations are an observation, not a guarantee. They were typed, with one model at one setting. What
        carries over is the shape of the result: every “no” from a tool should also say what is true and what to do
        next. Ours do the same when a choice is missing and when{" "}
        <Link href="/notes/agent-said-confirmed-nothing-saved">a write fails</Link>, and the prompt has one line
        telling the agent to follow them.
      </p>

      <h2>The same rule in a second language</h2>
      <p>
        The first Mandarin test found a bug, and it was ours. The caller asked what noodle or rice dishes there were.
      </p>
      <Recorded label="First Mandarin test, November 12">{`USER: 你好，我想点餐。有什么面或者饭？
-> search_menu({"query":"面 饭"})
<- {"status":"nothing_found","menu_sections":["Appetizers","Mains","Noodles and rice","Combos","Drinks"],"instruction":"Nothing on the menu matches. Say so. Only these sections exist; do not offer any other kind of food."}
-> search_menu({"query":""})`}</Recorded>
      <p>
        Our search ignored one-letter words. In Chinese, 面 (noodles) and 饭 (rice) are one character each, so the
        search found nothing. The agent did not guess. It asked for the whole menu and answered from that.
      </p>
      <Recorded label="What the agent said once the menu came back" tone="pass">
        AGENT: 有牛肉炒面和扬州炒饭，都是“面和饭”这一栏的。您想点哪个？
      </Recorded>
      <p>
        In English: “We have beef chow mein and Yangzhou fried rice, both under noodles and rice. Which would you
        like?” A right answer, by the long way round. We fixed the search and pinned it with a test.
      </p>
      <Code file="src/lib/demo-order/engine.ts">{`// A single Chinese character is a meaningful search word ("面", "饭"); a single Latin letter is not.
const CJK = /\\p{Script=Han}/u;`}</Code>
      <Code file="tests/demo-order.test.mjs">{`assert.deepEqual(searchMenu("面 饭").map((i) => i.id).sort(), ["beef-chow-mein", "yangzhou-fried-rice"]);`}</Code>

      <h2>Check your own agent</h2>
      <ul>
        <li>Ask for something you don’t sell, and listen to the second half of the answer.</li>
        <li>Ask for an item that needs a choice, and don’t make the choice.</li>
        <li>Order three different things and add up the total yourself.</li>
        <li>
          Read the prompt. Every price, opening time, or product name in it is a fact with nothing checking it.
        </li>
        <li>Look at what each tool returns when it finds nothing. An empty list invites a guess.</li>
        <li>Ask the same questions in every language you support.</li>
      </ul>

      <h2>What this note does not show</h2>
      <p>
        These were typed conversations, not phone calls. On a call, speech recognition sits between the caller and
        the search, and we have not tested what it does to item names. We have not measured what a tool call adds to
        response time. The menu has twelve items, so an empty search can return all of it. A real menu may not fit:
        Retell’s <a href={DOCS_FUNCTION}>documentation</a> gives a default limit of 15,000 characters on a function
        result. And we have no menu-in-prompt agent to compare against.
      </p>
    </NoteShell>
  );
}
