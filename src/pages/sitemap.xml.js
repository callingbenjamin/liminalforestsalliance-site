// Sitemap, served at /sitemap.xml and generated at build time from the
// page list in src/data/content.js.
import { renderSitemap } from '../data/content.js';
import { blogPages } from '../data/blog.js';
import { listingsPages } from '../data/listings-page.js';
import { rewildingPages } from '../data/rewilding-page.js';

export const prerender = true;

export function GET() {
  return new Response(renderSitemap([...blogPages, ...listingsPages, ...rewildingPages]), {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
}
