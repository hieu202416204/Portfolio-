// ==================== BEATING SPHERE INTERACTIONS ====================
// Điều khiển quả cầu đập và ripple effect cho hero section

document.addEventListener('DOMContentLoaded', function() {
    const beatingSpherContainer = document.querySelector('.beating-sphere-container');
    const beatingSpherElement = document.querySelector('.beating-sphere');
    
    if (!beatingSpherElement) return;
    
    // Optional: Thêm hover effect cho sphere
    beatingSpherElement.addEventListener('mouseenter', function() {
        // Có thể thêm hiệu ứng hover
        this.style.filter = 'brightness(1.2)';
    }, { passive: true });
    
    beatingSpherElement.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1)';
    }, { passive: true });
    
    // Optional: Bounce effect khi click
    beatingSpherElement.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            animation: clickRipple 0.6s ease-out forwards;
            left: ${e.offsetX}px;
            top: ${e.offsetY}px;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add click ripple animation if not exists
const style = document.createElement('style');
style.textContent = `
    @keyframes clickRipple {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

