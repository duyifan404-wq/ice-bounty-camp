# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Selected visual direction

- Source of truth: `/workspace/scratch/da26ccb1977f/generated_images/exec-fe56317f-7985-4e06-af26-7b15667a1388.png`.
- User preference: bright, cheerful ice-and-snow event visual; sky blue, snow white, a small warm-yellow reward accent; friendly 3D winter environment, bold rounded Chinese headline and restrained ice edging.
- Avoid returning to dark cinematic proposal styling. Keep the full site suitable for classroom presentation and internal marketing review rather than a public game download page.
