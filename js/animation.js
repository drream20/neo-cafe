
        // Scroll reveal animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

        // "See More" reviews functionality
        const seeMoreBtn = document.getElementById('see-more-reviews');
        const hiddenReviews = document.querySelectorAll('.review-card.hidden');

        seeMoreBtn.addEventListener('click', () => {
            hiddenReviews.forEach(review => {
                review.classList.remove('hidden');
                // Re-trigger reveal animation
                review.classList.remove('visible');
                observer.observe(review);
            });
            seeMoreBtn.style.display = 'none';
        });

        // Mobile Navigation
        const hamburger = document.querySelector('.hamburger-menu');
        const navMenu = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links a');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Change hamburger to close icon
            const icon = hamburger.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        }));
    