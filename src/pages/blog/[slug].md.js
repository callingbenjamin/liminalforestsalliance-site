// Markdown alternate of each blog post, served at /blog/<slug>.md.
// Generated at build time from src/data/blog.js (same source as the HTML).
import { posts, renderPostMarkdown } from '../../data/blog.js';

export const prerender = true;

export function getStaticPaths() {
  return posts.map((p) => ({ params: { slug: p.slug }, props: { post: p } }));
}

export function GET({ props }) {
  return new Response(renderPostMarkdown(props.post), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
}
