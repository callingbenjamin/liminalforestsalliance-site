// Shared header behaviour for every page (src/components/Header.astro): the
// thin gold reading-progress line and the modal menu on narrow screens.
// The home page adds its own scroll effects on top (transparent-to-solid
// header over the film, light-chapter colours) in main.js.

const setInert = (el, on) => {
  if (!el) return;
  if (on) el.setAttribute('inert', '');
  else el.removeAttribute('inert');
};

export function initHeader({ reducedMotion = false, onMenuOpen, onMenuClose } = {}) {
  const $ = (s, el = document) => el.querySelector(s);
  const progressBar = $('[data-progress]');
  const menuBtn = $('[data-menu-btn]');
  const menu = $('[data-menu]');
  // While the menu is open, everything behind it is inert for keyboard and screen readers.
  const outside = [$('main'), $('footer'), $('.hdr .brand'), $('.hdr-cta')].filter(Boolean);

  function closeMenu(returnFocus = true) {
    if (!menu || menu.hidden) return;
    menu.classList.add('is-closing');
    setTimeout(
      () => {
        menu.hidden = true;
        menu.classList.remove('is-closing');
      },
      reducedMotion ? 0 : 280,
    );
    menuBtn.setAttribute('aria-expanded', 'false');
    $('[data-menu-label]', menuBtn).textContent = 'Menu';
    outside.forEach((el) => setInert(el, false));
    onMenuClose?.();
    if (returnFocus) menuBtn.focus();
  }

  menuBtn?.addEventListener('click', () => {
    if (!menu.hidden) return closeMenu();
    menu.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
    $('[data-menu-label]', menuBtn).textContent = 'Close';
    outside.forEach((el) => setInert(el, true));
    onMenuOpen?.();
    $('a', menu)?.focus();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
  menu?.addEventListener('click', (e) => {
    if (e.target.closest('a[target="_blank"]')) closeMenu(false);
  });

  function updateProgress() {
    if (!progressBar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = `scaleX(${max > 0 ? (window.scrollY / max).toFixed(4) : 0})`;
  }

  return { closeMenu, updateProgress };
}
