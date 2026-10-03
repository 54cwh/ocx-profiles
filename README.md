# ocx-profiles

An [OCX](https://github.com/kdcokenny/ocx) registry collection for OpenCode V2.
Each profile is published as its **own registry** (OCX requires one profile per
registry — root files like `AGENTS.md`/`opencode.jsonc` collide otherwise),
all served from this one GitHub Pages site under a subpath.

| Profile | Registry URL | What it is |
|---|---|---|
| `deploy` | `https://54cwh.github.io/ocx-profiles/deploy` | Linux server ops: ssh MCP, Docker, systemd, firewall, backups, cron, no-rm guard |
| `dev` | `https://54cwh.github.io/ocx-profiles/dev` | Programming: code review, DB schema/migration, frontend/UI, webapp testing, shadcn + chrome-devtools MCP |
| `general` | `https://54cwh.github.io/ocx-profiles/general` | Office / document productivity: docx/pptx/xlsx/pdf/latex2word, Obsidian, writing polish |
| `quant` | `https://54cwh.github.io/ocx-profiles/quant` | Data / quant: A-share data, acquisition & cleaning, statistics & causal inference |
| `research` | `https://54cwh.github.io/ocx-profiles/research` | Research / math modeling: literature, paper reading/writing/polishing, citation verify, Stata(Wine)/OpenAlex/Zotero/MinerU MCP |

> `shop` is intentionally **not** published.

## Install

```sh
ocx registry add https://54cwh.github.io/ocx-profiles/<profile> --name ocx-<profile> --global
ocx profile add <profile> --source ocx-<profile>/<profile>
ocx verify --profile <profile>
ocx oc -p <profile>
```

Example for `dev`:

```sh
ocx registry add https://54cwh.github.io/ocx-profiles/dev --name ocx-dev --global
ocx profile add dev --source ocx-dev/dev
```

See [`INSTALL.zh.md`](./INSTALL.zh.md) for the Chinese walkthrough, required env
vars, and the machine-specific bits you must edit after installing.

## Updating

Publisher: edit `registries/<profile>/files/**`, then `bun run build`, commit,
push. Consumer: `ocx update --all --profile <profile>` (add `--dry-run` first).
Local edits are preserved; conflicts stop the update.

## Layout

```
registries/<profile>/registry.jsonc   # one component, type "profile"
registries/<profile>/files/profiles/<profile>/**   # the profile files
dist/<profile>/**                     # built output, committed (CI cannot build; ocx@3 is not on npm)
```

## Build

```sh
ocx validate registries/<profile>   # or the whole dir per profile
bun run build                       # builds every registry into dist/<profile>
```

Publish the whole `dist/` directory as static files. Each
`dist/<profile>/.well-known/ocx.json` must be reachable at the exact path.

Several skills are MIT-licensed, sourced from
[BagelHole/DevOps-Security-Agent-Skills](https://github.com/BagelHole/DevOps-Security-Agent-Skills).
