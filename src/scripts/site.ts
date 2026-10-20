function initFonts() {
  const root = document.documentElement;

  const markReady = () => {
    root.classList.remove('fonts-pending');
    root.classList.add('fonts-ready');
  };

  if (!document.fonts?.ready) {
    markReady();
    return;
  }

  document.fonts.ready.then(markReady).catch(markReady);
}

function initNavHighlight() {
  const path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';

  document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href') ?? '';
    const linkPath = href.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
    let isActive = false;

    if (linkPath === '/') {
      isActive = path === '/';
    } else {
      isActive = path === linkPath || path.startsWith(`${linkPath}/`);
    }

    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function initInPageScroll() {
  document.querySelectorAll<HTMLElement>('[data-scroll-target]').forEach((el) => {
    el.addEventListener('click', (event) => {
      const id = el.getAttribute('data-scroll-target');
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initSkipLink() {
  document.querySelectorAll<HTMLElement>('[data-skip-to-main]').forEach((button) => {
    button.addEventListener('click', () => {
      const main = document.getElementById('main-content');
      if (!main) return;

      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: false });
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initFaqFilters() {
  document.querySelectorAll('[data-faq-filters]').forEach((container) => {
    const section = container.closest('[data-faq-section]');
    const list = section?.querySelector('[data-faq-list]');
    if (!list) return;

    const items = list.querySelectorAll<HTMLElement>('[data-faq-topic]');
    const chips = container.querySelectorAll<HTMLButtonElement>('[data-faq-filter]');

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const topic = chip.getAttribute('data-faq-filter');
        chips.forEach((c) => c.classList.toggle('is-active', c === chip));
        items.forEach((item) => {
          const itemTopic = item.getAttribute('data-faq-topic');
          const show = topic === 'all' || itemTopic === topic;
          item.toggleAttribute('data-hidden', !show);
        });
      });
    });
  });
}

function initThemeMetaColor() {
  const metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!metaTheme) return;

  const update = () => {
    metaTheme.content = document.documentElement.classList.contains('dark') ? '#2d6ee2' : '#f5f7fa';
  };

  update();
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

const LEVOCHEATS_CHECKOUT = 'https://levocheats.com/go/FDI?to=%2Fenlisted-cheats';

/** Rewrite stale /go/* or Zadeyo checkout links after navigation or old cached HTML. */
function initCheckoutLinks() {
  const selectors = 'a[href], a[data-checkout-buy]';
  document.querySelectorAll<HTMLAnchorElement>(selectors).forEach((anchor) => {
    const href = anchor.getAttribute('href') ?? '';
    if (
      href.includes('zadeyo.com') ||
      href.startsWith('/go/') ||
      href.includes('/go/enlisted') ||
      href.includes('/go/hwid-spoofer') ||
      href.includes('/go/ugc') ||
      href.includes('/go/skin-changer')
    ) {
      anchor.href = LEVOCHEATS_CHECKOUT;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
    }
  });
}

function bootSite() {
  initFonts();
  initFaqFilters();
  initNavHighlight();
  initInPageScroll();
  initSkipLink();
  initThemeMetaColor();
  initCheckoutLinks();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSite);
} else {
  bootSite();
}

document.addEventListener('astro:after-swap', () => {
  initCheckoutLinks();
});
