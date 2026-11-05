// Markdown alternate of the blog index, served at /blog.md.
// Generated at build time from src/data/blog.js (same source as the HTML).
import { renderBlogIndexMarkdown } from '../data/blog.js';

export const prerender = true;

export function GET() {
  return new Response(renderBlogIndexMarkdown(), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
}
