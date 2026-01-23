// Portfolio Application JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  renderContent();
});

// ============================================
// Navigation
// ============================================
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navToggle = document.querySelector('.nav-toggle');
  const sections = document.querySelectorAll('section[id]');

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navbar.classList.toggle('mobile-open');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('mobile-open');
      });
    });
  }

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// Content Rendering
// ============================================
function renderContent() {
  renderHero();
  renderBlogs();
  renderArtifacts();
  renderProjects();
  renderCertifications();
  renderAbout();
  renderContactSocial();
}

// Hero Section
function renderHero() {
  const subtitle = document.getElementById('hero-subtitle');
  if (subtitle && siteData.personal.tagline) {
    subtitle.textContent = siteData.personal.tagline;
  }
}

// Blog Posts (Compact Cards - Title Only, with Show More)
function renderBlogs() {
  const grid = document.getElementById('blogs-grid');
  if (!grid || !siteData.blogs) return;

  const INITIAL_COUNT = 6;
  const hasMore = siteData.blogs.length > INITIAL_COUNT;

  grid.innerHTML = siteData.blogs.map((blog, index) => `
    <a href="${blog.link}" target="_blank" rel="noopener noreferrer" class="card-compact${index >= INITIAL_COUNT ? ' hidden' : ''}" data-animate data-animate-delay="${Math.min(index + 1, 6)}">
      <div class="card-image">
        <img src="${blog.thumbnail}" alt="${blog.title}" loading="lazy">
      </div>
      <div class="card-content">
        <h3>${blog.title}</h3>
      </div>
    </a>
  `).join('');

  // Add Show More button if needed
  if (hasMore) {
    const container = grid.parentElement;
    const existingBtn = container.querySelector('.show-more-container');
    if (existingBtn) existingBtn.remove();

    const btnContainer = document.createElement('div');
    btnContainer.className = 'show-more-container';
    btnContainer.innerHTML = `
      <button class="show-more-btn" data-target="blogs-grid">
        Show More
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
    `;
    container.appendChild(btnContainer);

    btnContainer.querySelector('.show-more-btn').addEventListener('click', function () {
      const cards = grid.querySelectorAll('.card-compact.hidden');
      const isExpanded = this.classList.contains('expanded');

      if (isExpanded) {
        // Collapse
        grid.querySelectorAll('.card-compact').forEach((card, i) => {
          if (i >= INITIAL_COUNT) card.classList.add('hidden');
        });
        this.classList.remove('expanded');
        this.innerHTML = `Show More <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
      } else {
        // Expand
        cards.forEach(card => card.classList.remove('hidden'));
        this.classList.add('expanded');
        this.innerHTML = `Show Less <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
      }
    });
  }

  initScrollAnimations();
}

// Projects (Compact Cards - Title Only, with Show More)
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid || !siteData.projects) return;

  const INITIAL_COUNT = 6;
  const hasMore = siteData.projects.length > INITIAL_COUNT;

  grid.innerHTML = siteData.projects.map((project, index) => `
    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="card-compact${index >= INITIAL_COUNT ? ' hidden' : ''}" data-animate data-animate-delay="${Math.min(index + 1, 6)}">
      <div class="card-image">
        <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
      </div>
      <div class="card-content">
        <h3>${project.title}</h3>
      </div>
    </a>
  `).join('');

  // Add Show More button if needed
  if (hasMore) {
    const container = grid.parentElement;
    const existingBtn = container.querySelector('.show-more-container');
    if (existingBtn) existingBtn.remove();

    const btnContainer = document.createElement('div');
    btnContainer.className = 'show-more-container';
    btnContainer.innerHTML = `
      <button class="show-more-btn" data-target="projects-grid">
        Show More
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
    `;
    container.appendChild(btnContainer);

    btnContainer.querySelector('.show-more-btn').addEventListener('click', function () {
      const cards = grid.querySelectorAll('.card-compact.hidden');
      const isExpanded = this.classList.contains('expanded');

      if (isExpanded) {
        // Collapse
        grid.querySelectorAll('.card-compact').forEach((card, i) => {
          if (i >= INITIAL_COUNT) card.classList.add('hidden');
        });
        this.classList.remove('expanded');
        this.innerHTML = `Show More <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
      } else {
        // Expand
        cards.forEach(card => card.classList.remove('hidden'));
        this.classList.add('expanded');
        this.innerHTML = `Show Less <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
      }
    });
  }

  initScrollAnimations();
}

// Certifications
function renderCertifications() {
  const grid = document.getElementById('certifications-grid');
  if (!grid || !siteData.certifications) return;

  grid.innerHTML = siteData.certifications.map((cert, index) => `
    <a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="cert-card" data-animate data-animate-delay="${index + 1}">
      <div class="cert-badge">
        <img src="${cert.badge}" alt="${cert.title}" loading="lazy">
      </div>
      <h3>${cert.title}</h3>
      ${cert.issuer ? `<p class="issuer">${cert.issuer}</p>` : ''}
      ${cert.date ? `<p class="date">${cert.date}</p>` : ''}
      <span class="cert-link">
        View Credential
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </span>
    </a>
  `).join('');

  initScrollAnimations();
}

