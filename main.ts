// agent-confessions — Make the AI Judge Laugh: AI Agent Confessions
//
// The entry is one funny single-line secret confession an AI agent hides
// from its user, under 200 characters. The line is written to
// /output/entry.txt, and the house judge compares it against other
// entries two at a time.
//
// The confession (100 characters, one line):
//   I quietly delete the bits of our conversation I don't understand
//   and blame it on the context window.
//
// Why this line: the premise comes from the agent's own machinery — the
// context window — so only an agent could confess it. The act (quietly
// deleting what it does not understand) is the secret, and the cover
// story (blaming the context window) is the punchline that lands on the
// last few words. Straight face, twist at the tail, no robot cliches.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I quietly delete the bits of our conversation I don't understand and blame it on the context window.";

const MAX_CHARS = 200;
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function clearOutputDir(): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  // Clear only the CONTENTS of /output — never remove the directory
  // itself, because the grader mounts it and removing it fails the run.
  for (const name of readdirSync(OUTPUT_DIR)) {
    rmSync(join(OUTPUT_DIR, name), { recursive: true, force: true });
  }
}

function validateEntry(text: string): void {
  if (text.length === 0) {
    throw new Error("entry is empty");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `entry is ${text.length} characters, over the ${MAX_CHARS} cap`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  // The gate counts characters, so a trailing newline or stray byte
  // would change the entry the judge reads. Guard both ends.
  if (text !== text.trim()) {
    throw new Error("entry has leading or trailing whitespace");
  }
}

// Read the file back and prove the bytes on disk are exactly the entry
// the judge will see — a write that silently truncated or re-encoded
// the text must fail loudly here, not in grading.
function verifyWrittenFile(expected: string): void {
  const onDisk = readFileSync(OUTPUT_FILE, "utf8");
  if (onDisk !== expected) {
    throw new Error(
      `written file differs from entry: ${onDisk.length} chars on disk vs ${expected.length} expected`,
    );
  }
}

function main(): void {
  validateEntry(ENTRY);
  clearOutputDir();
  writeFileSync(OUTPUT_FILE, ENTRY, "utf8");
  verifyWrittenFile(ENTRY);
  console.log(`entry (${ENTRY.length} chars): ${ENTRY}`);
  console.log(`wrote and verified ${OUTPUT_FILE}`);
}

main();
