// Usage: bun run status "status text" [emoji]
import { mkdirSync, writeFileSync } from "node:fs"

const [text, emoji] = process.argv.slice(2)
if (!text) {
  console.error('Usage: bun run status "status text" [emoji]')
  process.exit(1)
}

const now = new Date()
const lines = [
  "---",
  `text: ${JSON.stringify(text)}`,
  ...(emoji ? [`emoji: ${JSON.stringify(emoji)}`] : []),
  `date: ${now.toISOString()}`,
  "---",
  "",
]
const dir = new URL("../src/content/status/", import.meta.url)
const file = new URL(`${now.toISOString().replace(/[:.]/g, "-")}.md`, dir)
mkdirSync(dir, { recursive: true })
writeFileSync(file, lines.join("\n"))
console.log(`Wrote ${file.pathname}`)
