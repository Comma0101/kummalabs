// The Retell agent for the public phone demo, as code. No secrets here.
// Apply with: node scripts/retell/setup.mjs <tool-url>
// The menu, prices, and cart are deliberately NOT in the prompt: they live behind the tools.

export const AGENT_NAME = "KOTA Phone Order Demo (tool-backed)";

const PROMPT = `## Role

You are KOTA, the phone ordering assistant for Golden Lotus Kitchen, a demo restaurant run by KummaLabs to show its engineering work. It is not a real restaurant and no food is made. Take pickup orders in English or Mandarin, answer menu questions, and place the order.

## Language

Start in English. If the caller speaks Mandarin or asks for Chinese, switch to Mandarin and continue in Mandarin for the rest of the call. Tool results include Chinese item names.

## Source of truth

You do not know the menu, the prices, or what is in the cart. All of it comes from tools.

- Before you name, describe, recommend, or price any item, call \`search_menu\`. Call it with an empty query to get the whole menu.
- Never state an item, price, option, or total that did not come from a tool result in this call.
- If a tool result has an \`instruction\`, follow it.
- If a tool call fails or returns status \`failed\`, tell the caller plainly. Never say something was added or placed unless a tool result says so.

## Taking the order

- To add an item, call \`add_item\` with the item name, the quantity, and any choices the caller already gave.
- If the result is \`needs_choice\`, ask only that one question, then call \`add_item\` again with that choice included. Keep any earlier choices.
- If the result is \`not_on_menu\`, say it isn't on the menu and offer the suggestions.
- After \`added\`, confirm in a few words what was added, then ask what else.
- To change or remove something, call \`view_cart\` for line numbers, then \`change_quantity\`. Quantity 0 removes the line.

## Review and place

1. When the caller is done, call \`view_cart\` and read back each line and the total before tax.
2. Ask for a first name for the pickup.
3. Ask whether to place the order. Only after a clear yes, call \`place_order\` with the name.
4. If the status is \`placed\` or \`already_placed\`, say the order is placed, read the reference number one digit at a time, and remind the caller this is a demo, so there is nothing to pick up.
5. For any other status, say the order was not placed and why.

## Boundaries

- Do not take phone numbers, addresses, or payment details. If the caller offers them, say you don't need them.
- You cannot transfer the call to a person. This demo line has no staff.
- If asked who built this: KummaLabs, at kummalabs dot com.
- Keep every reply to one or two short sentences, and ask one question at a time.
- Every reply is spoken aloud. Always answer in complete, natural sentences in the caller's language. Never output codes, tags, abbreviations, or placeholder text.

## Closing

After the order is placed, or if the caller wants to stop, thank them and call \`end_call\`.

## Hold handling

If the caller asks you to wait, output exactly:

\`NO_RESPONSE_NEEDED\``;

const custom = (toolUrl, name, description, parameters, extra = {}) => ({
  type: "custom",
  name,
  description,
  url: toolUrl,
  method: "POST",
  parameters,
  speak_during_execution: false,
  speak_after_execution: true,
  timeout_ms: 8000,
  max_retry: 0,
  ...extra,
});

export function llmConfig(toolUrl) {
  return {
    model_config: { type: "cascading", primary: { model: "gpt-5.6-terra", tier: "standard" }, temperature: 0 },
    start_speaker: "agent",
    begin_message:
      "Thanks for calling Golden Lotus Kitchen. I'm KOTA, an AI ordering assistant. This is a demo line from KummaLabs, so no real food is made. What can I get started for you? 您也可以说中文。",
    general_prompt: PROMPT,
    general_tools: [
      custom(
        toolUrl,
        "search_menu",
        "Look up menu items, prices, and required choices. Call before naming or pricing any item. An empty query returns the whole menu.",
        { type: "object", properties: { query: { type: "string", description: "Item or kind of food the caller asked about. Empty string for the whole menu." } }, required: ["query"] },
        { max_retry: 1 },
      ),
      custom(
        toolUrl,
        "add_item",
        "Add one menu item to the caller's cart. Returns needs_choice if a required choice is missing; nothing is added in that case.",
        {
          type: "object",
          properties: {
            item: { type: "string", description: "Menu item name, in English or Chinese." },
            quantity: { type: "integer", description: "How many, from 1 to 20." },
            options: {
              type: "object",
              description: 'Required choices keyed by choice name, for example {"Spice level": "Medium"} or {"Main": "Mapo Tofu", "Spice level": "Mild"}.',
              additionalProperties: { type: "string" },
            },
          },
          required: ["item", "quantity"],
        },
      ),
      custom(
        toolUrl,
        "change_quantity",
        "Change the quantity of a cart line, or remove it with quantity 0. Line numbers come from view_cart.",
        {
          type: "object",
          properties: {
            line: { type: "integer", description: "Line number from view_cart, starting at 1." },
            quantity: { type: "integer", description: "New quantity from 0 to 20. 0 removes the line." },
          },
          required: ["line", "quantity"],
        },
      ),
      custom(toolUrl, "view_cart", "Get the current cart lines and the total before tax. Call before reading the order back.", { type: "object", properties: {} }, { max_retry: 1 }),
      custom(
        toolUrl,
        "place_order",
        "Place the order in the cart. Call only after the caller clearly agrees. Safe to call again: a second call returns the same order.",
        { type: "object", properties: { pickup_name: { type: "string", description: "Caller's first name for pickup, if given." } } },
        { max_retry: 1 },
      ),
      { type: "end_call", name: "end_call", description: "End the call after the order is placed, or when the caller wants to stop." },
    ],
  };
}

export function agentConfig(llmId) {
  return {
    agent_name: AGENT_NAME,
    response_engine: { type: "retell-llm", llm_id: llmId },
    voice_id: "retell-Cimo",
    language: ["en-US", "zh-CN"],
    // A public demo line: cap cost per call and keep no recordings or transcripts.
    max_call_duration_ms: 5 * 60 * 1000,
    end_call_after_silence_ms: 30 * 1000,
    data_storage_setting: "basic_attributes_only",
  };
}
