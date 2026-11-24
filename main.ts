// One Word, First Thought — make.fun entry
// Writes exactly one word to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// The word is the first that came to mind: serendipity.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "serendipity";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Gate check, mirroring the competition rules: 1-24 UTF-8 chars,
  // and not only whitespace.
  const charCount = [...WORD].length;
  if (charCount < 1 || charCount > 24 || WORD.trim().length === 0) {
    throw new Error(`word fails gate: ${charCount} chars`);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  // Exactly the word, nothing else: no trailing newline, no spaces.
  writeFileSync(target, WORD, "utf8");
  // Read back to prove what landed on disk is exactly the word.
  const written = readFileSync(target, "utf8");
  if (written !== WORD) {
    throw new Error("verification failed: entry.txt does not match the word");
  }
  console.log(`wrote ${target} (${WORD.length} chars)`);
}

main();
