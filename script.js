document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.projects-track');
    const cards = document.querySelectorAll('.project-card');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    let cardWidth = 0;
    
    function calculateCardWidth() {
        // Calculate the width of a card including its margin
        const card = cards[0];
        const style = window.getComputedStyle(card);
        const margin = parseFloat(style.marginRight) + parseFloat(style.marginLeft);
        cardWidth = card.offsetWidth + margin;
    }
    
    function updateCarousel() {
        // Add smooth transition
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update button states
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevButton.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        
        nextButton.style.opacity = currentIndex >= cards.length - 2 ? '0.5' : '1';
        nextButton.style.pointerEvents = currentIndex >= cards.length - 2 ? 'none' : 'auto';
    }
    
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - 2) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        calculateCardWidth();
        updateCarousel();
    });
    
    // Initialize carousel
    calculateCardWidth();
    updateCarousel();
    
    // Add touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
            if (swipeDistance > 0 && currentIndex > 0) {
                currentIndex--;
            } else if (swipeDistance < 0 && currentIndex < cards.length - 2) {
                currentIndex++;
            }
            updateCarousel();
        }
    }
}); 