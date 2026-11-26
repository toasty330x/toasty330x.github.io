// Client-side companion to getStatus/getHighlights: the static build can be
// older than the entries it contains, so expired ones are pruned in-browser
// and relative timestamps are kept fresh.

const rtf = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
  style: "narrow",
})

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["day", 24 * 60 * 60 * 1000],
  ["hour", 60 * 60 * 1000],
  ["minute", 60 * 1000],
]

function timeAgo(date: Date) {
  const diff = date.getTime() - Date.now()
  for (const [unit, ms] of UNITS) {
    if (Math.abs(diff) >= ms) return rtf.format(Math.round(diff / ms), unit)
  }
  return "just now"
}

function tick() {
  const now = Date.now()
  for (const el of document.querySelectorAll<HTMLElement>("[data-expires]")) {
    if (Date.parse(el.dataset.expires ?? "") <= now) el.remove()
  }
  for (const el of document.querySelectorAll<HTMLTimeElement>(
    "time[data-ago]",
  )) {
    el.textContent = timeAgo(new Date(el.dateTime))
  }
}

tick()
setInterval(tick, 60 * 1000)
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") tick()
})
