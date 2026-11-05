// Page orchestration: smooth scroll, scroll-driven scenes, film playback,
// reveals, header state, the menu and the mailing-list sign-up. (The land
// index and its globe live on /listings, in src/pages/listings.astro.)
// The page is fully readable without this script (see `.js` / `.static` in CSS).
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { initHeader } from './header.js';

const root = document.documentElement;
const RM = root.classList.contains('rm');
const STATIC = root.classList.contains('static');
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const fmt = (n) => n.toLocaleString('en-US');
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const setInert = (el, on) => {
  if (!el) return;
  if (on) el.setAttribute('inert', '');
  else el.removeAttribute('inert');
};

// ------------------------------------------------------------------ smooth scroll
const lenis = STATIC ? null : new Lenis({ autoRaf: false, lerp: 0.09, wheelMultiplier: 0.95 });
if (lenis) window.__lenis = lenis;

// ------------------------------------------------------------------ in-page navigation
const cut = $('[data-cut]');
function jumpTo(target) {
  const top = target.getBoundingClientRect().top;
  const far = Math.abs(top) > window.innerHeight * 2.2;
  const focus = () => {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };
  if (!lenis || RM) {
    window.scrollTo({ top: top + window.scrollY, behavior: 'auto' });
    focus();
    return;
  }
  if (!far) {
    lenis.scrollTo(target, { duration: 1.2, easing: ease, onComplete: focus });
    return;
  }
  // Long jumps: dissolve to night, cut, dissolve back, instead of racing past every scene.
  cut.classList.add('is-on');
  setTimeout(() => {
    lenis.scrollTo(target, { immediate: true, force: true });
    focus();
    requestAnimationFrame(() => requestAnimationFrame(() => cut.classList.remove('is-on')));
  }, 330);
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const target = id ? document.getElementById(id) : null;
  if (!target) return;
  e.preventDefault();
  closeMenu(false);
  jumpTo(target);
  history.replaceState(null, '', `#${id}`);
});

// ------------------------------------------------------------------ scroll scenes
const scenes = [];
function scene(el, fn, { mode = 'sticky', a = 0.85, b = 0.3 } = {}) {
  if (el) scenes.push({ el, fn, mode, a, b, last: -1 });
}
function measure(s, vh) {
  const r = s.el.getBoundingClientRect();
  if (s.mode === 'sticky') {
    const dist = r.height - vh;
    return dist > 0 ? clamp(-r.top / dist) : r.top <= 0 ? 1 : 0;
  }
  return clamp((vh * s.a - r.top) / (vh * (s.a - s.b)));
}

const heroEl = $('[data-hero]');
const heroCopy = $('[data-hero-copy]');
const heroFoot = $('.hero-foot');

/**
 * Scroll-staged content stays in the accessibility tree. Faded controls only
 * ignore pointer clicks; if a keyboard user tabs to one, scroll it into view.
 */
function revealOnFocus(el, scrollTarget) {
  el?.addEventListener('focusin', () => {
    if (!el.classList.contains('is-gone')) return;
    const y = typeof scrollTarget === 'function' ? scrollTarget() : scrollTarget;
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
  });
}

if (!STATIC) {
  scene(heroEl, (p) => {
    heroEl.style.setProperty('--hp', p.toFixed(4));
    heroCopy.classList.toggle('is-gone', p > 0.2);
    // The film control is a control, not content: remove it once it has faded.
    const footGone = p > 0.15;
    heroFoot?.classList.toggle('is-gone', footGone);
    setInert(heroFoot, footGone);
  });
  revealOnFocus(heroCopy, 0);

  const scrub = $('[data-scrub-words]');
  scene(scrub, (p) => scrub.style.setProperty('--sp', p.toFixed(3)), { mode: 'range', a: 0.85, b: 0.4 });

  const edge = $('[data-edge]');
  const edgeStage = edge?.firstElementChild;
  scene(edge, (p) => edgeStage.style.setProperty('--ep', p.toFixed(4)));

  const finale = $('[data-finale]');
  const finaleActions = $('.finale-actions', finale || document);
  const finaleStage = finale?.firstElementChild;
  scene(finale, (p) => {
    const fp = clamp(p * 1.6);
    finaleStage.style.setProperty('--fp', fp.toFixed(4));
    finaleActions?.classList.toggle('is-gone', fp < 0.36);
  });
  // Tabbing to the closing buttons scrolls to where they are fully shown.
  revealOnFocus(finaleActions, () => {
    const r = finale.getBoundingClientRect();
    return window.scrollY + r.top + (r.height - window.innerHeight) * 0.7;
  });
}

