// ==================== ULTRA-OPTIMIZED SCROLL & ANIMATIONS ====================
// Single scroll listener + RAF = No lag!

document.addEventListener('DOMContentLoaded', function() {
    // ==================== SETUP ====================
    const hiddenElements = document.querySelectorAll('.hidden');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    const heroSection = document.getElementById('hero');
    
    // Create scroll indicator if not exists
    let scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) {
        scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        document.body.appendChild(scrollIndicator);
    }
    
    let scrollState = {
        scrollY: 0,
        ticking: false
    };

    // ==================== INTERSECTION OBSERVER (Scroll Reveal) ====================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    hiddenElements.forEach((el) => observer.observe(el));

    // ==================== MASTER SCROLL HANDLER - ALL IN ONE ====================
    function handleAllScroll() {
        scrollState.scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - windowHeight;

        // 1. Navbar scroll detection
        if (scrollState.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 2. Active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (scrollState.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
        });

        // 3. Scroll progress indicator
        if (scrollIndicator) {
            const scrolled = (scrollState.scrollY / docHeight) * 100;
            scrollIndicator.style.width = scrolled + '%';
        }

        // 4. Parallax hero
        if (heroSection) {
            heroSection.style.backgroundPosition = `0 ${scrollState.scrollY * 0.3}px`;
        }

        // 5. Section scale + fade (MOST IMPORTANT)
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const progress = (scrollState.scrollY - sectionTop + windowHeight) / (windowHeight + sectionHeight);

            let scale = 1;
            let opacity = 1;

            if (progress < 0.3) {
                scale = 0.5 + (progress / 0.3) * 0.5;
                opacity = Math.max(0, progress / 0.3);
            } else if (progress > 1.7) {
                scale = 1 - ((progress - 1.7) / 0.3) * 0.5;
                opacity = Math.max(0, 1 - ((progress - 1.7) / 0.3));
            }

            scale = Math.max(0.5, Math.min(1, scale));
            opacity = Math.max(0, Math.min(1, opacity));

            section.style.transform = `scale(${scale})`;
            section.style.opacity = opacity;
        });

        scrollState.ticking = false;
    }

    // ==================== SINGLE SCROLL LISTENER ====================
    window.addEventListener('scroll', () => {
        if (!scrollState.ticking) {
            requestAnimationFrame(handleAllScroll);
            scrollState.ticking = true;
        }
    }, { passive: true });

    // ==================== FLOATING SHAPES ====================
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'shapes-container';
    document.body.appendChild(shapesContainer);

    const shapes = ['circle', 'square', 'triangle'];
    const numShapes = 15;

    for (let i = 0; i < numShapes; i++) {
        const shape = document.createElement('div');
        shape.className = `shape ${shapes[Math.floor(Math.random() * shapes.length)]}`;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.animationDelay = `${Math.random() * 20}s`;
        shape.style.animationDuration = `${20 + Math.random() * 15}s`;
        shapesContainer.appendChild(shape);
    }

    // ==================== INITIAL FIX ====================
    requestAnimationFrame(() => {
        handleAllScroll();
    });
});

// ==================== JS CHO MODAL CASE STUDIES ====================
document.addEventListener('DOMContentLoaded', function() {
    // 1. Dữ liệu dự án
    const projectData = {
        'thuVien-app': {
            title: 'Hệ thống Quản lý thư viện',
            tech: ['Java', 'CSS', 'Process Management', 'SMART'],
            image: 'Ảnh ứng dụng chưa updates nha',
            problem: 'Quản lý hàng nghìn sách thủ công? Hàng nghìn khách hàng?',
            solution: 'Sử dụng ngôn ngữ Java để xây dựng một hệ thống quản lý thư viện mạnh mẽ đủ đáp ứng nhu cầu cho hàng nghìn users',
            challenges: ['Dữ liệu lớn', 'Xử lý đồng bộ hóa', 'Realtime updates'],
            results: 'Tạo ra một ứng dụng hoạt động khá ổn định, mượt mà, dễ sử dụng',
            github: 'https://github.com/hieu202416204/QuanLyThuVien'
        },
        'chiTieu-app': {
            title: 'Quản Lý Chi Tiêu',
            tech: ['Java', 'CSS'],
            image: 'Ảnh ứng dụng chưa updates nha',
            problem: 'Việc quản lý dòng tiền thủ công làm mất nhiều thời gian...',
            solution: 'Phát triển một ứng dụng desktop cho phép tạo và lưu trữ lịch sử giao dịch',
            challenges: ['Giao diện dễ nhìn', 'Thiết kế chức năng đơn giản'],
            results: 'Một ứng dụng có thể đáp ứng được nhu cầu cơ bản về quản lý chi tiêu, nhưng điểm yếu là đơn điệu',
            github: 'https://github.com/hieu202416204/QuanLyChiTieu'
        },
        'coffee-app':{
            title: 'Quản Lý Quán Cà Phê',
            tech: ['Java', 'CSS', "JavaFX"],
            image: 'Ảnh ứng dụng chưa updates nha',
            problem: 'Quản ý quán cà phê thủ công làm mất thời gian và dễ mất mát dữ liệu khi quá nhiều khách tới',
            solution: 'Phát triển một ứng dụng desktop cho phép tạo và lưu trữ lịch sử giao dịch của quán, đặc biệt là có thể custom theo quán',
            challenges: ['Giao diện dễ nhìn', 'Thiết kế chức năng đơn giản', 'Thao tác trên màn hình trực tiếp', 'Làm việc nhóm'],
            results: ['Giao diện đẹp mắt, dễ sử dụng, có hỗ trợ đa ngôn ngữ Anh - Việt, chế độ Sáng - Tối', 'Cá nhân hóa trải nghiệm'],
            github: 'https://github.com/TienDatDao/Coffee-shop-management'
        }
    };

    // 2. Lấy các phần tử DOM
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Hàm mở Modal
    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        const techTags = data.tech.map(t => `<span>${t}</span>`).join('');
        const challengesList = data.challenges.map(c => `<li>${c}</li>`).join('');

        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>${data.title}</h2>
                <div class="tech-stack">${techTags}</div>
            </div>
            <div class="modal-image" style="font-size: 1.5rem;">${data.image}</div>
            <div class="case-study-section">
                <h4> Bài toán</h4><p>${data.problem}</p>
            </div>
            <div class="case-study-section">
                <h4> Giải pháp</h4><p>${data.solution}</p>
            </div>
            <div class="case-study-section">
                <h4> Khó khăn</h4><ul>${challengesList}</ul>
            </div>
            <div class="case-study-section">
                <h4> Kết quả</h4><p>${data.results}</p>
            </div>
            <div class="modal-actions">
                <a href="${data.github}" target="_blank" class="btn btn-outline">Xem Source Code</a>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Gán sự kiện click cho thẻ dự án
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-id');
            openModal(projectId);
        });
    });

    // Hàm đóng Modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});