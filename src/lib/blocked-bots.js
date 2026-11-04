// Shared matcher for AI-training crawlers that must receive a 403.
//
// The pattern below is copied verbatim from no-ai-training-spec.md ("In-code
// 403" section) and is matched case-insensitively against the User-Agent.
// It deliberately does NOT include search/answer crawlers (Googlebot,
// Bingbot, Applebot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot,
// Claude-User, PerplexityBot, ...), which must continue to receive 200s.
//
// Keep this list in sync with the "Blocked" group in public/robots.txt.
export const BLOCKED_UA_PATTERN =
  'gptbot|claudebot|anthropic-ai|ccbot|bytespider|meta-externalagent|facebookbot|amazonbot|cohere-ai|cohere-training-data-crawler|diffbot|ai2bot|omgili|timpibot|imagesiftbot|pangubot|img2dataset';

export const blockedUaRegex = new RegExp(BLOCKED_UA_PATTERN, 'i');

// Returns true when the given User-Agent string belongs to a blocked
// AI-training crawler. Empty / missing user agents are never blocked.
export function isBlockedUA(userAgent) {
  if (!userAgent) return false;
  return blockedUaRegex.test(userAgent);
}
