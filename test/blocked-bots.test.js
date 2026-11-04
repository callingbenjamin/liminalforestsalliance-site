// Run with: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isBlockedUA } from '../src/lib/blocked-bots.js';
import middleware from '../middleware.js';

// Representative User-Agent strings. Blocked ones are AI-training crawlers;
// allowed ones are search/answer crawlers and normal browsers that must
// keep receiving 200s.
const BLOCKED = [
  'Mozilla/5.0 (compatible; GPTBot/1.1; +https://openai.com/gptbot)',
  'Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
  'anthropic-ai',
  'CCBot/2.0 (https://commoncrawl.org/faq/)',
  'Mozilla/5.0 (compatible; Bytespider; spider-feedback@bytedance.com)',
  'meta-externalagent/1.1',
  'facebookbot',
  'Amazonbot/0.1 (+https://developer.amazon.com/support/amazonbot)',
  'cohere-ai',
  'cohere-training-data-crawler',
  'Diffbot/0.1',
  'Mozilla/5.0 (compatible; AI2Bot/1.0)',
  'Ai2Bot-Dolma',
  'omgili/0.5 +http://omgili.com',
  'Timpibot/0.1',
  'ImagesiftBot',
  'PanguBot',
  'img2dataset',
];

const ALLOWED = [
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  'Mozilla/5.0 (compatible; DuckDuckBot/1.1; +http://duckduckgo.com/duckduckbot.html)',
  'Mozilla/5.0 (compatible; Applebot/0.1; +http://www.apple.com/go/applebot)',
  'Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)',
  'Mozilla/5.0 (compatible; ChatGPT-User/1.0; +https://openai.com/bot)',
  'Mozilla/5.0 (compatible; Claude-SearchBot/1.0; +https://www.anthropic.com/claude-searchbot)',
  'Claude-User/1.0 (+https://www.anthropic.com/claude-user)',
  'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
  'Mozilla/5.0 (compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
];

function makeRequest(ua) {
  return new Request('https://liminalforestsalliance.com/', {
    headers: ua ? { 'user-agent': ua } : {},
  });
}

test('isBlockedUA blocks AI-training crawlers', () => {
  for (const ua of BLOCKED) {
    assert.equal(isBlockedUA(ua), true, `expected blocked: ${ua}`);
  }
});

test('isBlockedUA allows search/answer crawlers and browsers', () => {
  for (const ua of ALLOWED) {
    assert.equal(isBlockedUA(ua), false, `expected allowed: ${ua}`);
  }
});

test('isBlockedUA is case-insensitive', () => {
  assert.equal(isBlockedUA('GPTBOT'), true);
  assert.equal(isBlockedUA('gptbot'), true);
  assert.equal(isBlockedUA('GptBot'), true);
});

test('isBlockedUA treats empty/missing UA as allowed', () => {
  assert.equal(isBlockedUA(''), false);
  assert.equal(isBlockedUA(undefined), false);
  assert.equal(isBlockedUA(null), false);
});

test('middleware returns 403 for blocked crawlers', async () => {
  for (const ua of BLOCKED) {
    const res = middleware(makeRequest(ua));
    assert.ok(res instanceof Response, `expected a Response for ${ua}`);
    assert.equal(res.status, 403, `expected 403 for ${ua}`);
  }
});

test('middleware lets allowed crawlers and browsers through', () => {
  for (const ua of ALLOWED) {
    const res = middleware(makeRequest(ua));
    assert.equal(res, undefined, `expected pass-through for ${ua}`);
  }
});
