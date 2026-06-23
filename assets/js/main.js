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

    // Add PawPrints Favicon Dynamically
    if (!document.querySelector("link[rel*='icon']")) {
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/svg+xml';
        favicon.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="%238C6CC9" d="M192,72a32,32,0,1,0-32-32A32,32,0,0,0,192,72ZM64,72A32,32,0,1,0,32,40,32,32,0,0,0,64,72Zm126.85,58.33A24.16,24.16,0,0,0,172,128a30.86,30.86,0,0,0-17.65,5.55C146.46,139,139.79,144,128,144s-18.46-5-26.35-10.45A30.86,30.86,0,0,0,84,128a24.16,24.16,0,0,0-18.85,2.33C47.88,140.7,35.25,165.73,32.22,185.34a26.24,26.24,0,0,0,12.59,25.46C56,217.43,73.1,224,96,224a91.56,91.56,0,0,0,32-5.74A91.56,91.56,0,0,0,160,224c22.9,0,40-6.57,51.19-13.2a26.24,26.24,0,0,0,12.59-25.46C220.75,165.73,208.12,140.7,190.85,130.33ZM224,64a24,24,0,1,0-24,24A24,24,0,0,0,224,64ZM80,88A24,24,0,1,0,56,64,24,24,0,0,0,80,88Z"/></svg>';
        document.head.appendChild(favicon);
    }

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
