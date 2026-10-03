# OCX profiles 安装配置指南

一组给 OpenCode V2 用的 OCX profile。**每个 profile 是独立 registry**（OCX 规定一个 registry 只能有一个 profile，否则根文件 `AGENTS.md`/`opencode.jsonc` 等会冲突），都挂在这一个 GitHub Pages 站点的不同子路径下。

| profile | registry 地址 | 用途 |
|---|---|---|
| `deploy` | `https://54cwh.github.io/ocx-profiles/deploy` | 服务器运维：ssh MCP、Docker、systemd、防火墙、备份、cron、no-rm 保护 |
| `dev` | `https://54cwh.github.io/ocx-profiles/dev` | 编程开发：代码审查、数据库迁移、前端/UI、webapp 测试、shadcn + chrome-devtools MCP |
| `general` | `https://54cwh.github.io/ocx-profiles/general` | 通用办公/文档：docx/pptx/xlsx/pdf/latex2word、Obsidian、中文润色 |
| `quant` | `https://54cwh.github.io/ocx-profiles/quant` | 数据/量化：A 股数据、采集清洗、统计与因果推断 |
| `research` | `https://54cwh.github.io/ocx-profiles/research` | 科研/建模论文：文献检索、读写润色、引用核验，含 Stata(Wine)/OpenAlex/Zotero/MinerU MCP |

> `shop` 未发布。想用哪个装哪个，互不影响。

## 0. 前置条件

| 需要 | 说明 |
|---|---|
| **OCX 3（预览版）** | 不是 npm 默认的 2.x。见下。 |
| **OpenCode V2** | 要求 2.0.3 及以上（大版本 2）。V1 不兼容。 |
| **Bun** | OCX 3 运行/构建依赖。 |
| **Node.js + npx** | 部分 MCP server 用 npx 拉起。 |

```sh
bun add --global ocx@next   # 或 npm install --global ocx@next
ocx --version               # 应显示 3.x
```

若 `@next` 拉不到（预览未发布时），从 V2 分支源码构建：

```sh
git clone -b <v2-branch> https://github.com/kdcokenny/ocx
cd ocx && bun install --frozen-lockfile && bun run --cwd packages/cli build
alias ocx="bun \"$PWD/packages/cli/dist/index.js\""
```

## 1. 安装某个 profile

```sh
ocx registry add https://54cwh.github.io/ocx-profiles/<profile> --name ocx-<profile> --global
ocx profile add <profile> --source ocx-<profile>/<profile>
ocx verify --profile <profile>
ocx oc -p <profile>
```

例（dev）：

```sh
ocx registry add https://54cwh.github.io/ocx-profiles/dev --name ocx-dev --global
ocx profile add dev --source ocx-dev/dev
```

装好后 profile 在 `~/.config/ocx/profiles/<profile>/`，可直接改。

## 2. 更新（发布后再拉新版）

```sh
ocx update --all --profile <profile> --dry-run   # 先预览
ocx update --all --profile <profile>             # 应用
ocx verify --profile <profile>
```

OCX 用所有权回执 + 内容比对：**你本地改过的文件会被保留**，两边都改过会停下来让你处理（`--force` 可强制覆盖本地改动）。所以「装完先按第 3 节改掉本机不相干的配置」不会在更新时被冲掉。

## 3. 环境变量（密钥不入库，必须自己设）

先设通用四个：

| 变量 | 用途 | 备注 |
|---|---|---|
| `TAVILY_API_KEY` | tavily MCP + 配额插件 | 需要 |
| `DEEPSEEK_API_KEY` | 用量统计插件 | 需要 |
| `CONTEXT7_API_KEY` | context7 MCP | 需要 |
| `ARK_API_KEY` | 火山方舟 volcark provider | **可选**，不用 volcark 就删掉 `providers` 段即可 |

写进 `~/.bashrc` / `~/.zshrc`：

```sh
export TAVILY_API_KEY=xxx
export DEEPSEEK_API_KEY=xxx
export CONTEXT7_API_KEY=xxx
```

`research` 额外需要（按需）：

```sh
export MINERU_API_TOKEN=xxx
export OPENALEX_API_KEY=xxx
export OPENALEX_EMAIL=you@example.com
export ZOTERO_API_KEY=xxx
```

## 4. 装完必改的本机配置

默认值绑的是原作者的机器，不改多半跑不起来。

### 4.1 通用：`ocx.jsonc` 的 `bin`
默认 `opencode2`（原作者的可执行名），多数人是 `opencode`：

```jsonc
{ "bin": "opencode" }
```

或不动文件，启动前 `export OPENCODE_BIN=/absolute/path/to/opencode`（优先级：profile `bin` > `OPENCODE_BIN` > PATH 上的 `opencode`）。

### 4.2 通用：tavily MCP 指向本机代理
`opencode.jsonc` 里 `tavily.url = "http://127.0.0.1:27890/mcp"` 是作者本机代理。二选一：改成 Tavily 官方托管 MCP 地址（按其官方文档填 key），或 `"disabled": true` / 删掉。`cli.json` 里 `@cardinal4/opencode-tavily-quota` 的 `"proxyUrl": "http://127.0.0.1:27890"` 一起处理。

### 4.3 `deploy`：ssh MCP 主机
`opencode.jsonc` 里 ssh MCP 的 `--host myserver` 是 `~/.ssh/config` 别名，改成你自己的；`AGENTS.md` 里的 `<SERVER_NAME>`、`<SSH_USER>@<SERVER_HOST>:<PORT>` 换成真实信息，ssh MCP 连接名保持 `default`。

### 4.4 `research`：Stata(Wine) MCP（仅 Linux 需要）
Stata MCP 走 `~/.local/share/opencode2/mcphub` 下的本地构建，**上游在 https://github.com/54cwh/mcp-for-stata-wine**（公开的 Wine 版 fork，源自 SepineTam/stata-mcp）。设置：

```sh
export STATA_MCP_BIN=...
export STATA_MCP_STATA_CLI=...
export STATA_MCP_WINE_PREFIX=...
export STATA_MCP_CWD=...
```

**非 Linux / 不用 Stata 的话**，直接从 `opencode.jsonc` 里删掉 `mcp-for-stata-wine` 这项即可，其余照用。

### 4.5 `research`：latex2word 需要装依赖
该 skill 的 `node_modules` 没打包，装好后在 skill 目录跑一次：

```sh
npm ci
```

（路径：`~/.config/ocx/profiles/research/skills/latex2word/`）

## 5. 插件与网络

首次启动会按 `opencode.jsonc` / `cli.json` 自动拉一批 npm / git 插件，其中 `superpowers@git+https://github.com/obra/superpowers.git#v6.4.1` 走 GitHub，网络不通会装不上。不需要的插件可直接从配置里删。

## 6. 常见问题

- **`ocx profile add` 报 `NETWORK_ERROR` / socket closed**：网络抖动，重跑一次。
- **启动后找不到 `opencode2`**：见 4.1。
- **tavily MCP 连不上**：见 4.2，那是本机代理地址。
- **ssh 工具报错**：见 4.3。
- **Stata MCP 报错 / 不是 Linux**：见 4.4，删掉该 MCP 即可。

部分 skill 源自 MIT 许可的 [BagelHole/DevOps-Security-Agent-Skills](https://github.com/BagelHole/DevOps-Security-Agent-Skills)。
