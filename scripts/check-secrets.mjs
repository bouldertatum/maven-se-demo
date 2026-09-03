import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const files = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard"],
  { encoding: "utf8" },
)
  .split("\n")
  .filter(Boolean);

const forbiddenFiles = files.filter((file) => {
  const name = path.basename(file);
  return name.startsWith(".env") && name !== ".env.example";
});

const patterns = [
  { name: "GitHub token", regex: /gh[pousr]_[A-Za-z0-9]{20,}/g },
  { name: "AWS access key", regex: /AKIA[0-9A-Z]{16}/g },
  { name: "private key", regex: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g },
  { name: "generic live secret", regex: /(?:api[_-]?key|client[_-]?secret|access[_-]?token)\s*[:=]\s*["'][A-Za-z0-9_\-]{24,}["']/gi },
];

const findings = [];
for (const file of files) {
  let content;
  try {
    content = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  for (const pattern of patterns) {
    if (pattern.regex.test(content)) findings.push(`${file}: possible ${pattern.name}`);
    pattern.regex.lastIndex = 0;
  }
}

if (forbiddenFiles.length || findings.length) {
  console.error("Secret-safety check failed.");
  for (const file of forbiddenFiles) console.error(`${file}: environment file must not be committed`);
  for (const finding of findings) console.error(finding);
  process.exit(1);
}

console.log(`Secret-safety check passed for ${files.length} files.`);

