// ==================== MICRO-INTERACTIONS (Cursor + Ripple) ====================
// Scroll logic moved to script.js to avoid duplicate listeners

document.addEventListener('DOMContentLoaded', function() {
    // ==================== 1. CUSTOM CURSOR (OPTIMIZED) ====================
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);

    let mouseX = 0;
    let mouseY = 0;
    let cursorTicking = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';

        // Trail effect with RAF instead of setTimeout
        if (!cursorTicking) {
            requestAnimationFrame(() => {
                cursorTrail.style.left = (mouseX - 5) + 'px';
                cursorTrail.style.top = (mouseY - 5) + 'px';
                cursorTicking = false;
            });
            cursorTicking = true;
        }
    }, { passive: true });

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-tag');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorTrail.classList.add('active');
        }, { passive: true });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorTrail.classList.remove('active');
        }, { passive: true });
    });

    // ==================== 2. RIPPLE EFFECT ON BUTTONS ====================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

});

