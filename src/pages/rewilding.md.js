// Markdown alternate of the Rewilding page, served at /rewilding.md.
// Generated at build time from src/data/rewilding-page.js (same source as the HTML).
import { renderRewildingMarkdown } from '../data/rewilding-page.js';

export const prerender = true;

export function GET() {
  return new Response(renderRewildingMarkdown(), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
}
