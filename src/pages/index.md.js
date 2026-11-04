// Markdown alternate of the home page, served at /index.md.
// Generated at build time from src/data/content.js (same source as the HTML).
import { renderMarkdown } from '../data/content.js';

export const prerender = true;

export function GET() {
  return new Response(renderMarkdown(), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
}
