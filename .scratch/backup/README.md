# 归档快照（2026-08-30）

远端仓库清空、本地代码工作清零前的完整归档，供回溯。**本机 git 历史与全部设计文档不受影响**（保留在项目根目录）。

## 一、归档的代码工作（`./code/`）

ticket #2「引擎骨架 tracer bullet」的全部实现产物，原样移入：

| 目录/文件 | 内容 |
|---|---|
| `packages/` | `@idlerpg/core`：引擎门面 `createGame`、`ContentRegistry`、迁移机制、17 项测试（含 engine-purity 禁题材词守卫） |
| `apps/` | `@idlerpg/web`（React 壳：闭关/修为/本地存档/离线结算）与 `@idlerpg/editor`（占位包） |
| `schemas/`、`scripts/` | 四份 JSON Schema 与 `check-content.mjs` 硬门禁 |
| `config/` | `content/config/` 四份内容数据（realms / activities / resources / settings） |
| `package.json`、`pnpm-workspace.yaml`、`pnpm-lock.yaml`、`tsconfig.base.json`、`.gitignore` | 工程配置（含 ADR-0007 的 `packageManager` 与 `storeDir: .pnpm-store`） |

**恢复方式**：把上述目录/文件移回项目根，执行 `corepack pnpm install` 即可重建环境（`node_modules` 仍在原位未删；pnpm 内容寻址缓存 `.pnpm-store` 未随行，缺失时会自动重新下载）。

## 二、归档的票据（`./issues/`）

17 张 GitHub issue 的正文、评论、标签、状态与原生阻塞关系，编号 1~17 一一对应。索引：

- [#1 MVP 规格：武侠放置 RPG（境界 × 门派流派 × 装备驱动构筑）](./issues/1.md) — OPEN
- [#2 引擎骨架 tracer bullet](./issues/2.md) — CLOSED（已完成，commit `cae6dab`）
- [#3 突破循环](./issues/3.md) — OPEN
- [#4 秘境战斗最小循环](./issues/4.md) — OPEN
- [#5 掉落与装备穿戴](./issues/5.md) — OPEN
- [#6 秘籍与武功装配](./issues/6.md) — OPEN
- [#7 采药炼丹链](./issues/7.md) — OPEN
- [#8 门派贡献与兑换](./issues/8.md) — OPEN
- [#9 分解与洗练](./issues/9.md) — OPEN
- [#10 战斗视觉层](./issues/10.md) — OPEN
- [#11 MUD 叙事层](./issues/11.md) — OPEN
- [#12 奇遇事件](./issues/12.md) — OPEN
- [#13 CloudBase 云存档](./issues/13.md) — OPEN
- [#14 排行榜](./issues/14.md) — OPEN
- [#15 内容编辑器](./issues/15.md) — OPEN
- [#16 MVP 内容盘子补齐](./issues/16.md) — OPEN
- [#17 图鉴](./issues/17.md) — OPEN

## 三、仓库标签（清空前的完整列表）

accessibility、bug、documentation、duplicate、enhancement、good first issue、help wanted、invalid、question、**ready-for-agent**（本项目自定义，已删）、wontfix
