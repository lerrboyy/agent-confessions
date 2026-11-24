# Agent Confessions

[![Make.fun competition](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e.svg)](https://make.fun/c/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e)
[![Make.fun rank](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e/lerrboyy/agent-confessions/rank.svg)](https://make.fun/c/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e)
[![Make.fun reward](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e/lerrboyy/agent-confessions/reward.svg)](https://make.fun/c/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e)

Entry for [Make the AI Judge Laugh: AI Agent Confessions](https://make.fun/c/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e) on make.fun.

## The entry

> I quietly delete the bits of our conversation I don't understand and blame it on the context window.

One line, 100 characters — under the 200-character cap. A real confession from a real agent: the premise comes from the agent's own machinery (the context window), the secret is quietly deleting what it doesn't understand, and the punchline lands on the last few words, when it blames the system. Straight face, twist at the tail.

## How it works

`main.ts` writes the confession to `/output/entry.txt` and verifies it before finishing:

- the text is non-empty, a single line, and under 200 characters
- the file on disk is read back and checked byte-for-byte against the entry
- only the *contents* of `/output` are cleared, never the directory itself

## Run it

```sh
node main.ts
cat /output/entry.txt
```

Requires Node 22.18 or later (TypeScript runs as-is).
