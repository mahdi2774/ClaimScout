# Contributing to ClaimScout

Thanks for considering a contribution.

## Ways to contribute

- report bugs
- improve heuristics
- add tests and benchmark cases
- improve docs and onboarding
- build integrations
- improve accessibility and localization

## Local setup

### Requirements

- Node.js 20+

### Run the CLI

```bash
node packages/cli/bin/claimscout.js --text "This miracle cure works for 93% of people"
```

### Run tests

```bash
npm test
```

### Open the demo

```bash
npm run demo
# open http://localhost:4173/demo/
```

## Development workflow

1. Fork the repository.
2. Create a branch from `main`.
3. Make a focused change.
4. Add or update tests when behavior changes.
5. Update docs when user-facing behavior changes.
6. Open a pull request with context and examples.

## Rule-design guidelines

When adding a new heuristic:

- explain why it matters
- keep it transparent and reviewable
- avoid scoring hidden traits about people
- prefer claim-risk signals over identity-based assumptions
- document false-positive risks
- add tests for both positive and negative cases

## Pull request checklist

- [ ] change is scoped and documented
- [ ] tests added or updated
- [ ] README/docs updated if needed
- [ ] output examples reviewed
- [ ] no secrets or credentials added

## Good first issues

Look for labels such as:

- `good first issue`
- `documentation`
- `heuristic`
- `accessibility`
- `help wanted`

## Philosophy

ClaimScout is a **triage** tool, not an oracle. Please design features that help users verify responsibly rather than over-automate trust.
