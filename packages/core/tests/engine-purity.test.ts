import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Hard-standard guard (ADR-0004): the engine must be totally separated from
 * the content layer. No theme vocabulary may appear anywhere in core source.
 * When new theme concepts are introduced, they belong in content files and
 * host UI copy — never here.
 */
const THEME_PATTERN =
  /修为|闭关|境界|宗师|绝顶|不入流|秘籍|丹|秘境|装备|武器|招式|心法|门派|洗练|分解|江湖|武侠|奇遇|采集|炼丹|武功|流派|贡献/;

function listSourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...listSourceFiles(full));
    } else if (entry.endsWith(".ts") && !entry.endsWith(".test.ts")) {
      out.push(full);
    }
  }
  return out;
}

describe("engine purity", () => {
  it("contains no theme vocabulary in core source", () => {
    const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), "../src");
    const offenders: string[] = [];
    for (const file of listSourceFiles(srcDir)) {
      const text = readFileSync(file, "utf8");
      const match = text.match(THEME_PATTERN);
      if (match) offenders.push(`${file}: ${match[0]}`);
    }
    expect(offenders).toEqual([]);
  });
});
