import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const sitemapUrl = new URL("/sitemap-index.xml", import.meta.env.SITE).href;

  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`,
    { headers: { "Content-Type": "text/plain" } }
  );
};
