document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.projects-track');
    const cards = document.querySelectorAll('.project-card');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 32; // Width + gap
    
    function updateCarousel() {
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
        cardWidth = cards[0].offsetWidth + 32;
        updateCarousel();
    });
    
    // Initialize carousel
    updateCarousel();
}); 