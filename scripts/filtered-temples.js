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
    const temples = [
      {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
      },
      {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
      },
      {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
      },
      {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
      },
      {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
      },
      {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
      },
      {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
      },
      // Add more temple objects here...
      {
        templeName: "Salt Lake Temple",
        location: "Salt Lake City, Utah, USA",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl:
          "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-exterior.jpeg"
      },
      {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl:
          "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-exterior.jpeg"
      },
      {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl:
          "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x250/accra-ghana-temple-exterior.jpeg"
      }
    
    ];
    // Render function
  const gallery = document.getElementById("templeGallery");

  temples.forEach(temple => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h2>${temple.templeName}</h2>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
      <img src="${temple.imageUrl}" 
          alt="${temple.templeName} Temple" 
          loading="lazy">
    `;

    gallery.appendChild(card);
  });
  // Filtering logic
function filterTemples(criteria) {
  let filtered = [];

  switch (criteria) {
    case "old":
      filtered = temples.filter((t) => {
        const year = parseInt(t.dedicated.split(",")[0]);
        return year < 1900;
      });
      break;
    case "new":
      filtered = temples.filter((t) => {
        const year = parseInt(t.dedicated.split(",")[0]);
        return year > 2000;
      });
      break;
    case "large":
      filtered = temples.filter((t) => t.area > 90000);
      break;
    case "small":
      filtered = temples.filter((t) => t.area < 10000);
      break;
    default: // home
      filtered = temples;
  }

  displayTemples(filtered);
}

// Attach event listeners to nav links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const text = link.textContent.toLowerCase(); // "home", "old", etc.
    filterTemples(text);
  });
});

// Show all temples on first load
displayTemples(temples);

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