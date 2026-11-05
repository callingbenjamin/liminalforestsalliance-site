// Markdown alternate of the Old Growth page, served at /old-growth.md.
// Generated at build time from src/data/listings-page.js (same source as the HTML).
import { renderListingsMarkdown } from '../data/listings-page.js';

export const prerender = true;

export function GET() {
  return new Response(renderListingsMarkdown(), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
}
