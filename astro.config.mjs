import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read site config for dynamic site URL
let siteUrl = "https://example.com";
try {
  const config = JSON.parse(fs.readFileSync("./src/site-config.json", "utf-8"));
  const slug = config.business.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  siteUrl = `https://demo-${slug}.dream-surge.com`;
} catch {}

export default defineConfig({
  site: siteUrl,
  integrations: [sitemap()],
  vite: {
    resolve: {
      alias: {
        // Components import "../../lib/site-config" — resolve to src/lib/
        "../../lib/site-config": path.resolve(__dirname, "src/lib/site-config"),
        "../../lib/seo": path.resolve(__dirname, "src/lib/seo"),
      },
    },
    build: {
      cssMinify: true,
      minify: true,
    },
  },
  build: {
    format: "directory",
    assets: "_assets",
  },
});
