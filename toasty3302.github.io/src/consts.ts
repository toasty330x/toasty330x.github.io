import type { SvgComponent } from "astro/types";
import Email from "@/assets/icons/email.svg";
import GitHub from "@/assets/icons/github.svg";
import RSS from "@/assets/icons/rss.svg";
import Twitter from "@/assets/icons/twitter.svg";

export const SITE = {
  title: "toasty's blogs",
  description: "I f*ck around and I want to find out",
  locale: "en-US",
  dir: "ltr",
  defaultPageImage: "/static/09IO052T1-full.webp",
  defaultPostImage: "/static/1200x630.png",
} as const;

export const NAVIGATION = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/authors", label: "Authors" },
];

export const SOCIALS: { href: string; label: string; icon: SvgComponent }[] = [
  { href: "https://github.com/toasty3302", label: "GitHub", icon: GitHub },
  { href: "https://twitter.com/toasty3302", label: "Twitter", icon: Twitter },
  { href: "mailto:billnguyen080306@gmail.com", label: "Email", icon: Email },
  { href: "/rss.xml", label: "RSS", icon: RSS },
];

const HOUR = 60 * 60 * 1000;

// How long ephemeral entries stay visible after their `date`
export const EXPIRY = {
  status: 24 * HOUR,
  highlights: 30 * 24 * HOUR,
} as const;

export const GISCUS = {
  repo: "toasty3302/toasty3302.github.io",
  repoId: "R_kgDOS36gMg",
  category: "Announcements",
  categoryId: "DIC_kwDOS36gMs4DIc2-",
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
} as const;
