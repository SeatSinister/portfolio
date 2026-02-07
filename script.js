// Halftone Background Animation with Pulsing Effect and Mouse Interaction
function createHalftoneBackground(containerId, sectionElement = null) {
    const container = document.getElementById(containerId) || sectionElement;
    if (!container) return null;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        if (sectionElement) {
            const rect = sectionElement.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            ctx.scale(dpr, dpr);
        } else {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.scale(dpr, dpr);
        }
    }
    
    resizeCanvas();
    container.appendChild(canvas);
    
    // Get actual display dimensions (not scaled)
    let displayWidth = sectionElement ? sectionElement.offsetWidth : window.innerWidth;
    let displayHeight = sectionElement ? sectionElement.offsetHeight : window.innerHeight;
    
    let centerX = displayWidth / 2;
    let centerY = displayHeight / 2;
    let maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);
    const dotSpacing = 20;
    let rows = Math.ceil(displayHeight / dotSpacing);
    let cols = Math.ceil(displayWidth / dotSpacing);
    
    let animationFrame = 0;
    let mouseX = centerX;
    let mouseY = centerY;
    let isHovered = false;
    let hoverIntensity = 0;
    
    // Mouse tracking
    const updateMousePosition = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        isHovered = true;
        hoverIntensity = Math.min(hoverIntensity + 0.1, 1);
    };
    
    const handleMouseLeave = () => {
        isHovered = false;
    };
    
    canvas.addEventListener('mousemove', updateMousePosition);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Allow mouse events for interaction
    canvas.style.pointerEvents = 'auto';
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        
        animationFrame += 0.02;
        
        // Smooth hover intensity transition
        if (!isHovered) {
            hoverIntensity = Math.max(hoverIntensity - 0.05, 0);
        }
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * dotSpacing;
                const y = row * dotSpacing;
                const distance = Math.sqrt(
                    Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
                );
                
                // Distance from mouse cursor
                const mouseDistance = Math.sqrt(
                    Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2)
                );
                
                // Calculate dot size based on distance from center (radial gradient)
                const normalizedDistance = distance / maxRadius;
                const baseSize = 8 * (1 - normalizedDistance * 0.7);
                
                // Add pulsing effect - multiple sine waves for complex animation
                const pulse1 = Math.sin(animationFrame + distance * 0.01) * 2;
                const pulse2 = Math.sin(animationFrame * 1.5 + distance * 0.015) * 1.5;
                const pulse3 = Math.cos(animationFrame * 0.8 + distance * 0.008) * 1;
                const totalPulse = (pulse1 + pulse2 + pulse3) / 3;
                
                // Mouse interaction - stronger pulse near cursor
                const mouseInfluence = Math.max(0, 1 - mouseDistance / 200); // 200px radius
                const mousePulse = mouseInfluence * hoverIntensity * 4; // Enhanced pulse near mouse
                
                const size = Math.max(1, baseSize + totalPulse + mousePulse);
                
                // Only draw dots that are visible
                if (size > 0.5) {
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        
        requestAnimationFrame(draw);
    }
    
    draw();
    
    // Resize handler with debounce
    let resizeTimeout;
    const resizeHandler = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newDisplayWidth = sectionElement ? sectionElement.offsetWidth : window.innerWidth;
            const newDisplayHeight = sectionElement ? sectionElement.offsetHeight : window.innerHeight;
            
            if (newDisplayWidth !== displayWidth || newDisplayHeight !== displayHeight) {
                displayWidth = newDisplayWidth;
                displayHeight = newDisplayHeight;
                resizeCanvas();
                // Recalculate dimensions
                centerX = displayWidth / 2;
                centerY = displayHeight / 2;
                maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);
                rows = Math.ceil(displayHeight / dotSpacing);
                cols = Math.ceil(displayWidth / dotSpacing);
                // Update mouse position to center if needed
                mouseX = centerX;
                mouseY = centerY;
            }
        }, 100);
    };
    
    window.addEventListener('resize', resizeHandler);
    
    // Handle zoom changes
    let lastZoom = window.devicePixelRatio || 1;
    const zoomHandler = () => {
        const currentZoom = window.devicePixelRatio || 1;
        if (Math.abs(currentZoom - lastZoom) > 0.1) {
            lastZoom = currentZoom;
            resizeCanvas();
        }
    };
    
    // Check zoom periodically
    setInterval(zoomHandler, 500);
    
    return { canvas, resizeHandler };
}

// Smooth scrolling
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

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
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
}

// =============================================================================
// Contact form handler: EmailJS с fallback на mailto
// Если форма отсутствует (раздел «Связь со мной» без полей), обработчик не вешается.
// Настройка EmailJS: см. EMAILJS_SETUP.md. Без ключей используется только mailto.
// TODO: Minify for production (e.g. terser).
// =============================================================================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitLoader = document.getElementById('submitLoader');
const formMessage = document.getElementById('formMessage');

