/**
 * ==========================================================
 * CREATIVE BRANDING AGENCY — PORTFOLIO ENGINE (script.js)
 * White BG Removal, Active Nav Scroll Observer & Back To Top
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const IMAGE_PATH = 'assets/image.png';
    
    // DOM Canvas Elements
    const canvas = document.getElementById('model-canvas');
    const ctx = canvas.getContext('2d');
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');
    const btnBackToTop = document.getElementById('btn-back-to-top');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const navBackdrop = document.getElementById('nav-backdrop');
    const brandLogo = document.querySelector('.brand-logo');
    
    let processedCanvas = null;

    /**
     * Remove pure white background cleanly from image.png
     */
    function removeWhiteBackground(img) {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = img.width;
        offCanvas.height = img.height;
        const offCtx = offCanvas.getContext('2d');

        offCtx.drawImage(img, 0, 0);

        try {
            const imgData = offCtx.getImageData(0, 0, img.width, img.height);
            const data = imgData.data;
            const len = data.length;

            for (let i = 0; i < len; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // Check for white / near-white background pixels
                if (r > 220 && g > 220 && b > 220) {
                    if (r > 245 && g > 245 && b > 245) {
                        data[i + 3] = 0; // Pure white background => fully transparent
                    } else {
                        // Smooth anti-aliased hair & shoulder edge transition
                        const avg = (r + g + b) / 3;
                        const alpha = Math.floor(((245 - avg) / 25) * 255);
                        data[i + 3] = Math.max(0, Math.min(255, alpha));
                    }
                }
            }

            offCtx.putImageData(imgData, 0, 0);
        } catch (e) {
            console.warn('Canvas pixel processing fallback', e);
        }

        return offCanvas;
    }

    /**
     * Resize canvas with High DPI scaling
     */
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        renderModel();
    }

    /**
     * Render the background-removed model centered between text & cards
     */
    function renderModel() {
        if (!processedCanvas) return;

        const cw = canvas.width;
        const ch = canvas.height;

        ctx.clearRect(0, 0, cw, ch);

        // Scale model to fill 88% height
        const fitRatio = (ch * 0.88) / processedCanvas.height;
        const fitW = processedCanvas.width * fitRatio;
        const fitH = processedCanvas.height * fitRatio;

        // Position in exact horizontal center of layout
        const fitX = (cw - fitW) / 2;
        const fitY = ch - fitH; // Align to bottom

        ctx.drawImage(processedCanvas, 0, 0, processedCanvas.width, processedCanvas.height, fitX, fitY, fitW, fitH);
    }

    /**
     * Scroll handler to adjust model opacity & update active navbar link
     */
    function onScroll() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        
        // 1. Canvas Opacity Dimming
        const opacity = Math.max(0.12, 1 - scrollY / 550);
        canvas.style.opacity = opacity.toFixed(2);

        // 2. Active Navbar Highlight
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /**
     * Back to Top smooth scroll
     */
    btnBackToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /**
     * Mobile Navigation Drawer & Hamburger Toggle
     */
    function closeMobileMenu() {
        if (!mobileNavToggle || !primaryNav) return;
        mobileNavToggle.classList.remove('active');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('active');
        navBackdrop?.classList.remove('active');
        document.body.classList.remove('nav-open');
    }

    function toggleMobileMenu() {
        if (!mobileNavToggle || !primaryNav) return;
        const isOpen = mobileNavToggle.classList.contains('active');
        if (isOpen) {
            closeMobileMenu();
        } else {
            mobileNavToggle.classList.add('active');
            mobileNavToggle.setAttribute('aria-expanded', 'true');
            primaryNav.classList.add('active');
            navBackdrop?.classList.add('active');
            document.body.classList.add('nav-open');
        }
    }

    mobileNavToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close mobile menu on clicking any navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu when clicking logo
    brandLogo?.addEventListener('click', () => {
        closeMobileMenu();
    });

    // Close menu when clicking backdrop overlay
    navBackdrop?.addEventListener('click', () => {
        closeMobileMenu();
    });

    // Close menu on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    /**
     * Load image.png and process white background removal
     */
    function loadImage() {
        const img = new Image();
        img.src = IMAGE_PATH;

        img.onload = () => {
            processedCanvas = removeWhiteBackground(img);
            renderModel();
        };

        img.onerror = () => {
            console.error(`Failed to load image from path: ${IMAGE_PATH}`);
        };
    }

    /**
     * Sanity CMS Integration Settings & Live Fetcher
     * Configure your projectId below after running `npx sanity init` in the studio/ folder
     */
    const SANITY_CONFIG = {
        projectId: 'YOUR_SANITY_PROJECT_ID', // Replace with your Sanity project ID
        dataset: 'production',
        apiVersion: '2023-01-01',
    };

    async function fetchSanityContent() {
        if (!SANITY_CONFIG.projectId || SANITY_CONFIG.projectId === 'YOUR_SANITY_PROJECT_ID') {
            console.log('Sanity CMS: Project ID not configured yet. Retaining static HTML fallback content.');
            return;
        }

        const query = encodeURIComponent(`{
            "profile": *[_type == "profile"][0],
            "education": *[_type == "education"],
            "experience": *[_type == "experience"] | order(order asc),
            "services": *[_type == "services"][0],
            "contact": *[_type == "contact"][0]
        }`);

        const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.result) {
                applySanityData(data.result);
            }
        } catch (err) {
            console.warn('Sanity API connection notice (using static HTML fallback):', err);
        }
    }

    function applySanityData(data) {
        // Hydrate Hero / Profile
        if (data.profile) {
            const p = data.profile;
            const heroTitle = document.querySelector('.hero-title-main');
            if (heroTitle && (p.heroHeadlineTop || p.heroHeadlineBottom)) {
                heroTitle.innerHTML = `${p.heroHeadlineTop || ''} <span class="highlight-crimson">${p.heroHeadlineBottom || ''}</span>`;
            }
            const bioText = document.querySelector('.title-sub-description p');
            if (bioText && p.bioDescription) bioText.textContent = p.bioDescription;
            const badgeTag = document.querySelector('.hero-tagline-badge span');
            if (badgeTag && p.roleBadge) badgeTag.textContent = p.roleBadge;
        }

        // Hydrate Contact Email & Footer
        if (data.contact) {
            const c = data.contact;
            if (c.email) {
                document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
                    el.href = `mailto:${c.email}`;
                });
                const footerEmail = document.querySelector('.footer-contact-col p');
                if (footerEmail) footerEmail.innerHTML = `<i class="fa-solid fa-envelope"></i> ${c.email}`;
            }
            if (c.location) {
                const footerLoc = document.querySelector('.footer-location-text');
                if (footerLoc) footerLoc.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${c.location}`;
            }
            if (c.githubUrl) {
                document.querySelectorAll('a[aria-label="GitHub"]').forEach(el => {
                    el.href = c.githubUrl;
                });
            }
            if (c.linkedinUrl) {
                document.querySelectorAll('a[aria-label="LinkedIn"]').forEach(el => {
                    el.href = c.linkedinUrl;
                });
            }
        }
    }

    // Event Listeners
    window.addEventListener('resize', () => {
        if (window.innerWidth > 850) {
            closeMobileMenu();
        }
        resizeCanvas();
    });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initialize
    resizeCanvas();
    loadImage();
    fetchSanityContent();
});

