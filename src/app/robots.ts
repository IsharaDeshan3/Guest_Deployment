import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://www.isararesidence.lk";

  // Major AI models, retrieval agents, and search crawlers
  const aiUserAgents = [
    "*",
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "ClaudeBot",
    "Claude-Web",
    "Anthropic-ai",
    "Google-Extended",
    "Googlebot",
    "Applebot-Extended",
    "PerplexityBot",
    "Perplexity-User",
    "Bytespider",
    "Cohere-ai",
    "Meta-ExternalAgent",
    "Meta-ExternalFetcher",
    "Amazonbot",
    "DuckAssistBot",
  ];

  return {
    rules: aiUserAgents.map((agent) => ({
      userAgent: agent,
      allow: "/",
    })),
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
