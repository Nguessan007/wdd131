// temples.js
// Responsible for: hamburger toggling and updating footer year & last modified.

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const primaryNav = document.getElementById('primary-nav');
  
    // Toggle the mobile menu
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
  
        // Update aria attributes and hamburger icon
        hamburger.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) {
          hamburger.textContent = '✕'; // X to close
          hamburger.setAttribute('aria-label', 'Close navigation');
        } else {
          hamburger.textContent = '☰';
          hamburger.setAttribute('aria-label', 'Open navigation');
        }
      });
  
      // Close mobile menu when clicking a link (useful for single-page anchors)
      navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          hamburger.textContent = '☰';
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.setAttribute('aria-label', 'Open navigation');
        }
      });
    }
  
    // Footer dynamic content: year and last modified
    const yearEl = document.getElementById('year');
    const lastModEl = document.getElementById('lastModified');
  
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
    if (lastModEl) {
      // document.lastModified gives last saved date string (from browser)
      lastModEl.textContent = document.lastModified || 'unknown';
    }
  
    // Optional: keyboard accessibility - close menu with Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.textContent = '☰';
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  
    // Responsive behavior: if resizing to large, ensure nav is visible
    const mq = window.matchMedia('(min-width:700px)');
    function handleWidthChange(e) {
      if (e.matches) {
        // On large screens make nav visible and reset mobile state
        navLinks.classList.add('desktop');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '☰';
      } else {
        navLinks.classList.remove('desktop');
      }
    }
    if (mq) {
      // initial call
      handleWidthChange(mq);
      mq.addEventListener('change', handleWidthChange);
    }
   });
