# Research: why ClaimScout, why now

## Problem scan

The goal was to choose a project that sits at the intersection of:

- a globally important, current problem
- a realistic open-source MVP

That combination led to a focused wedge inside the misinformation space.

## The core world problem

### Misinformation, distrust, and social fragmentation

ClaimScout focuses on misinformation triage because the problem is both urgent and buildable.

Recent evidence:

1. The World Economic Forum reported that **misinformation and disinformation ranked as the top risk over the next two years** in the Global Risks Report 2025 survey.  
   Source: <https://www.weforum.org/stories/2025/01/3-surprising-findings-global-risks-report-2025/>
2. The United Nations warned in the World Social Report 2025 launch materials that **over half of the global population has little or no trust in their government**, and that misinformation/disinformation is making distrust and social fragmentation worse.  
   Source: <https://www.un.org/sustainabledevelopment/blog/2025/04/wsr25-press-release/>
3. UN reporting also highlighted how digital platforms and echo chambers can reinforce division and radicalization.  
   Source: <https://news.un.org/en/story/2025/04/1162561>

## Why this is still solvable by a small open-source team

Trying to “solve misinformation” end-to-end would be too broad.

But one slice is highly practical:

### Fast first-pass claim triage

Before someone fully fact-checks a post, article, screenshot, or rumor, they need to know:

- which claims deserve attention first
- which claims are high-risk because they lack sources
- which claims could cause harm if shared unverified
- what evidence should be checked next

That is a realistic open-source wedge because it can be:

- local-first
- transparent
- useful without paid APIs
- integrated into future tools later

## Other ideas considered

### Climate adaptation toolkit
Very important, but hard to make a standout MVP without real-time data or domain partners.

### Accessibility autofix toolkit
High developer appeal, but less directly aligned with the request to solve a major global social problem.

### Education equity platform
Important but less suited to a repository-first launch likely to trend on GitHub.

### Misinformation triage toolkit
Best balance of:

- urgency
- feasibility
- demo-friendliness
- extensibility
- developer/community appeal

## Product definition

ClaimScout does **not** claim to know absolute truth.

Instead it helps with:

- suspicious claim detection
- risk explanation
- verification next steps
- JSON output for integrations
- privacy-first, inspectable local analysis

## Why the MVP is rule-based first

This domain needs trust and auditability.

A professional first release should be:

- explainable
- cheap to run
- reproducible
- safe for sensitive contexts
- a baseline future contributors can test and improve

That is why ClaimScout starts with transparent heuristics instead of black-box scoring.

## Success criteria

### Product success

- users can paste text and understand the report in seconds
- findings are explainable sentence by sentence
- contributors can add rules and test cases safely

### Open-source success

- the README tells a compelling story quickly
- the demo works instantly
- the repo is contributor-ready on day one
- the roadmap creates future release momentum
