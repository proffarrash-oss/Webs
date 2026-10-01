/* ========================================================== */
/*  PORTFOLIO JAVASCRIPT LOGIC                                */
/*  Interactive Features & Scroll Spy Architecture            */
/* ========================================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ======================================================
    // 1. DOM ELEMENT REFERENCES
    // ======================================================
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section[id]');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // ======================================================
    // 2. MOBILE NAVIGATION DRAWER & BACKDROP
    // ======================================================
    const navOverlay = document.createElement('div');
    navOverlay.classList.add('nav-overlay');
    document.body.appendChild(navOverlay);

    function openNavMenu() {
        if (!navMenu || !navToggle) return;
        navMenu.classList.add('active');
        navOverlay.classList.add('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.replace('bx-menu', 'bx-x');
        }
        document.body.style.overflow = 'hidden';
    }

    function closeNavMenu() {
        if (!navMenu || !navToggle) return;
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.replace('bx-x', 'bx-menu');
        }
        document.body.style.overflow = '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            if (navMenu.classList.contains('active')) {
                closeNavMenu();
            } else {
                openNavMenu();
            }
        });
    }

    navOverlay.addEventListener('click', closeNavMenu);

    navLinks.forEach(function (link) {
        link.addEventListener('click', closeNavMenu);
    });

    // ======================================================
    // 3. SCROLL SPY (ACTIVE NAVBAR LINK SYNCHRONIZATION)
    // ======================================================
    function updateScrollSpy() {
        const currentScrollY = window.scrollY + 140;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                });

                const activeTarget = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeTarget) {
                    activeTarget.classList.add('active');
                }
            }
        });
    }

    // ======================================================
    // 4. NAVBAR SCROLLED STATE
    // ======================================================
    function updateNavbarAppearance() {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ======================================================
    // 5. BACK TO TOP CONTROLLER
    // ======================================================
    function updateBackToTopVisibility() {
        if (!backToTopBtn) return;
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ======================================================
    // 6. SCROLL REVEAL ANIMATIONS
    // ======================================================
    const revealTargets = document.querySelectorAll(
        '.about-content, .about-skills, .project-card, .certificate-card, .blog-card, .contact-card, .contact-socials, .contact-location, .section-header'
    );

    revealTargets.forEach(function (element) {
        element.classList.add('reveal');
    });

    function checkScrollReveal() {
        const thresholdY = window.innerHeight * 0.88;
        const allReveals = document.querySelectorAll('.reveal');

        allReveals.forEach(function (element) {
            const rectTop = element.getBoundingClientRect().top;
            if (rectTop < thresholdY) {
                element.classList.add('revealed');
            }
        });
    }

    // ======================================================
    // 7. SKILL BAR ANIMATION (TRIGGERED ON VIEWPORT ENTRY)
    // ======================================================
    let hasAnimatedSkills = false;

    function animateSkillBars() {
        const skillsContainer = document.querySelector('.about-skills');
        if (!skillsContainer || hasAnimatedSkills) return;

        const bounding = skillsContainer.getBoundingClientRect();
        if (bounding.top < window.innerHeight * 0.85) {
            const progressBars = skillsContainer.querySelectorAll('.skill-progress');
            progressBars.forEach(function (bar, index) {
                const targetWidth = bar.getAttribute('data-width') || '70%';
                setTimeout(function () {
                    bar.style.width = targetWidth;
                }, 120 * index);
            });
            hasAnimatedSkills = true;
        }
    }

    // ======================================================
    // 8. PROJECT FILTER SYSTEM (ALL, PERSONAL, ORGANIZATION)
    // ======================================================
    filterBtns.forEach(function (button) {
        button.addEventListener('click', function () {
            filterBtns.forEach(function (btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');

            const selectedFilter = this.getAttribute('data-filter');

            projectCards.forEach(function (card) {
                const cardCategory = card.getAttribute('data-category');

                if (selectedFilter === 'all' || cardCategory === selectedFilter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.45s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ======================================================
    // 9. WINDOW EVENT DISPATCHERS
    // ======================================================
    window.addEventListener('scroll', function () {
        updateScrollSpy();
        updateNavbarAppearance();
        updateBackToTopVisibility();
        checkScrollReveal();
        animateSkillBars();
    }, { passive: true });

    // Initial triggers on load
    updateNavbarAppearance();
    updateScrollSpy();
    checkScrollReveal();
    animateSkillBars();

});
