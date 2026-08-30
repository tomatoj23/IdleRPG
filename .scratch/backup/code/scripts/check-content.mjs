// Content pipeline hard gate (ADR-0003): validates every content file against
// its JSON Schema. Fails with a non-zero exit code so it can be wired into
// CI / pre-commit. The file-to-schema mapping lives here.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const MAP = [
  ["content/config/realms.json", "schemas/config/realms.schema.json"],
  ["content/config/activities.json", "schemas/config/activities.schema.json"],
  ["content/config/resources.json", "schemas/config/resources.schema.json"],
  ["content/config/settings.json", "schemas/config/settings.schema.json"],
];

const ajv = new Ajv({ allErrors: true });

// Optional CLI override: `node check-content.mjs <content> <schema> [...]`
// (pairs) validates ad-hoc files — used to gate editor/agent saves too.
const argv = process.argv.slice(2);
const pairs =
  argv.length > 0
    ? Array.from({ length: argv.length / 2 }, (_, i) => [argv[i * 2], argv[i * 2 + 1]])
    : MAP;

let failed = false;
for (const [contentPath, schemaPath] of pairs) {
  const schema = JSON.parse(readFileSync(resolve(root, schemaPath), "utf8"));
  const validate = ajv.compile(schema);
  const data = JSON.parse(readFileSync(resolve(root, contentPath), "utf8"));
  if (!validate(data)) {
    failed = true;
    console.error(`INVALID ${contentPath} (schema: ${schemaPath})`);
    for (const err of validate.errors ?? []) {
      console.error(`  - ${err.instancePath} ${err.message}`);
    }
  } else {
    console.log(`OK      ${contentPath}`);
  }
}

process.exit(failed ? 1 : 0);
