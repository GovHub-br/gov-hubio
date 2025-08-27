const btn = document.getElementById('navToggle');
const overlay = document.getElementById('menuOverlay');
const panel = document.getElementById('mobilePanel');
const iconMenu = document.getElementById('iconMenu');
const iconClose = document.getElementById('iconClose');
const nav = document.getElementById('siteNav');

function openMenu() {
    btn.setAttribute('aria-expanded', 'true');
    overlay.classList.remove('hidden');
    panel.classList.remove('hidden');
    iconMenu.classList.add('hidden');
    iconClose.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // scroll lock
}
function closeMenu() {
    btn.setAttribute('aria-expanded', 'false');
    overlay.classList.add('hidden');
    panel.classList.add('hidden');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
    document.body.style.overflow = '';
}

btn?.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
});

overlay?.addEventListener('click', closeMenu);

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

panel?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
});

// Sombra ao rolar
const onScroll = () => {
    if (window.scrollY > 2) nav.classList.add('shadow-md');
    else nav.classList.remove('shadow-md');
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
