// ===================================
// MOBILE MENU FUNCTIONALITY
// ===================================

// Get elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navButtons = document.querySelector('.nav-buttons');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
function toggleMenu() {
    if (hamburger) hamburger.classList.toggle('active');
    if (navMenu) navMenu.classList.toggle('active');
    if (navButtons) navButtons.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (navMenu && navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Event listener for hamburger click
if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

// Close menu when clicking on a nav link
if (navLinks && navLinks.length) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (
        navMenu &&
        navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !(hamburger && hamburger.contains(e.target)) &&
        !(navButtons && navButtons.contains(e.target))
    ) {
        toggleMenu();
    }
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (header) {
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    }
});

// ===================================
// DYNAMIC NFT CARD HOVER EFFECTS
// ===================================

const nftCards = document.querySelectorAll('.nft-card, .featured-nft-card');

nftCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy loading for images (if needed)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// RESIZE HANDLER
// ===================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu if screen becomes desktop size
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    }, 250);
});

// ===================================
// CONSOLE MESSAGE
// ===================================
//footer togle
const city = document.getElementById("city");
const cont = document.querySelectorAll(".foot-cont-three a");

city.addEventListener("click", toggleCont);
function toggleCont() {
  city.classList.toggle("active");
  Array.from(cont).forEach((el) => {
    el.style.display = el.style.display === "block" ? "none" : "block";
  });
}

// Description section "See more" functionality
const seeMoreBtn = document.getElementById("seeMoreBtn");
const hiddenDescriptions = document.querySelectorAll(".description-hidden");
let descriptionsExpanded = false;

if (seeMoreBtn) {
  seeMoreBtn.addEventListener("click", () => {
    descriptionsExpanded = !descriptionsExpanded;
    hiddenDescriptions.forEach((desc) => {
      if (descriptionsExpanded) {
        desc.classList.remove("description-hidden");
        desc.classList.add("description-visible", "expanded");
      } else {
        desc.classList.add("description-hidden");
        desc.classList.remove("description-visible", "expanded");
      }
    });

    seeMoreBtn.textContent = descriptionsExpanded ? "Ver menos" : "Ver mais";
  });
}
// Age verification modal

const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

if (ageModal) {
    window.addEventListener("load", () => {
        if (localStorage.getItem("ageConfirmed") != "true") {
            ageModal.style.display = "flex";
        } else {
            ageModal.style.display = "none";
        }
    });

    if (yesBtn) {
        yesBtn.addEventListener("click", () => {
            localStorage.setItem("ageConfirmed", "true");
            ageModal.style.display = "none";
        });
    }

    if (noBtn) {
        noBtn.addEventListener("click", () => {
            alert("Acesso proibido. Site apenas para maiores de 18 anos.");
            try { window.close(); } catch (e) {}
            window.location.href = "https://www.google.pt";
        });
    }
}

const yearSpan = document.querySelector('#year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}
