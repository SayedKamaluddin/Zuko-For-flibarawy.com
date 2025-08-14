// Initialize GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Fire text flicker effect
const fireText = document.querySelector('.fire-text');
gsap.to(fireText, {
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    textShadow: "0 0 20px rgba(255, 100, 0, 0.8)",
    color: "rgba(255, 204, 0, 0.9)"
});

// Navigation flames animation
const navFlames = document.querySelector('.nav-flames');
gsap.to(navFlames, {
    duration: 3,
    repeat: -1,
    backgroundPositionX: "-200%",
    ease: "none"
});

// Timeline item animations
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        x: i % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: "back.out(1.7)"
    });
});

// Gallery item animations
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power2.out"
    });
    
    // Hover effect
    const img = item.querySelector('img');
    item.addEventListener('mouseenter', () => {
        gsap.to(img, {
            scale: 1.1,
            duration: 0.5,
            ease: "power2.out"
        });
        gsap.to(item.querySelector('::before'), {
            opacity: 1,
            duration: 0.3
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(img, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

// Section title animations
const sectionTitles = document.querySelectorAll('section h2');
sectionTitles.forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
    });
    
    // Add fire effect to titles
    const fireUnderline = document.createElement('div');
    fireUnderline.className = 'fire-underline';
    title.appendChild(fireUnderline);
    
    gsap.to(fireUnderline, {
        width: '100%',
        duration: 1,
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        background: `linear-gradient(90deg, 
            transparent, 
            var(--fire-orange), 
            var(--fire-yellow), 
            var(--fire-orange), 
            transparent)`,
        backgroundSize: '200% 100%'
    });
    
    gsap.to(fireUnderline, {
        backgroundPositionX: '-200%',
        duration: 3,
        repeat: -1,
        ease: "none"
    });
});
