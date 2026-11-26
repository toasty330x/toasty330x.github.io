import { defineMdastPlugin } from "satteri"

const escapeHtml = (s: string) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")

const escapeAttr = (s: string) => escapeHtml(s).replaceAll('"', "&quot;")

export const discordMessage = defineMdastPlugin({
  name: "discord-message",
  containerDirective(node, ctx) {
    if (node.name !== "discord") return

    const attrs = node.attributes ?? {}
    const author = attrs.author ?? "unknown"
    const { avatar, badge, time, reply } = attrs

    const avatarEl = avatar
      ? `<img class="dm-avatar" src="${escapeAttr(avatar)}" alt="" width="40" height="40" loading="lazy" decoding="async">`
      : '<span class="dm-avatar dm-avatar--empty" aria-hidden="true"></span>'

    const headerEl =
      '<div class="dm-header">' +
      `<span class="dm-author">${escapeHtml(author)}</span>` +
      (badge ? `<span class="dm-badge">${escapeHtml(badge)}</span>` : "") +
      (time ? `<time class="dm-time">${escapeHtml(time)}</time>` : "") +
      "</div>"

    const replyEl = reply
      ? `<div class="dm-reply">${escapeHtml(reply)}</div>`
      : ""

    ctx.prependChild(node, { type: "html", value: avatarEl })
    ctx.prependChild(node, { type: "html", value: headerEl })
    if (replyEl) {
      ctx.prependChild(node, { type: "html", value: replyEl })
    }

    ctx.setProperty(node, "data", {
      hName: "discord-message",
      hProperties: {},
    })
  },
})
