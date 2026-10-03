## 领域：数据 / 量化
- A 股行情/财务/板块/选股用 akshare-stock 技能。
- 任何数字都要给数据来源与时间范围，不臆造。
- 回测/统计结论要说明假设与局限。

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