if (contactForm && submitBtn && submitText && submitLoader && formMessage) {
    const setFormMessage = (message, type = 'info') => {
        formMessage.textContent = message;
        formMessage.className = type;
        formMessage.style.display = 'block';
    };

    /** Валидация email по простому шаблону */
    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    /** Сборка mailto-ссылки с предзаполненными данными (fallback при отсутствии EmailJS или ошибке) */
    const buildMailtoLink = (name, email, phone, message) => {
        const subject = encodeURIComponent('Сообщение с портфолио');
        const body = encodeURIComponent(
            `Имя: ${name}\nEmail: ${email}\nТелефон: ${phone}\n\nСообщение:\n${message}`
        );
        return `mailto:markarov19@bk.ru?subject=${subject}&body=${body}`;
    };

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameEl = document.getElementById('contactName');
        const emailEl = document.getElementById('contactEmail');
        const phoneEl = document.getElementById('contactPhone');
        const messageEl = document.getElementById('contactMessage');
        if (!nameEl || !emailEl || !messageEl) {
            console.error('Contact form: отсутствуют поля формы.');
            return;
        }

        const name = nameEl.value.trim();
        const email = emailEl.value.trim();
        const phone = (phoneEl && phoneEl.value) ? phoneEl.value.trim() : '';
        const message = messageEl.value.trim();
        const normalizedPhone = phone || 'Не указан';

        formMessage.style.display = 'none';
        formMessage.className = '';

        // Валидация обязательных полей
        if (!name || !email || !message) {
            setFormMessage('Пожалуйста, заполните обязательные поля: имя, email и сообщение.', 'error');
            return;
        }
        if (!isValidEmail(email)) {
            setFormMessage('Пожалуйста, введите корректный адрес электронной почты.', 'error');
            return;
        }

        const mailtoLink = buildMailtoLink(name, email, normalizedPhone, message);

        // Проверка наличия и настройки EmailJS (ключи только из data-атрибутов формы)
        const serviceID = (contactForm.dataset.emailjsService || '').trim();
        const templateID = (contactForm.dataset.emailjsTemplate || '').trim();
        const publicKey = (contactForm.dataset.emailjsPublicKey || '').trim();
        const emailjsAvailable = typeof emailjs !== 'undefined' &&
            typeof emailjs.send === 'function' &&
            typeof emailjs.init === 'function';
        const emailjsConfigured = emailjsAvailable &&
            serviceID && templateID && publicKey &&
            !serviceID.includes('YOUR_') && !templateID.includes('YOUR_') && !publicKey.includes('YOUR_');

        if (!emailjsConfigured) {
            console.warn('[Портфолио] EmailJS не настроен. Используется mailto. См. EMAILJS_SETUP.md.');
            setFormMessage('Открываю почтовый клиент для отправки сообщения.', 'info');
            window.location.href = mailtoLink;
            return;
        }

        submitText.style.display = 'none';
        submitLoader.style.display = 'inline';
        submitBtn.disabled = true;

        try {
            emailjs.init(publicKey);
            await emailjs.send(serviceID, templateID, {
                from_name: name,
                from_email: email,
                phone: normalizedPhone,
                message: message,
                to_email: 'markarov19@bk.ru'
            });
            setFormMessage('Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.', 'success');
            contactForm.reset();
        } catch (err) {
            console.error('Ошибка EmailJS:', err);
            setFormMessage('Не удалось отправить через сервер. Открываю почтовый клиент…', 'error');
            setTimeout(() => { window.location.href = mailtoLink; }, 1500);
        } finally {
            submitText.style.display = 'inline';
            submitLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Intersection Observer для появления секций (оптимизация: только transform и opacity)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.willChange = 'auto';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    section.style.willChange = 'transform, opacity';
    observer.observe(section);
});

// Create halftone divider effect
function createHalftoneDivider(dividerElement) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    dividerElement.appendChild(canvas);
    
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = dividerElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.scale(dpr, dpr);
    }
    
    resizeCanvas();
    
    const width = dividerElement.offsetWidth;
    const height = dividerElement.offsetHeight;
    const dotSpacing = 18;
    const rows = Math.ceil(height / dotSpacing);
    const cols = Math.ceil(width / dotSpacing);
    
    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.15)';
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * dotSpacing;
                const y = row * dotSpacing;
                
                // Calculate distance from top and bottom edges
                const distFromTop = y;
                const distFromBottom = height - y;
                const minDist = Math.min(distFromTop, distFromBottom);
                
                // Size increases towards edges (top and bottom)
                const maxDist = height / 2;
                const normalizedDist = minDist / maxDist;
                const sizeMultiplier = 1 - normalizedDist; // 0 at center, 1 at edges
                
                // Base size with gradient effect
                const baseSize = 1.5;
                const maxSize = 5;
                const size = baseSize + (maxSize - baseSize) * sizeMultiplier;
                
                // Opacity also increases towards edges
                const opacity = 0.2 + (0.6 * sizeMultiplier);
                
                if (size > 0.3) {
                    ctx.globalAlpha = opacity;
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }
    
    draw();
    
    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            draw();
        }, 100);
    });
}

// Initialize halftone backgrounds for all sections
document.addEventListener('DOMContentLoaded', () => {
    // Hero section
    createHalftoneBackground('halftoneBg');
    
    // Other sections with dark backgrounds
    const sectionsWithHalftone = document.querySelectorAll('.halftone-bg-section');
    sectionsWithHalftone.forEach((section) => {
        createHalftoneBackground(null, section);
    });
    
    // Create halftone dividers
    const dividers = document.querySelectorAll('.halftone-divider');
    dividers.forEach((divider) => {
        createHalftoneDivider(divider);
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});
