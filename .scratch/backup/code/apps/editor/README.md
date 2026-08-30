# @idlerpg/editor

内容编辑器占位包。实现任务见 GitHub issue #15（Schema 驱动表单 + 表格批量调整 + 本地文件读写 dev server）。

内容编辑遵循：

- 表单与校验由 `schemas/` 的 JSON Schema 驱动，无独立数据模型
- 读写目标永远是 `content/` 下的 JSON 文件（与手改、agent 修改同一数据源）
- 保存前必须通过 `npm run content:check`
