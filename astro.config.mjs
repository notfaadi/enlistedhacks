import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'https://enlistedhacks.net',
  trailingSlash: 'always',
  redirects: {
    '/privacy/': '/privacy-policy/',
    '/products/enlisted-hacks/': '/enlisted-hacks/',
    '/cheats/': '/products/enlisted-hacks/',
    '/cheats/lite/': '/products/enlisted-hacks/',
    '/cheats/pro/': '/products/enlisted-hacks/',
    '/cheats/elite/': '/products/enlisted-hacks/elite/',
    '/cheats/compare/': '/blog/enlisted-lite-vs-pro/',
    '/products/dota-2-cheats/': '/products/enlisted-hacks/',
    '/products/dota-2-cheats/elite/': '/products/enlisted-hacks/elite/',
    '/products/dota-2-cheats/utilities/': '/products/enlisted-hacks/utilities/',
    '/contact/': '/support/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
