/**
 * Main JavaScript for PawPrints Veterinary
 * Handles Theme toggling (Dark/Light) and RTL layout direction.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Force scroll to top on new page load
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 1. Initialize Settings from LocalStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedDir = localStorage.getItem('dir') || 'ltr';

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    if (savedDir === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
    }

    updateThemeIcon();

    // 2. Set up Theme Toggle
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn, #theme-toggle');
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            if (newTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            
            localStorage.setItem('theme', newTheme);
            updateThemeIcon();
        });
    });

    // 3. Set up RTL Toggle
    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn, #rtl-toggle');
    rtlToggleBtns.forEach(btn => {
        if (savedDir === 'rtl') {
            btn.textContent = 'LTR';
            btn.classList.add('active');
        } else {
            btn.textContent = 'RTL';
            btn.classList.remove('active');
        }
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            
            rtlToggleBtns.forEach(b => {
                b.textContent = newDir === 'rtl' ? 'LTR' : 'RTL';
                if (newDir === 'rtl') {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
        });
    });

    // 4. Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Trigger once on load in case the user loads halfway down the page
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        }
    }

    // 5. Live Moving Particles in Hero Banners
    const heroCards = document.querySelectorAll('.hero-card');
    heroCards.forEach(card => {
        // Ensure card is relative so absolute particles stay inside
        card.style.position = 'relative';
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        
        // Generate 20 floating particles per banner
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Randomize properties for organic feel
            const size = Math.random() * 15 + 5; // 5px to 20px
            const left = Math.random() * 100; // 0% to 100%
            const duration = Math.random() * 10 + 5; // 5s to 15s
            // Negative delay makes them start mid-animation so the banner is already full on load
            const delay = -(Math.random() * 15); // -15s to 0s
            const opacity = Math.random() * 0.4 + 0.1; // 0.1 to 0.5
            
            particle.style.setProperty('--size', `${size}px`);
            particle.style.setProperty('--left', `${left}%`);
            particle.style.setProperty('--duration', `${duration}s`);
            particle.style.setProperty('--delay', `${delay}s`);
            particle.style.setProperty('--opacity', `${opacity}`);
            
            particlesContainer.appendChild(particle);
        }
        
        card.insertBefore(particlesContainer, card.firstChild);
    });
});

/**
 * Updates the theme toggle icon (Sun vs Moon) based on current theme.
 */
function updateThemeIcon() {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn, #theme-toggle');
    if (!themeToggleBtns.length) return;
    
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    themeToggleBtns.forEach(btn => {
        const icon = btn.querySelector('i');
        if (!icon) return;
        
        if (currentTheme === 'dark') {
            icon.className = 'ph-bold ph-sun'; // Show sun when in dark mode
            btn.classList.add('active');
        } else {
            icon.className = 'ph-bold ph-moon'; // Show moon when in light mode
            btn.classList.remove('active');
        }
    });
}
