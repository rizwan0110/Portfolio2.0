document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.projects-track');
    const cards = document.querySelectorAll('.project-card');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    let cardWidth = 0;
    let autoSlideInterval;
    const slideInterval = 3000; // 3 seconds between slides
    
    // Calculate how many cards to show based on screen width
    function getVisibleCards() {
        if (window.innerWidth >= 768) {
            return 2; // Show 2 cards on medium and large screens
        } else {
            return 1; // Show 1 card on small screens
        }
    }
    
    function calculateCardWidth() {
        const visibleCards = getVisibleCards();
        const trackWidth = track.offsetWidth;
        const gap = 32; // 2rem gap between cards
        cardWidth = (trackWidth - (gap * (visibleCards - 1))) / visibleCards;
        
        // Update card widths
        cards.forEach(card => {
            card.style.width = `${cardWidth}px`;
        });
    }
    
    function updateCarousel() {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${currentIndex * (cardWidth + 32)}px)`;
        
        // Update button states
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);
        
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevButton.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        
        nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        nextButton.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
    }
    
    function nextSlide() {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);
        
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Reset to first slide
        }
        updateCarousel();
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            const visibleCards = getVisibleCards();
            currentIndex = Math.max(0, cards.length - visibleCards); // Go to last slide
        }
        updateCarousel();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideInterval);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners for manual navigation
    prevButton.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    nextButton.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    // Pause auto-slide on hover
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        calculateCardWidth();
        updateCarousel();
    });
    
    // Initialize carousel
    calculateCardWidth();
    updateCarousel();
    startAutoSlide();
    
    // Add touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    });
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
            if (swipeDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    }
}); 