const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '×' : '☰';
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  }));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();


// Same-page image lightbox for the Optipharma backtesting figures.
const lightbox = document.getElementById('imageLightbox');
if (lightbox) {
  const lightboxImage = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('.lightbox-close');
  let previouslyFocused = null;

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.removeAttribute('src');
    document.body.style.overflow = '';
    if (previouslyFocused) previouslyFocused.focus();
  };

  document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const image = trigger.querySelector('img');
      if (!image) return;
      previouslyFocused = trigger;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
}
