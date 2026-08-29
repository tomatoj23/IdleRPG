# Content pipeline: `content/` 目录与批量写入约定

游戏内容全部以 JSON 文件存放在 `content/`，以 JSON Schema 校验为硬门禁。修改内容的 AI agent 必须遵守本约定。

## 目录结构

```
content/
├── martial/          # 武功（招式 + 心法），字段 kind 区分
├── equipment/        # 装备基件与词缀池
├── monster/          # 怪物
├── dungeon/          # 秘境与层配置
├── herb/             # 药材
├── pill/             # 丹方与丹药
├── sect/             # 门派
├── event/            # 奇遇事件文本
├── lore/             # 世界观长文本（Markdown）：故事背景、势力关系等
└── style-guide.md    # 文风指南：叙事字段必须遵守
schemas/              # 与 content/ 一一对应的 JSON Schema
assets/               # 美术资产（MVP 允许为空）
├── icons/<集合>/<id>.png
└── portraits/<集合>/<id>.png
```

## 硬性规则

- **id 一经发布不可变更**：资产路径、存档引用都依赖它。命名格式 `<集合缩写>-<门派/区域>-<序号>`，如 `mrt-hs-001`（华山招式 1）、`mon-sy-014`（山魈 14）。id 只用小写字母、数字、连字符。
- 每个条目必须通过对应 Schema 校验后才能提交。校验命令：`npm run content:check`。
- 叙事字段（`description`、事件文本等）必须遵守 `content/style-guide.md` 的武侠语体；世界背景类长文写入 `content/lore/*.md`。
- 资产不内嵌 base64、不写绝对路径；引用走约定路径，确需覆盖时用条目的 `art` 字段（相对 `assets/` 的路径）。
- 禁止修改 `schemas/` 下的定义来迁就一次内容写入；Schema 变更是独立决策，需同步 `core` 校验器与编辑器表单。

## 批量生成工作流

1. 明确目标集合与数量（如"给 3 个秘境共 30 只怪物补 description"）。
2. 读取该集合现有条目与 `content/style-guide.md`，保持语体一致。
3. 写入/修改条目 JSON（每条目一文件，保持既有 id 不动）。
4. 运行 `npm run content:check`，全部通过才算完成；报错必须修复而不是跳过校验。
5. 汇报变更清单（新增/修改的 id 列表），便于人工抽查。

## 批量数值调整

平衡性批量调整（如"全部黄阶武功攻击 +10%"）优先使用编辑器的表格视图多选操作；用 agent 做时，必须在汇报中列出调整前后数值对照表，并同样通过 `content:check`。
