// RSS 2.0 feed for the blog, served at /blog/rss.xml.
// Generated at build time from src/data/blog.js.
import { renderBlogRss } from '../../data/blog.js';

export const prerender = true;

export function GET() {
  return new Response(renderBlogRss(), {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  });
}
