// Interactivity logic for Campus Sicherheit

document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle hamburger animation if needed
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
            spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
        });
    }

    // Modal control for Job Applications
    const modal = document.getElementById('apply-modal');
    const modalClose = document.getElementById('modal-close');
    const applyButtons = document.querySelectorAll('.apply-btn');
    const applyJobTitle = document.getElementById('apply-job-title');
    const jobTitleInput = document.getElementById('job-title-input');

    if (modal) {
        applyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const jobTitle = btn.getAttribute('data-job') || 'Sicherheitsfachkraft';
                if (applyJobTitle) applyJobTitle.textContent = jobTitle;
                if (jobTitleInput) jobTitleInput.value = jobTitle;
                modal.style.display = 'flex';
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Close on background click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Interactive Job Search
    const searchInput = document.getElementById('job-search');
    const jobItems = document.querySelectorAll('.job-item');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            jobItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const locations = item.querySelector('.job-meta').textContent.toLowerCase();

                if (title.includes(query) || locations.includes(query)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Collapsible Accordions (Datenschutz)
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });

    // File Upload naming helper
    const fileInput = document.getElementById('cv-file');
    const fileLabelText = document.getElementById('file-upload-text');

    if (fileInput && fileLabelText) {
        fileInput.addEventListener('change', (e) => {
            if (fileInput.files.length > 0) {
                fileLabelText.textContent = `Ausgewählt: ${fileInput.files[0].name}`;
                fileLabelText.style.color = '#d6b779';
            }
        });
    }

    // Form submission simulation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show premium animated checkmark success or alert
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Absenden';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Wird gesendet...';
            }

            setTimeout(() => {
                if (modal) modal.style.display = 'none';
                
                // Show floating banner success notification
                const successBanner = document.createElement('div');
                successBanner.style.position = 'fixed';
                successBanner.style.bottom = '20px';
                successBanner.style.right = '20px';
                successBanner.style.backgroundColor = '#d6b779';
                successBanner.style.color = '#0f1216';
                successBanner.style.padding = '1rem 2rem';
                successBanner.style.borderRadius = '8px';
                successBanner.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';
                successBanner.style.zIndex = '3000';
                successBanner.style.fontWeight = 'bold';
                successBanner.style.fontFamily = 'sans-serif';
                successBanner.style.transition = 'all 0.5s ease';
                successBanner.textContent = 'Bewerbung erfolgreich gesendet!';
                
                document.body.appendChild(successBanner);

                setTimeout(() => {
                    successBanner.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(successBanner);
                    }, 500);
                }, 4000);

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                form.reset();
                if (fileLabelText) fileLabelText.textContent = 'Lebenslauf hochladen (PDF, Word)';
            }, 1500);
        });
    });

    // Cookie Banner Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieDecline = document.getElementById('cookie-decline');

    if (cookieBanner && cookieAccept && cookieDecline) {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }

        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookie-consent', 'accepted');
            cookieBanner.classList.remove('show');
        });

        cookieDecline.addEventListener('click', () => {
            localStorage.setItem('cookie-consent', 'declined');
            cookieBanner.classList.remove('show');
        });
    }
});

