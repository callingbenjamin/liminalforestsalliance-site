// Vercel Routing Middleware (works for non-Next projects too).
//
// Second layer of the "no AI training" policy: any request whose User-Agent
// matches a blocked AI-training crawler gets a 403. /robots.txt is excluded
// via the matcher below so every bot can always read the published policy.
//
// See no-ai-training-spec.md. The Vercel firewall rule is managed separately
// in the dashboard; this file is the in-code layer.
import { isBlockedUA } from './src/lib/blocked-bots.js';

export const config = {
  // Match everything except /robots.txt so the policy stays readable to all.
  matcher: ['/((?!robots\\.txt).*)'],
};

export default function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';

  if (isBlockedUA(userAgent)) {
    return new Response(
      'Forbidden: this site does not permit AI-training crawlers.\n',
      {
        status: 403,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      },
    );
  }

  // Not a blocked crawler: return nothing so the request continues normally.
}
