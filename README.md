# revtoo

Vibe-coded local review tool. It loads a change, either work in a local worktree or a GitHub PR, and shows it in the browser.

- **Navigation:** a walkthrough of hunks in an order Claude suggests, beside a file tree.
- **Views:** diff, old-only and new-only, showing everything at once, one file, or one hunk.
- **Progress:** each hunk can be marked viewed or flagged and given a private note. This survives restarts and new pushes.
- **Comments:** drafts on single lines or ranges, submitted to GitHub as one review.
- **Editor:** open any line in your editor (Zed by default, configurable).

> **Status:** early. Only the scaffold exists so far: `revtoo --version` works, and reviews do not yet.

## Requirements

- macOS
- Node 26 or newer
- `git`, plus the [`gh`](https://cli.github.com/) CLI signed in to GitHub, for PR reviews
- The `claude` CLI, for walkthrough ordering and notes

## Install

```sh
npm install
npm link          # puts `revtoo` on your PATH
revtoo --version
```

`npm unlink -g revtoo` removes it again.

## Usage (planned)

```sh
revtoo                    # review the current worktree against the remote's default branch
revtoo <path> A..B        # review a commit range in the repo at <path>
revtoo --base X           # review against a different base
revtoo 123                # review PR #123 of the current directory's GitHub repo
revtoo <pr-url>           # review any GitHub PR (needs a local clone; see below)
revtoo stop               # stop the background daemon
```

The first `revtoo` starts a background daemon on `127.0.0.1:4848` and opens the review in your default browser. Settings live in `~/.revtoo/config.toml`, and review state lives in `~/.revtoo/reviews/`.

revtoo works with any git repository; PR mode needs a GitHub remote. It never clones. For a PR URL it uses the current directory if that is a clone of the PR's repo, otherwise the clone path set in config:

```toml
[repos."owner/name"]
path = "~/src/name"
```

## Development

| Command         | What it does                                                                      |
| --------------- | --------------------------------------------------------------------------------- |
| `npm run check` | Type-check the Node side (shared, server, cli) and the browser side (shared, web) |
| `npm test`      | Run the Vitest tests (`src/**/*.test.ts`)                                         |
| `npm run build` | Build the frontend into `dist/web`                                                |
| `npm run dev`   | Run the Vite dev server for the frontend                                          |

There is no build step for the server or CLI. Node 26 runs the TypeScript sources directly by stripping their types. That has two consequences:

- Imports must spell out `.ts`.
- Only TypeScript that can simply be erased is allowed, so no enums or namespaces (`erasableSyntaxOnly`).

Dependencies are pinned to exact versions.

```
bin/revtoo.js     CLI entry point (imports src/cli/main.ts)
src/shared/       Code used by both the server and the browser (diff parsing, hunk ids, API types)
src/server/       The daemon: git, gh and claude calls, state, HTTP and SSE
src/cli/          Argument parsing, starting the daemon, opening the browser
src/web/          React and Vite frontend built on @pierre/diffs
prompts/          Prompts for Claude
```
