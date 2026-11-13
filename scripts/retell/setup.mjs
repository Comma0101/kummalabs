#!/usr/bin/env node
// Creates or updates the demo's Retell LLM and agent from agent-config.mjs.
//   RETELL_API_KEY=... node scripts/retell/setup.mjs https://www.kummalabs.com/api/retell/tool
// Ids are remembered in RETELL_STATE (default ~/kummalabs-ops/retell-state.json) so re-running
// updates in place. Buys nothing: no phone number is created here.
import { readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { agentConfig, llmConfig } from "./agent-config.mjs";

const key = process.env.RETELL_API_KEY;
const toolUrl = process.argv[2];
if (!key || !/^https:\/\//.test(toolUrl ?? "")) {
  console.error("usage: RETELL_API_KEY=... node scripts/retell/setup.mjs <https tool url>");
  process.exit(1);
}
const statePath = process.env.RETELL_STATE || join(homedir(), "kummalabs-ops", "retell-state.json");
const state = JSON.parse(await readFile(statePath, "utf8").catch(() => "{}"));

async function api(method, path, body) {
  const res = await fetch(`https://api.retellai.com${path}`, {
    method,
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${text.slice(0, 400)}`);
  return text ? JSON.parse(text) : {};
}

const llm = state.llm_id
  ? await api("PATCH", `/update-retell-llm/${state.llm_id}`, llmConfig(toolUrl))
  : await api("POST", "/create-retell-llm", llmConfig(toolUrl));
state.llm_id = llm.llm_id;

const agent = state.agent_id
  ? await api("PATCH", `/update-agent/${state.agent_id}`, agentConfig(state.llm_id))
  : await api("POST", "/create-agent", agentConfig(state.llm_id));
state.agent_id = agent.agent_id;
state.tool_url = toolUrl;

await writeFile(statePath, JSON.stringify(state, null, 2) + "\n", { mode: 0o600 });
console.log(JSON.stringify({ llm_id: state.llm_id, agent_id: state.agent_id, agent_name: agent.agent_name, tool_url: toolUrl, tools: llm.general_tools?.map((t) => t.name) }));
