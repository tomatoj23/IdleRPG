import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const REPO = "tomatoj23/IdleRPG";
const OUT = ".scratch/backup/issues";

function gh(args) {
  return execFileSync("gh", args, { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });
}

mkdirSync(OUT, { recursive: true });

const index = [];
for (let n = 1; n <= 17; n++) {
  const issue = JSON.parse(gh(["issue", "view", String(n), "--repo", REPO, "--json", "number,title,state,labels,body,createdAt,updatedAt"]));
  const comments = JSON.parse(gh(["issue", "view", String(n), "--repo", REPO, "--json", "comments"])).comments;
  const deps = JSON.parse(gh(["api", `repos/${REPO}/issues/${n}`, "--jq", ".issue_dependencies_summary"]));

  const lines = [];
  lines.push(`# #${issue.number} ${issue.title}`);
  lines.push("");
  lines.push(`- 状态：${issue.state}`);
  lines.push(`- 标签：${(issue.labels ?? []).map((l) => l.name).join(", ") || "（无）"}`);
  lines.push(`- 创建：${issue.createdAt}　更新：${issue.updatedAt}`);
  lines.push(`- 原生阻塞（未关闭的阻塞者）：${deps.blocked_by ?? 0}`);
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(issue.body ?? "");
  if (comments.length > 0) {
    lines.push("");
    lines.push("---");
    lines.push("");
    lines.push("## 评论");
    lines.push("");
    for (const c of comments) {
      lines.push(`**${c.author?.login ?? "unknown"}** @ ${c.createdAt}:`);
      lines.push("");
      lines.push(c.body ?? "");
      lines.push("");
    }
  }
  writeFileSync(`${OUT}/${n}.md`, lines.join("\n"), "utf8");
  index.push(`- [#${issue.number} ${issue.title}](./issues/${n}.md) — ${issue.state}`);
}

const meta = gh(["api", `repos/${REPO}/labels`, "--jq", ".[].name"]) || "";
const readme = [
  "# 远端仓库备份快照（2026-08-30）",
  "",
  "清空远端仓库前的完整快照，供回溯。本机 git 历史与全部文档不受影响。",
  "",
  "## 票据清单",
  "",
  ...index,
  "",
  "## 仓库标签",
  "",
  ...meta.split("\n").filter(Boolean).map((l) => `- ${l}`),
  "",
].join("\n");
writeFileSync(".scratch/backup/README.md", readme, "utf8");
console.log("backup complete:", index.length, "issues");
