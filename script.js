/* =========================================================
   Greymatter Buildcon LLP â€” site interactions
   Vanilla JS, no dependencies.
   ========================================================= */

document.documentElement.classList.add('js');

(function () {
  'use strict';

  const qs = (selector, context) => (context || document).querySelector(selector);
  const qsa = (selector, context) => Array.from((context || document).querySelectorAll(selector));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = reduceMotion ? 'auto' : 'smooth';

  /* ---------- Header state + back to top ---------- */
  const header = qs('#siteHeader');
  const toTop = qs('#toTop');

  function updateScrollState() {
    const y = window.scrollY || window.pageYOffset;
    header.classList.toggle('scrolled', y > 24);
    toTop.classList.toggle('show', y > 620);
  }
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: scrollBehavior });
  });

  /* ---------- Mobile navigation ---------- */
  const menuToggle = qs('#menuToggle');
  const nav = qs('#mainNav');

  function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
  }

  menuToggle.addEventListener('click', function () {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  qsa('a', nav).forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  document.addEventListener('click', function (event) {
    if (!header.contains(event.target)) setMenu(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) setMenu(false);
  });

  /* ---------- Reveal on scroll ---------- */
  const revealItems = qsa('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('in'); });
  }

  /* ---------- Active navigation link ---------- */
  const navLinks = qsa('.nav a');
  const observedSections = ['work', 'studio', 'services', 'journey', 'team', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    observedSections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ---------- Project filtering ---------- */
  const filterButtons = qsa('.filter');
  const projectCards = qsa('.project-card');

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const filter = button.dataset.filter;
      filterButtons.forEach(function (item) {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach(function (card) {
        card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
      });
    });
  });

  /* ---------- Project detail modal ---------- */
  const projects = [
    { image: 'assets/project-tec-kurupam-CdKqopYB.jpg', alt: 'Tribal Engineering College, Kurupam', meta: 'Institutional Â· 2022 Â· Completed', title: 'Tribal Engineering College', location: 'Kurupam, Andhra Pradesh', description: 'Exposed brick and unfinished concrete frame a contemporary institutional campus rooted in regional craft and modern engineering.' },
    { image: 'assets/project-als-convention-DzS1GZsX.jpg', alt: 'ALS Convention Centre, Vijayawada', meta: 'Hospitality Â· 2025 Â· Ongoing', title: 'ALS Convention Centre', location: 'Vijayawada', description: 'A perforated brick faÃ§ade and reflective courtyard shape a quiet civic threshold.' },
    { image: 'assets/project-high-court-B9oUjzRV.jpg', alt: 'High Court of Telangana, Hyderabad', meta: 'Institutional Â· 2024 Â· Proposed', title: 'High Court of Telangana', location: 'Hyderabad', description: 'A sculptural civic monument expressing weight, order and democratic permanence.' },
    { image: 'assets/project-puzhal-walkway-uB35BlGi.jpg', alt: 'Puzhal Lakefront Development, Chennai', meta: 'Infrastructure Â· 2024 Â· Ongoing', title: 'Puzhal Lakefront Development', location: 'Chennai, Tamil Nadu', description: "An elevated promenade on concrete pedestals â€” resilient to seasonal water levels and gentle on the lake's ecology." },
    { image: 'assets/project-vault-BfwCwQ7A.jpg', alt: 'Vault Brewery, Vijayawada and Hyderabad', meta: 'Hospitality Â· 2024 Â· Completed', title: 'Vault Brewery', location: 'Vijayawada & Hyderabad', description: 'A flowing wave-roof and industrial interiors craft a vibrant social landscape for craft brewing.' },
    { image: 'assets/project-waisl-Ca5zR9uL.jpg', alt: 'Waisl Office at GMR Arena, Hyderabad', meta: 'Office Spaces Â· 2025 Â· Ongoing', title: 'Waisl Office, GMR Arena', location: 'Hyderabad', description: 'A high-performance workplace with luminous circulation rings and quiet acoustic neighbourhoods.' },
    { image: 'assets/project-mucherla-4BMMjKTf.jpg', alt: 'Mucherla Zoo Park, Hyderabad', meta: 'Hospitality Â· Civic Â· 2025 Â· Proposed', title: 'Mucherla Zoo Park', location: 'Hyderabad', description: 'An immersive landscape of open habitats, lantern-lit pathways and a sweeping glass biodome.' },
    { image: 'assets/project-nandana-CMWnLw_p.jpg', alt: 'Nandana Conventions, Vijayawada', meta: 'Hospitality Â· 2020 Â· Completed', title: 'Nandana Conventions', location: 'Vijayawada', description: 'A timeless convention complex that anchors regional gatherings with calm civic presence.' },
    { image: 'assets/project-mucherla-night-BUSY79Gt.jpg', alt: 'Mucherla Night Gardens, Hyderabad', meta: 'Landscape Â· 2025 Â· Proposed', title: 'Mucherla â€” Night Gardens', location: 'Hyderabad', description: 'Cascading light installations transform the gardens into a nocturnal architectural experience.' },
    { image: 'assets/project-amaragiri-B1JCvj56.jpg', alt: 'Amaragiri Eco Resort, Andhra Pradesh', meta: 'Hospitality Â· 2025 Â· Ongoing', title: 'Amaragiri Eco Resort', location: 'Andhra Pradesh', description: 'Cottages on stilts blur the threshold between cabin, canopy and shoreline.' }
  ];

  const modal = qs('#projectModal');
  const modalPanel = qs('.modal-panel', modal);
  const modalClose = qs('.modal-close', modal);
  const modalImage = qs('#modalImg');
  const modalMeta = qs('#modalMeta');
  const modalTitle = qs('#modalTitle');
  const modalLocation = qs('#modalLocation');
  const modalDesc = qs('#modalDesc');
  const modalEnquire = qs('#modalEnquire');
  let lastFocused = null;

  function openProject(index) {
    const project = projects[index];
    if (!project) return;

    modalImage.src = project.image;
    modalImage.alt = project.alt;
    modalMeta.textContent = project.meta;
    modalTitle.textContent = project.title;
    modalLocation.textContent = project.location;
    modalDesc.textContent = project.description;
    modalEnquire.dataset.project = project.title;

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modalClose.focus();
  }

  function closeProject() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  qsa('.project-media').forEach(function (button) {
    button.addEventListener('click', function () { openProject(Number(button.dataset.project)); });
  });

  qsa('[data-close]', modal).forEach(function (element) {
    element.addEventListener('click', closeProject);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (!modal.hidden) closeProject();
      setMenu(false);
      return;
    }
    if (event.key !== 'Tab' || modal.hidden) return;

    const focusable = qsa('button, a[href], input, select, textarea', modalPanel)
      .filter(function (element) { return !element.disabled && element.offsetParent !== null; });
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  /* ---------- Shared enquiry hand-off ---------- */
  const typeField = qs('#fieldType');
  const messageField = qs('#fieldMessage');
  const nameField = qs('#fieldName');
  const successBox = qs('#formSuccess');
  const errorBox = qs('#formError');

  function goToEnquiry(options) {
    const settings = options || {};

    if (settings.type) {
      Array.from(typeField.options).forEach(function (option) {
        if (option.value === settings.type || option.textContent === settings.type) {
          typeField.value = option.value;
        }
      });
    }
    if (settings.message && !messageField.value.trim()) messageField.value = settings.message;

    successBox.hidden = true;
    errorBox.hidden = true;
    closeProject();

    qs('#contact').scrollIntoView({ behavior: scrollBehavior, block: 'start' });
    const focusTarget = settings.message ? messageField : nameField;
    window.setTimeout(function () { focusTarget.focus({ preventScroll: true }); }, reduceMotion ? 0 : 650);
  }

  modalEnquire.addEventListener('click', function () {
    goToEnquiry({
      message: "I'd like to know more about " + modalEnquire.dataset.project + '.',
    });
  });

  /* ---------- Services accordion ---------- */
  qsa('.service-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isOpen));
      if (panel) panel.classList.toggle('open', !isOpen);
    });
  });

  qsa('.js-service-enquire').forEach(function (button) {
    button.addEventListener('click', function () {
      goToEnquiry({
        type: button.dataset.service,
        message: "I'd like to discuss " + button.dataset.service + ' for a new project.',
      });
    });
  });

  /* ---------- Enquiry form ---------- */
  const form = qs('#enquiryForm');
  const validation = [
    { input: '#fieldName', error: '#errorName', message: 'Please enter your name.' },
    { input: '#fieldEmail', error: '#errorEmail', message: 'Please enter a valid email address.' },
    { input: '#fieldMessage', error: '#errorMessage', message: 'Please tell us a little about your project.' }
  ];

  function setFieldError(rule, message) {
    const input = qs(rule.input);
    const error = qs(rule.error);
    input.closest('.field').classList.toggle('invalid', Boolean(message));
    error.textContent = message || '';
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  validation.forEach(function (rule) {
    qs(rule.input).addEventListener('input', function () { setFieldError(rule, ''); });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = nameField.value.trim();
    const email = qs('#fieldEmail').value.trim();
    const company = qs('#fieldCompany').value.trim();
    const type = typeField.value;
    const message = messageField.value.trim();
    let valid = true;

    if (!name) { setFieldError(validation[0], validation[0].message); valid = false; }
    else setFieldError(validation[0], '');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFieldError(validation[1], validation[1].message); valid = false; }
    else setFieldError(validation[1], '');

    if (!message) { setFieldError(validation[2], validation[2].message); valid = false; }
    else setFieldError(validation[2], '');

    if (!valid) {
      successBox.hidden = true;
      errorBox.textContent = 'Please check the highlighted fields.';
      errorBox.hidden = false;
      const firstInvalid = qs('.field.invalid input, .field.invalid textarea', form);
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    errorBox.hidden = true;
    const subject = 'Project enquiry â€” ' + name + (type ? ' â€” ' + type : '');
    const body = [
      'Name: ' + name,
      'Email: ' + email,
      'Company: ' + (company || 'â€”'),
      'Project type: ' + (type || 'â€”'),
      '',
      message
    ].join('\n');

    qs('#mailtoLink').href = 'mailto:greymatterarchitects@gmail.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    qs('#successDetail').textContent = 'An email addressed to greymatterarchitects@gmail.com has been prepared with your details. If your email app did not open, use the link below.';
    successBox.hidden = false;
  });
})();
