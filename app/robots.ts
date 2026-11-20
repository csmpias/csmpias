import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Bots that fetch pages live to answer a real user's question (and can
// cite/link back to the site) — the AI-era equivalent of search referral
// traffic. Listed explicitly (instead of relying on the "*" allow-all) so
// an operator can see at a glance which ones are intentionally welcomed,
// since some sites block these by default.
const allowedAiCrawlers = [
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "DuckAssistBot",
  "Applebot",
];

// Bulk, offline corpus-training crawlers — high request volume, no
// real-time search ranking or citation value, so there's no SEO cost to
// keeping them out; also reduces regeneration load on ISR-cached pages.
const blockedTrainingCrawlers = [
  "GPTBot",
  "Google-Extended",
  "GoogleOther",
  "anthropic-ai",
  "CCBot",
  "cohere-ai",
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
      ...allowedAiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/admin", "/api"],
      })),
      ...blockedTrainingCrawlers.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
