// Small interactions: mobile navigation and the current copyright year.
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');

// The menu exists on the homepage, but not on the military gallery page.
if (menuButton && menu) {
  // Open and close the navigation menu on smaller screens.
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    menu.classList.toggle('is-open', !isOpen);
  });

  // Close the menu after a visitor chooses a section link.
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
      menu.classList.remove('is-open');
    });
  });
}

// Keep the footer year current without needing to edit it each January.
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Highlight the thumbnail for the military photo currently on screen.
const galleryPhotos = document.querySelectorAll('[data-military-photo], [data-gallery-photo]');
const galleryThumbnails = document.querySelectorAll('.military-thumbnail');

if ('IntersectionObserver' in window && galleryPhotos.length && galleryThumbnails.length) {
  const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      galleryThumbnails.forEach((thumbnail) => {
        const isActive = thumbnail.getAttribute('href') === `#${entry.target.id}`;
        thumbnail.classList.toggle('is-active', isActive);
        if (isActive) thumbnail.setAttribute('aria-current', 'true');
        else thumbnail.removeAttribute('aria-current');
      });
    });
  }, { threshold: 0.55 });

  galleryPhotos.forEach((photo) => photoObserver.observe(photo));
}
