document.addEventListener('DOMContentLoaded', () => {
    // Main Website Mobile Nav
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.classList.toggle('open');
            
            // Change icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('open')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    }

    // Dashboard Mobile Nav
    const dashMenuToggle = document.querySelector('.dash-mobile-toggle');
    const dashSidebar = document.querySelector('.dashboard-sidebar');
    
    if (dashMenuToggle && dashSidebar) {
        dashMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dashSidebar.classList.toggle('open');
            
            const icon = dashMenuToggle.querySelector('i');
            if (dashSidebar.classList.contains('open')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
        
        // Handle explicit close button inside sidebar
        const dashSidebarClose = document.querySelectorAll('.dash-sidebar-close');
        dashSidebarClose.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                dashSidebar.classList.remove('open');
                const icon = dashMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            });
        });
        
        // Close sidebar when clicking a link (mobile only)
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    dashSidebar.classList.remove('open');
                    const icon = dashMenuToggle.querySelector('i');
                    if(icon) {
                        icon.classList.remove('ph-x');
                        icon.classList.add('ph-list');
                    }
                }
            });
        });
    }

    // Mobile Navigation Dropdown Logic
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault(); // Stop navigation to the link
                const parent = trigger.parentElement;
                parent.classList.toggle('active');
            }
        });
    });

    // Auto-inject data-labels for responsive dashboard tables
    document.querySelectorAll('.dash-table').forEach(table => {
        const headers = Array.from(table.querySelectorAll('th')).map(th => th.innerText);
        table.querySelectorAll('tbody tr').forEach(tr => {
            Array.from(tr.querySelectorAll('td')).forEach((td, index) => {
                if (headers[index]) {
                    td.setAttribute('data-label', headers[index]);
                }
            });
        });
    });
});
