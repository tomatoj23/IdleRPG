# AGENTS.md

## Agent skills

### Issue tracker

Issues live in the repo's GitHub Issues, accessed via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### Content pipeline

Game content lives as JSON files under `content/`, validated by JSON Schema (`npm run content:check`). Batch edits by agents must follow `docs/agents/content.md` and the style guide at `content/style-guide.md`.
