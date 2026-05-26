<div align="center">
  <img src="./assets/logo.svg" alt="ClaimScout logo" width="120" />
  <h1>ClaimScout</h1>
  <p><strong>Privacy-first misinformation triage for journalists, educators, civic teams, and AI builders.</strong></p>
  <p>
    <img alt="status" src="https://img.shields.io/badge/status-MVP-blue" />
    <img alt="license" src="https://img.shields.io/badge/license-Apache%202.0-green" />
    <img alt="runtime" src="https://img.shields.io/badge/runtime-Node%2020%2B-black" />
    <img alt="zero deps" src="https://img.shields.io/badge/dependencies-zero-brightgreen" />
  </p>
</div>

ClaimScout is an open-source toolkit that helps people quickly identify **high-risk claims that deserve verification first**. It is not a truth oracle and does not try to replace human fact-checkers. Instead, it helps you answer a practical question fast:

> **What in this text looks risky, unsupported, manipulative, or high-impact enough to verify before sharing?**

## Why this project exists

Misinformation and disinformation remain one of the most urgent near-term global risks, while trust and social cohesion are weakening worldwide. ClaimScout tackles a focused, solvable slice of that problem: **faster first-pass triage** for suspicious claims in news, health, finance, and civic information.

Read the full rationale in [`docs/research.md`](./docs/research.md).

## What ClaimScout does

- Analyzes pasted text with transparent, inspectable rules.
- Flags risky claim patterns such as:
  - numbers without sources
  - health/finance/election claims without attribution
  - absolutist language
  - urgency and pressure tactics
  - anonymous authority phrases like “experts say”
  - emotional manipulation markers
- Produces:
  - per-claim risk scores
  - explanation cards
  - suggested verification steps
  - machine-readable JSON
  - human-friendly Markdown output
- Ships with:
  - a reusable core engine
  - a zero-dependency CLI
  - an offline-friendly web demo
  - full open-source community scaffolding

## Repository structure

```text
claimscout/
├── assets/                 # Brand assets
├── demo/                   # Static browser demo
├── docs/                   # Research, architecture, launch plan
├── examples/               # Sample input/output
├── packages/
│   ├── cli/                # Command-line interface
│   └── core/               # Analysis engine
└── .github/                # CI and contribution templates
```

## Quick start

### 1) Clone

```bash
git clone https://github.com/mahdi2774/ClaimScout.git
cd claimscout
```

### 2) Analyze text from the CLI

```bash
node packages/cli/bin/claimscout.js --text "Doctors say this tea cures diabetes in 7 days with 98% success!!!"
```

### 3) JSON output

```bash
node packages/cli/bin/claimscout.js --text "The city budget doubled by 40% last year" --json
```

### 4) Markdown output

```bash
node packages/cli/bin/claimscout.js --file examples/sample-input.txt --markdown
```

### 5) Run tests

```bash
npm test
```

### 6) Open the demo

```bash
npm run demo
# then open http://localhost:4173/demo/
```

## Example

### Input

```text
BREAKING: Experts say this one spice reverses memory loss in 3 days and big pharma doesn't want you to know. It works for 94% of people.
```

### Output summary

- **Overall severity:** critical
- **Why:** anonymous authority, unsupported percentage, health claim, urgency/sensational framing
- **Next step:** find the original study, identify who “experts” are, check medical guidance from trusted institutions

## Design principles

### 1. Human-in-the-loop
ClaimScout prioritizes review; it does not declare absolute truth.

### 2. Transparent rules
Every score is explainable. No black-box ranking required for the MVP.

### 3. Privacy-first
The core engine runs locally. No account, cloud, or API key is required.

### 4. Progressive extensibility
The roadmap adds evidence connectors, browser extensions, multilingual support, and AI-assisted verification prompts.

## Use cases

- **Journalists:** triage story tips, tips inboxes, or social posts.
- **Researchers:** create labeled datasets and compare heuristic baselines.
- **Educators:** teach source-checking with clear explanation cards.
- **Civic organizations:** review rumors during elections or crises.
- **AI builders:** plug a safe first-pass verifier into assistants and copilots.

## Current MVP scope

Included now:
- rule-based text analysis
- presets for general, health, finance, and civic contexts
- CLI
- offline web demo
- contributor-ready repo structure

Planned next:
- URL ingestion and source extraction
- browser extension
- evidence adapters for trusted datasets/APIs
- multilingual claim segmentation
- MCP server for AI tools

See [`ROADMAP.md`](./ROADMAP.md).

## Docs

- [`docs/research.md`](./docs/research.md) — why this problem, why now, why this wedge
- [`docs/architecture.md`](./docs/architecture.md) — system design and extension plan
- [`docs/launch-strategy.md`](./docs/launch-strategy.md) — how to maximize stars, contributors, and followers ethically
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — local setup and contribution flow
- [`SECURITY.md`](./SECURITY.md) — responsible disclosure

## Professional open-source readiness

This repository already includes:

- Apache-2.0 license
- code of conduct
- contributing guide
- governance doc
- security policy
- issue templates
- PR template
- CI workflow
- sample outputs
- demo app
- roadmap and launch plan

## What this project is not

- Not a censorship tool
- Not a final fact-check verdict engine
- Not a replacement for newsroom, academic, or public-health review
- Not a credibility score for people or communities

## Contributing

Contributions are welcome. Good first areas:

- new heuristic rules
- multilingual claim segmentation
- benchmark datasets
- accessibility improvements for the demo
- docs and examples

Start with [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## License

Apache-2.0 — see [`LICENSE`](./LICENSE).
