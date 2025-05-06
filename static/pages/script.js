        // Intersection Observer for animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Observe all section titles
        document.querySelectorAll('.section-title').forEach(title => {
            observer.observe(title);
        });

        // Observe all cards
        document.querySelectorAll('.member-card, .workshop-card, .testimonial-card').forEach(card => {
            observer.observe(card);
        });

        // Mobile menu toggle functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Get the toggle button and nav links
            const toggleButton = document.querySelector('.mobile-menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            
            // Toggle menu when button is clicked
            toggleButton.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                toggleButton.classList.toggle('active');
            });
            
            // Close menu when a link is clicked
            const links = document.querySelectorAll('.nav-link');
            links.forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    toggleButton.classList.remove('active');
                });
            });
            
            // Back to top button functionality
            const backToTopButton = document.querySelector('.back-to-top');
            
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('show');
                } else {
                    backToTopButton.classList.remove('show');
                }
            });
        });

        // Form submission handler
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            fetch(this.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    // Show thank you popup
                    const popup = document.getElementById('thankYouPopup');
                    popup.classList.add('active');
                    
                    // Reset form
                    this.reset();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });

        // Close popup when clicking anywhere
        document.addEventListener('click', function(e) {
            const popup = document.getElementById('thankYouPopup');
            const popupContent = popup.querySelector('.popup-content');
            
            // Check if popup is active and click is outside popup content
            if (popup.classList.contains('active') && !popupContent.contains(e.target)) {
                popup.classList.remove('active');
            }
        });

        // Close popup when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const popup = document.getElementById('thankYouPopup');
                if (popup.classList.contains('active')) {
                    popup.classList.remove('active');
                }
            }
        });
    