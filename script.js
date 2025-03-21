// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

function toggleTheme() {
  if (html.getAttribute('data-theme') === 'light') {
    html.setAttribute('data-theme', 'dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  html.setAttribute('data-theme', 'dark');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', toggleTheme);

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const isOpen = navLinks.classList.contains('active');
  
  // Change the hamburger icon based on menu state
  const hamburgerIcon = hamburger.querySelector('i');
  if (isOpen) {
    hamburgerIcon.classList.remove('fa-bars');
    hamburgerIcon.classList.add('fa-times');
  } else {
    hamburgerIcon.classList.remove('fa-times');
    hamburgerIcon.classList.add('fa-bars');
  }
});

// Close mobile menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const hamburgerIcon = hamburger.querySelector('i');
      hamburgerIcon.classList.remove('fa-times');
      hamburgerIcon.classList.add('fa-bars');
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: targetPosition - headerHeight,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Highlight active navigation link based on scroll position
function highlightNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

highlightNavOnScroll();

// Add animation on scroll
const animatedElements = document.querySelectorAll('.education-item, .project-item, .experience-item, .hero, .skills-container, .contact-item');

function checkInView() {
  animatedElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isInView = (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
    
    if (isInView) {
      element.classList.add('animate');
    }
  });
}

// Add animation classes and initial styling
animatedElements.forEach(element => {
  element.classList.add('animate-on-scroll');
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .animate-on-scroll.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero {
    transition-delay: 0.1s;
  }
  
  .education-item:nth-child(1) {
    transition-delay: 0.2s;
  }
  
  .education-item:nth-child(2) {
    transition-delay: 0.3s;
  }
  
  .education-item:nth-child(3) {
    transition-delay: 0.4s;
  }
  
  .project-item:nth-child(1) {
    transition-delay: 0.2s;
  }
  
  .project-item:nth-child(2) {
    transition-delay: 0.3s;
  }
  
  .project-item:nth-child(3) {
    transition-delay: 0.4s;
  }
`;
document.head.appendChild(style);

window.addEventListener('scroll', checkInView);
window.addEventListener('resize', checkInView);

// Check once on page load
window.addEventListener('load', checkInView);

// Handle fixed header appearance
const header = document.querySelector('.header');
let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', () => {
  const currentScrollPos = window.pageYOffset;
  
  // Add shadow on scroll
  if (currentScrollPos > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Hide on scroll down, show on scroll up (mobile only)
  if (window.innerWidth <= 768) {
    if (prevScrollPos > currentScrollPos) {
      header.style.transform = 'translateY(0)';
    } else {
      header.style.transform = 'translateY(-100%)';
    }
    prevScrollPos = currentScrollPos;
  } else {
    header.style.transform = 'translateY(0)';
  }
});

// Add effects on document loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add a subtle animation to social links
  const socialLinks = document.querySelectorAll('.social-links a');
  socialLinks.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.1}s`;
    icon.classList.add('pop-in');
  });
  
  // Add hover effects to contact items
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const icon = item.querySelector('i');
      icon.classList.add('fa-bounce');
    });
    
    item.addEventListener('mouseleave', () => {
      const icon = item.querySelector('i');
      icon.classList.remove('fa-bounce');
    });
  });
}); 