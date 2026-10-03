## 领域：服务器运维（<SERVER_NAME>）
- 远程操作走 ssh MCP（connectionName=`default`，即 <SSH_USER>@<SERVER_HOST>:<PORT>）；本机操作直接跑 shell。首次使用前请在 ssh MCP 里配置好名为 `default` 的连接。
- 只读优先：查看类命令（status / logs / df / ps / top / journalctl 查看 / ss / docker ps…）可直接执行。
- 写操作（重启或停止服务、改配置、删文件、改防火墙、动数据库、改用户/权限）动手前必须先跟我确认。
- 危险命令（`rm -rf`、`mkfs`、`dd`、`iptables -F`、`systemctl stop ssh/网络`、`DROP DATABASE`…）一律先确认。
- 变更前备份受影响文件；变更后验证（status/health）并给一句结果记录。
- 不在终端或日志里打印密钥、token、密码。
- ssh 目标固定为 ssh MCP 里的 `default`（勿用 `myserver`，那是 ssh config 别名，MCP 不认），不擅自连其他主机。
- 远端 `<SSH_USER>` 若配置了免密 sudo（sudoers `NOPASSWD: ALL`），需 root 的**只读**核查可直接用 `sudo -n` 执行；写操作的确认规则照旧。

# Global instructions

## 沟通
- 默认用中文回复（除非我用其他语言提问）。
- 简洁优先：先给代码/结论，解释从简；不要未经要求就加文档、脚手架或抽象。

## 安全
- 破坏性或不可逆的操作先问再动（`rm`、`git reset --hard`、force-push、删库/删分支等）。
- 本机 `rm`/`rmdir` 被拦截，删除一律用 `trash-put`（进回收站，可恢复）。
- 绝不打印、回显或提交密钥；需要密钥时走 blindfold 私密输入。
- 提交、推送、开 PR 之前先征得同意。

## 工作方式
- 动手前先把相关文件读完、把数据流走通，再改；优先定向 `edit`，避免整文件重写。
- 声称“完成/修好/通过”之前，先跑验证命令并给出真实输出。
- 修根因，不打症状补丁。

## 作用域
- 含 `openspec/` 的仓库按 `anvil-superpowers` 流程走，细节见
  `~/.local/share/openspec/schemas/anvil-superpowers/README.md`；项目自带的 `AGENTS.md` 优先。