// ------------------------------------------------------------------ approach (illustrated plate)
const track = $('[data-approach]');
if (track && !STATIC) {
  const stage = track.firstElementChild;
  const steps = $$('[data-step]', track);
  const labels = JSON.parse(track.dataset.labels || '[]');
  const labelEl = $('[data-map-label]', track);
  const numEl = $('[data-step-num]', track);
  const reticle = $('[data-reticle]', track);
  const [cx, cy] = (track.dataset.center || '800,500').split(',').map(Number);
  const path = [[260, 220], [1240, 300], [420, 780], [1180, 760], [cx, cy]];
  let cur = -1;
  const reticleAt = (t) => {
    const n = path.length - 1;
    const f = clamp(t) * n;
    const i = Math.min(n - 1, Math.floor(f));
    const k = ease(f - i);
    return [path[i][0] + (path[i + 1][0] - path[i][0]) * k, path[i][1] + (path[i + 1][1] - path[i][1]) * k];
  };
  scene(track, (p) => {
    const st = clamp(p * 1.04);
    const s = [0, 1, 2, 3].map((k) => clamp((st - k * 0.235) / 0.19));
    stage.style.setProperty('--ap', st.toFixed(4));
    s.forEach((v, k) => stage.style.setProperty(`--s${k + 1}`, v.toFixed(4)));
    const idx = clamp(Math.floor(st / 0.235), 0, 3);
    if (idx !== cur) {
      cur = idx;
      steps.forEach((el, k) => {
        el.classList.toggle('is-active', k === idx);
        el.classList.toggle('is-past', k < idx);
      });
      if (numEl) numEl.textContent = String(idx + 1);
      if (labelEl && labels[idx]) labelEl.textContent = labels[idx];
    }
    if (reticle) {
      const [x, y] = reticleAt(s[0]);
      reticle.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    }
  });
}

// ------------------------------------------------------------------ film
const film = $('[data-film]');
const filmToggle = $('[data-film-toggle]');
// The pause control is no longer visible, so a pause is not remembered between
// visits (otherwise a returning visitor could be left with a frozen film and no
// visible way to restart it). Clear any choice saved by the earlier version.
let filmPaused = false;
try {
  localStorage.removeItem('lfa-film');
} catch {
  /* storage unavailable */
}
function setFilmPaused(paused) {
  filmPaused = paused;
  if (filmToggle) {
    filmToggle.setAttribute('aria-pressed', String(paused));
    $('[data-film-label]', filmToggle).textContent = paused ? 'Play film' : 'Pause film';
  }
  if (!film) return;
  if (paused) film.pause();
  else if (filmVisible) film.play().catch(() => {});
}
let filmVisible = true;
if (film) {
  const saveData = navigator.connection?.saveData;
  if (RM || saveData) {
    filmToggle?.setAttribute('hidden', '');
  } else {
    // 720p up to typical laptop widths; 1080p only on large screens.
    const small = window.matchMedia('(max-width: 1440px)').matches;
    const load = () => {
      film.src = small ? film.dataset.sd : film.dataset.hd;
      film.addEventListener('playing', () => film.classList.add('is-playing'), { once: true });
      if (!filmPaused) film.play().catch(() => {});
    };
    if (document.readyState === 'complete') setTimeout(load, 200);
    else window.addEventListener('load', () => setTimeout(load, 200), { once: true });
    new IntersectionObserver(([e]) => {
      filmVisible = e.isIntersecting;
      if (!filmVisible) film.pause();
      else if (!filmPaused && film.src) film.play().catch(() => {});
    }).observe(film);
    filmToggle?.addEventListener('click', () => setFilmPaused(!filmPaused));
    setFilmPaused(filmPaused);
  }
}

