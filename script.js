/**
 * PurePalate Landing Page — Premium Interactions
 * Production-quality JavaScript for high-end experience
 */

document.addEventListener('DOMContentLoaded', function() {
  // Tailwind CDN script already loaded in HTML
  initializeTailwind();
  initializeNavigation();
  initializeScrollAnimations();
  initializeWaitlistForm();
  initializeMobileMenu();
});

/**
 * Initialize Tailwind configuration for custom theme
 */
function initializeTailwind() {
  if (typeof tailwind !== 'undefined') {
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            'display': ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
            'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif']
          }
        }
      }
    };
  }
}

/**
 * Navigation: Scroll effect + active section highlighting
 */
function initializeNavigation() {
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = ['vision', 'ecosystem', 'intelligence', 'founder'];

  // Navbar background on scroll
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
  });

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Optional: Highlight active section (advanced)
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sectionId => {
      const sectionEl = document.getElementById(sectionId);
      if (sectionEl) {
        const sectionTop = sectionEl.getBoundingClientRect().top;
        if (sectionTop <= 180) {
          current = sectionId;
        }
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-accent');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-accent');
      }
    });
  });
}

/**
 * Scroll-triggered reveal animations using Intersection Observer
 */
function initializeScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all
    revealElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after animation for performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Waitlist Form Handler — Premium UX
 */
function initializeWaitlistForm() {
  const form = document.getElementById('waitlist-form');
  const formContainer = document.getElementById('form-container');
  const successState = document.getElementById('success-state');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!email || !isValidEmail(email)) {
      emailInput.style.borderColor = '#ef4444';
      setTimeout(() => {
        emailInput.style.borderColor = '';
      }, 1800);
      return;
    }

    // Premium loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="flex items-center justify-center gap-2">
        <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        Securing your place...
      </span>
    `;

    // Simulate network request (real implementation would POST to backend)
    setTimeout(() => {
      // Hide form with elegant transition
      formContainer.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
      formContainer.style.opacity = '0';
      formContainer.style.transform = 'translateY(12px)';

      setTimeout(() => {
        formContainer.style.display = 'none';
        successState.style.display = 'block';
        successState.classList.add('success-state');

        // Optional: Confetti micro-celebration (subtle, high-end)
        createSubtleConfetti();
      }, 420);
    }, 1250);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Subtle confetti for premium success moment (lightweight)
 */
function createSubtleConfetti() {
  const colors = ['#14B8A6', '#5EEAD4', '#F1F5F9'];
  const container = document.getElementById('success-state');
  if (!container) return;

  for (let i = 0; i < 28; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '5px';
    particle.style.height = '5px';
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '-10px';
    particle.style.opacity = Math.random() * 0.6 + 0.4;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '10';
    container.appendChild(particle);

    const duration = Math.random() * 1600 + 1400;
    const xDrift = (Math.random() - 0.5) * 180;

    particle.animate([
      { 
        transform: `translateY(0) translateX(0)`, 
        opacity: particle.style.opacity 
      },
      { 
        transform: `translateY(${280 + Math.random() * 80}px) translateX(${xDrift}px)`, 
        opacity: 0 
      }
    ], {
      duration: duration,
      easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
    }).onfinish = () => particle.remove();
  }
}

/**
 * Mobile Menu Toggle
 */
function initializeMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('hidden');
    
    if (isOpen) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('mobile-menu');
      menuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.25" d="M6 18L18 6M6 6h12v12" />
        </svg>
      `;
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('mobile-menu');
      menuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.25" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    }
  });

  // Close menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('mobile-menu');
      menuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.25" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    });
  });
}

/**
 * Utility: Copy to clipboard (if needed for future)
 */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Could show toast in future iterations
    console.log('%c[PurePalate] Copied to clipboard', 'color:#14B8A6');
  });
}