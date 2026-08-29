# 项目内自包含的依赖环境（零本机环境改动）

用户明确要求的硬性标准：**所有依赖必须完全独立于本项目内部，禁止改动本机任何已有环境**。规则：

1. 运行时只用宿主机已有的 Node（不升级、不改配置）。
2. 包管理器通过 corepack 按需加载，版本由根 `package.json` 的 `packageManager` 字段锁定；**禁止** `corepack enable`、`npm install -g`、修改任何全局 PATH/shim/配置。
3. 包缓存通过 `pnpm-workspace.yaml` 的 `storeDir: .pnpm-store` 收进项目目录（已 gitignore）；`node_modules` + `pnpm-lock.yaml` 保证依赖本体与版本可复现。
4. 新依赖一律进入 workspace 的 devDependencies/dependencies；pnpm 要求审批构建脚本时（`onlyBuiltDependencies`），逐个审慎添加，禁止全局绕过。

## Considered Options

- 全局安装工具链（如全局 pnpm、全局 vite）：被本硬性标准否决。
- Python 式 venv：Node 生态无此概念，本地 node_modules + 项目内 store + 锁定包管理器即等价物。

## Consequences

- 代价：每台开发机首次安装需下载完整 store（无跨项目共享缓存），磁盘占用略高——有意支付以换取环境隔离。
- 换机器/换盘时只需克隆仓库 + `corepack pnpm install`，环境即完整重建。
