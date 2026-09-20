import { spawnSync } from 'node:child_process'

// tailwind-lint exits 0 even when it reports warnings, so this wrapper turns any
// diagnostic into a non-zero exit and makes the check usable in CI. Generated
// shadcn/ui components are skipped: their overlapping variants are intentional
// and already ignored by oxlint.
const IGNORED_PREFIX = 'src/components/ui/'

const result = spawnSync('tailwind-lint', ['--format', 'json'], { encoding: 'utf8' })

if (result.error) {
  console.error(result.error.message)
  process.exit(2)
}

const report = JSON.parse(result.stdout)
const diagnostics = report.files
  .filter((file) => !file.path.startsWith(IGNORED_PREFIX))
  .flatMap((file) => file.diagnostics.map((diagnostic) => ({ file: file.path, ...diagnostic })))

for (const { file, line, column, severity, message, code } of diagnostics) {
  console.log(`${file}:${line}:${column}  ${severity}  ${message}  (${code})`)
}

console.log(
  diagnostics.length === 0
    ? 'tailwind-lint: no problems found'
    : `tailwind-lint: ${diagnostics.length} problem(s) found`,
)

process.exit(diagnostics.length === 0 ? 0 : 1)