// ------------------------------------------------------------------ reveals + counters
function countUp(el) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target) || RM) return;
  const t0 = performance.now();
  const tick = (now) => {
    const k = clamp((now - t0) / 1600);
    el.textContent = fmt(Math.round(target * (1 - Math.pow(2, -10 * k))));
    if (k < 1) requestAnimationFrame(tick);
    else el.textContent = fmt(target);
  };
  el.textContent = '0';
  requestAnimationFrame(tick);
}
const revealIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-in');
      $$('[data-count]', e.target).forEach(countUp);
      revealIO.unobserve(e.target);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
);
$$('[data-reveal]').forEach((el) => revealIO.observe(el));

// ------------------------------------------------------------------ header
const hdr = $('[data-hdr]');
const paper = $('[data-paper]');
const navLinks = $$('[data-nav]');
const sections = $$('[data-section]');
const visibleSections = new Set();
const sectionIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) (e.isIntersecting ? visibleSections.add(e.target) : visibleSections.delete(e.target));
    const current = sections.filter((s) => visibleSections.has(s)).pop();
    const key = current?.dataset.section;
    navLinks.forEach((a) => a.classList.toggle('is-current', a.dataset.nav === key));
  },
  { rootMargin: '-45% 0px -54% 0px' },
);
sections.forEach((s) => sectionIO.observe(s));

function updateHeader() {
  const y = window.scrollY;
  header.updateProgress();
  if (!hdr) return;
  hdr.classList.toggle('is-solid', y > 40);
  if (paper) {
    const r = paper.getBoundingClientRect();
    const h = hdr.offsetHeight;
    hdr.classList.toggle('on-paper', r.top <= h * 0.5 && r.bottom >= h * 0.5);
  }
}

// ------------------------------------------------------------------ menu (modal) + progress line
// Shared with every page (src/scripts/header.js). Smooth scrolling pauses while the menu is open.
const header = initHeader({
  reducedMotion: RM,
  onMenuOpen: () => lenis?.stop(),
  onMenuClose: () => lenis?.start(),
});
const closeMenu = (returnFocus = true) => header.closeMenu(returnFocus);

// ------------------------------------------------------------------ mailing-list sign-up
const signup = $('[data-signup]');
const signupMsg = $('[data-signup-msg]');
signup?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!signup.reportValidity()) return;
  const callHref = $('.hdr-cta')?.href;
  const say = (text, withCall) => {
    signupMsg.textContent = text;
    if (withCall && callHref) {
      const a = document.createElement('a');
      a.href = callHref;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Book a call';
      signupMsg.append(' ', a);
    }
  };
  // No email service configured yet: be clear that nothing was collected.
  if (signup.dataset.notOpen) return say(signup.dataset.notOpen, true);
  const btn = $('button', signup);
  btn.disabled = true;
  try {
    const res = await fetch(signup.action, { method: 'POST', body: new FormData(signup), headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(String(res.status));
    signup.reset();
    say(signup.dataset.success);
  } catch {
    say(signup.dataset.error, true);
  } finally {
    btn.disabled = false;
  }
});

// ------------------------------------------------------------------ main loop
function frame(now) {
  lenis?.raf(now);
  const vh = window.innerHeight;
  for (const s of scenes) s.next = measure(s, vh);
  for (const s of scenes) {
    if (Math.abs(s.next - s.last) > 0.00005) {
      s.last = s.next;
      s.fn(s.next);
    }
  }
  updateHeader();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