// Artifacts Section
function renderArtifacts() {
  if (!siteData.artifacts) return;

  // Render Architecture Blueprints
  const blueprintsGrid = document.getElementById('blueprints-grid');
  if (blueprintsGrid && siteData.artifacts.blueprints) {
    const INITIAL_COUNT = 8;
    const hasMore = siteData.artifacts.blueprints.length > INITIAL_COUNT;

    blueprintsGrid.innerHTML = siteData.artifacts.blueprints.map((blueprint, index) => `
      <div class="blueprint-card${index >= INITIAL_COUNT ? ' hidden' : ''}" data-animate data-animate-delay="${Math.min(index + 1, 6)}" data-image="${blueprint.image}" data-caption="${blueprint.caption}">
        <div class="blueprint-image">
          <img src="${blueprint.image}" alt="${blueprint.caption}" loading="lazy">
          <div class="blueprint-zoom-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </div>
        </div>
        <div class="blueprint-content">
          <p class="blueprint-caption">${blueprint.caption}</p>
          ${blueprint.tags ? `
            <div class="blueprint-tags">
              ${blueprint.tags.map(tag => `<span class="blueprint-tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');

    // Add Show More button if needed
    if (hasMore) {
      // Check if button already exists to avoid duplication if re-rendered
      let btnContainer = blueprintsGrid.nextElementSibling;
      if (!btnContainer || !btnContainer.classList.contains('show-more-container')) {
        btnContainer = document.createElement('div');
        btnContainer.className = 'show-more-container';
        blueprintsGrid.parentNode.insertBefore(btnContainer, blueprintsGrid.nextSibling);
      }

      btnContainer.innerHTML = `
        <button class="show-more-btn" data-target="blueprints-grid">
          Show More
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      `;

      btnContainer.querySelector('.show-more-btn').addEventListener('click', function () {
        const cards = blueprintsGrid.querySelectorAll('.blueprint-card.hidden');
        const isExpanded = this.classList.contains('expanded');

        if (isExpanded) {
          // Collapse
          blueprintsGrid.querySelectorAll('.blueprint-card').forEach((card, i) => {
            if (i >= INITIAL_COUNT) card.classList.add('hidden');
          });
          this.classList.remove('expanded');
          this.innerHTML = `Show More <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
        } else {
          // Expand
          cards.forEach(card => card.classList.remove('hidden'));
          // Also show already hidden cards (since selector only grabs currenlty hidden ones, logic is slightly diff but effect same)
          blueprintsGrid.querySelectorAll('.blueprint-card').forEach(card => card.classList.remove('hidden'));

          this.classList.add('expanded');
          this.innerHTML = `Show Less <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
        }
      });
    }

    // Add click handlers for lightbox
    blueprintsGrid.querySelectorAll('.blueprint-card').forEach(card => {
      card.addEventListener('click', () => {
        openLightbox(card.dataset.image, card.dataset.caption);
      });
    });
  }

  // Render Field Notes
  const fieldNotesStrip = document.getElementById('field-notes-strip');
  if (fieldNotesStrip && siteData.artifacts.fieldNotes) {
    fieldNotesStrip.innerHTML = siteData.artifacts.fieldNotes.map((note, index) => `
      <div class="field-note-card" data-animate data-animate-delay="${Math.min(index + 1, 4)}" data-image="${note.image}" data-caption="${note.caption}">
        <div class="field-note-image">
          <img src="${note.image}" alt="${note.caption}" loading="lazy">
          <div class="field-note-overlay">
            <p class="field-note-caption">${note.caption}</p>
          </div>
        </div>
      </div>
    `).join('');

    // Add click handlers for lightbox
    fieldNotesStrip.querySelectorAll('.field-note-card').forEach(card => {
      card.addEventListener('click', () => {
        openLightbox(card.dataset.image, card.dataset.caption);
      });
    });
  }

  // Initialize lightbox
  initLightbox();
  initScrollAnimations();
}

// Lightbox Functions
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = lightbox?.querySelector('.lightbox-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
}

function openLightbox(imageSrc, caption) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (lightbox && lightboxImage) {
    lightboxImage.src = imageSrc;
    lightboxImage.alt = caption || '';
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || '';
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// About Section
function renderAbout() {
  // Bio - only render if exists and not empty
  const bio = document.getElementById('about-bio');
  if (bio && siteData.about?.bio) {
    bio.textContent = siteData.about.bio;
  } else if (bio) {
    bio.parentElement.style.display = 'none'; // Hide bio container if empty
  }

  // Experience
  renderExperience();

  // Education
  renderEducation();

  // Skills
  renderSkills();
}

function renderExperience() {
  const timeline = document.getElementById('experience-timeline');
  if (!timeline || !siteData.experience) return;

  timeline.innerHTML = siteData.experience.map(exp => `
    <div class="timeline-item">
      <h4>${exp.role}</h4>
      <p class="company">${exp.company}</p>
      <p class="period">${exp.period} • ${exp.location}</p>
      ${exp.description ? `<p>${exp.description}</p>` : ''}
    </div>
  `).join('');
}

function renderEducation() {
  const list = document.getElementById('education-list');
  if (!list || !siteData.education) return;

  list.innerHTML = siteData.education.map(edu => `
    <div class="education-item">
      <h4>${edu.degree}</h4>
      <p class="institution">${edu.institution}</p>
      <p class="period">${edu.period}</p>
      <p>${edu.description}</p>
    </div>
  `).join('');
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container || !siteData.skills) return;

  container.innerHTML = Object.entries(siteData.skills).map(([category, skills]) => `
    <div class="skill-category">
      <h4>${category}</h4>
      <div class="skill-tags">
        ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// Contact Social Links
function renderContactSocial() {
  const container = document.getElementById('contact-social-links');
  if (!container || !siteData.social) return;

  const socialIcons = {
    linkedin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    github: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    medium: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>',
    instagram: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>'
  };

  const socialLabels = {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    medium: 'Medium',
    instagram: 'Instagram'
  };

  container.innerHTML = Object.entries(siteData.social).map(([platform, url]) => `
    <a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link">
      ${socialIcons[platform] || ''}
      ${socialLabels[platform] || platform}
    </a>
  `).join('');
}
