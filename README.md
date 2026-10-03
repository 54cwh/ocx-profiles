# ocx-profiles

An [OCX](https://github.com/kdcokenny/ocx) registry with my `deploy` profile —
a Linux server-operations setup for OpenCode V2.

## What's inside

`deploy` is a portable profile (skills, instructions, plugin, native config):

- **Skills**: backup-recovery, cron-doctor, docker-compose, docker-management,
  firewall-config, linux-administration, ssh-configuration, ssh-mcp-helper,
  systemd-services. (Several are MIT-licensed, sourced from
  [BagelHole/DevOps-Security-Agent-Skills](https://github.com/BagelHole/DevOps-Security-Agent-Skills).)
- **Plugin**: `no-rm` guard.
- **Config**: OpenCode V2 config (`opencode.jsonc`), CLI config (`cli.json`),
  AGENTS.md instructions.

## Install

```sh
ocx registry add <REGISTRY_URL> --name ocx-profiles --global
ocx profile add deploy --source ocx-profiles/deploy
ocx verify --profile deploy
ocx oc -p deploy
```

## Required environment variables

Secrets are **not** stored in this registry. Set these before launching:

| Variable | Used by |
|---|---|
| `ARK_API_KEY` | `volcark` provider (Volcengine ARK) |
| `TAVILY_API_KEY` | tavily MCP header + tavily-quota plugin |
| `DEEPSEEK_API_KEY` | opencode-plugin-usage |
| `CONTEXT7_API_KEY` | context7 MCP header |

The profile also expects an ssh MCP connection named `default`; configure it
with the real host/user after installing.

## Build

```sh
ocx validate .
ocx build . --out dist
```

Publish the full `dist/` directory as static files (GitHub Pages, Cloudflare,
Vercel, Netlify). `.well-known/ocx.json` must be reachable at the exact path.
