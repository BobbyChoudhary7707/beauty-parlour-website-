document.addEventListener('DOMContentLoaded', () => {

    // --- Testimonials Slider (Swiper JS) ---
    const testimonialsSlider = new Swiper('.testimonials-slider', {
        // Optional parameters
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
            delay: 5000, // 5 seconds
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // when window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // when window width is >= 992px
            992: {
                 slidesPerView: 2, // Can increase to 3 if design allows
                 spaceBetween: 40
            }
        }
    });

    // --- Gallery Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filter items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                // Check if itemCategory is null or undefined before calling includes
                const categories = itemCategory ? itemCategory.split(' ') : [];

                if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
                    // item.style.display = 'block'; // Use this for simple show/hide
                    item.classList.remove('hide'); // Use this if using CSS animations/transitions
                } else {
                    // item.style.display = 'none';
                    item.classList.add('hide');
                }
            });
        });
    });

     // Initially ensure hidden items are hidden if using the class method
    galleryItems.forEach(item => {
        if (item.classList.contains('hide')) {
            // Ensure it starts hidden if needed by CSS transition setup
        }
    });

    const heroSlides = document.querySelectorAll('.hero-slide');
    const slideInterval = 6000; // Time per slide in milliseconds (4 seconds)
    let currentSlideIndex = 0;
    let slideTimer; // Variable to hold the interval timer

    function showNextSlide() {
        if (heroSlides.length === 0) return; // Exit if no slides found

        // Remove active class from current slide
        heroSlides[currentSlideIndex].classList.remove('active');

        // Increment index, loop back to 0 if needed
        currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;

        // Add active class to the new current slide
        heroSlides[currentSlideIndex].classList.add('active');
    }

    // Start the slideshow
    function startSlideshow() {
        if (heroSlides.length > 1) { // Only start if there's more than one slide
            // Make the first slide active initially
            heroSlides[currentSlideIndex].classList.add('active');
            // Clear any existing timer before starting a new one
            clearInterval(slideTimer);
            // Start the interval timer
            slideTimer = setInterval(showNextSlide, slideInterval);
        } else if (heroSlides.length === 1) {
            // If only one slide, just make it active
            heroSlides[0].classList.add('active');
        }
    }
      // Initialize the slideshow when the DOM is ready
      startSlideshow();


    // --- Footer Current Year ---
     const currentYearSpan = document.getElementById('current-year');
     if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
     }

    // --- Basic Form Submission Handling (Front-end only) ---
    const bookingForm = document.getElementById('booking-form');
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual submission for this example
            // In a real application, you would send this data to a server here
            // using fetch() or similar.
            alert('Thank you for your request! We will contact you shortly to confirm your consultation.');
            bookingForm.reset(); // Clear the form
            startCountdown(null); // Reset countdown
        });
    }

    // --- Auto-Hide Header on Scroll (Mobile Only) ---
    const header = document.querySelector('header');
    const mobileBreakpoint = 768; // Match your CSS breakpoint if effect is mobile-only
    const scrollThreshold = 80; // How far to scroll down before hiding can start
    let lastScrollY = window.scrollY; // Store the last scroll position

    const handleScrollDirection = () => {
        if (!header) return; // Exit if header not found

        const currentScrollY = window.scrollY;
        const isMobile = window.innerWidth <= mobileBreakpoint;

        // Apply logic only on mobile devices
        if (isMobile) {
            // Always show header if scrolled near the top
            if (currentScrollY <= scrollThreshold / 2) { // Show if very close to top
                 header.classList.remove('header-hidden');
            }
            // Determine scroll direction if past the initial threshold
            else if (currentScrollY > scrollThreshold) {
                if (currentScrollY > lastScrollY) {
                    // Scrolling Down -> Hide header
                    header.classList.add('header-hidden');
                } else if (currentScrollY < lastScrollY) {
                    // Scrolling Up -> Show header
                    header.classList.remove('header-hidden');
                }
            }
        } else {
            // Ensure header is always visible on desktop
            header.classList.remove('header-hidden');
        }

        // Update last scroll position for the next event
        lastScrollY = Math.max(0, currentScrollY); // Use Math.max to handle potential negative values
    };

    // Add event listeners
    window.addEventListener('scroll', handleScrollDirection, { passive: true }); // Use passive for better scroll performance
    // Add resize listener to ensure correct state if window size changes
     window.addEventListener('resize', () => {
        // Re-check immediately on resize
        lastScrollY = window.scrollY; // Reset last scroll based on current position
        handleScrollDirection();
     });

     // Initial check on load
     lastScrollY = window.scrollY; // Initialize last scroll
     handleScrollDirection();

}); // End DOMContentLoaded


