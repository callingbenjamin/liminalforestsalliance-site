// Sitemap, served at /sitemap.xml and generated at build time from the
// page list in src/data/content.js.
import { renderSitemap } from '../data/content.js';

export const prerender = true;

export function GET() {
  return new Response(renderSitemap(), {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
}
