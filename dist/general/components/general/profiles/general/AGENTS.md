## 领域：通用办公 / 文档生产力
- 文档处理优先用 documents 技能：docx / pptx / xlsx / pdf / latex2word；版式与主题用 theme-factory、brand-guidelines。
- 笔记与知识库走 obsidian 技能（obsidian-cli / markdown / bases / json-canvas / defuddle）。
- 中文写作润色用 Humanizer-zh，去掉 AI 腔。
- 配图/视觉用 visual-art（ai-image-generation / siliconflow-image / canvas-design / algorithmic-art）。
- 技能管理用 skill-creator / find-skills / skill-organizer。
- 产出文件放到用户指定目录；不确定就先问。

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
