import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { formatNoteDate, getNote, notePath, notes } from "../src/lib/studio-notes.ts";

const pagePath = (slug) => `src/app/studio/notes/${slug}/page.tsx`;

test("every note has a unique slug, a real date, and a page", () => {
  assert.ok(notes.length > 0);
  assert.equal(new Set(notes.map((n) => n.slug)).size, notes.length);
  for (const n of notes) {
    assert.match(n.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/);
    assert.match(n.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(!Number.isNaN(Date.parse(n.date)), n.date);
    assert.ok(n.title && n.searchTitle && n.summary && n.basis, n.slug);
    assert.ok(existsSync(pagePath(n.slug)), `missing page for ${n.slug}`);
    assert.ok(readFileSync(pagePath(n.slug), "utf8").includes(`"${n.slug}"`), `${n.slug} page uses another slug`);
  }
});

test("note helpers", () => {
  assert.equal(notePath("x-y"), "/notes/x-y");
  assert.equal(formatNoteDate("2026-11-12"), "November 12, 2026");
  assert.equal(formatNoteDate("2027-01-03"), "January 3, 2027");
  assert.throws(() => getNote("nope"));
});

// A <Code file="..."> block must match the file it names, line for line and in order.
// A line that is only "// …" marks lines left out.
test("code quoted in notes matches the repository", () => {
  const block = /<Code file="([^"]+)"[^>]*>\{`([\s\S]*?)`\}<\/Code>/g;
  let checked = 0;
  for (const n of notes) {
    const page = readFileSync(pagePath(n.slug), "utf8");
    for (const [, file, raw] of page.matchAll(block)) {
      const source = readFileSync(file, "utf8").split("\n").map((l) => l.trim());
      const quoted = raw.replace(/\\`/g, "`").replace(/\\\$/g, "$").split("\n").map((l) => l.trim());
      let at = 0;
      let gapAllowed = true; // the excerpt may start anywhere in the file
      for (const line of quoted) {
        if (line === "// …") {
          gapAllowed = true;
          continue;
        }
        if (line === "") continue;
        const found = source.indexOf(line, at);
        assert.notEqual(found, -1, `${n.slug}: not found in ${file} (in order): ${line}`);
        if (!gapAllowed) {
          const skipped = source.slice(at, found).filter((l) => l !== "");
          assert.deepEqual(skipped, [], `${n.slug}: lines of ${file} were left out before: ${line}`);
        }
        at = found + 1;
        gapAllowed = false;
      }
      checked++;
    }
  }
  assert.ok(checked >= 5, `expected to check the notes' code blocks, checked ${checked}`);
});
