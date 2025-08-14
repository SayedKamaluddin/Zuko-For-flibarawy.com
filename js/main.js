// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Remove loader when page is loaded
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        const leftSword = document.querySelector('.sword.left');
        const rightSword = document.querySelector('.sword.right');
        
        // Animate swords crossing
        gsap.to([leftSword, rightSword], {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            onComplete: function() {
                gsap.to(loader, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: function() {
                        loader.style.display = 'none';
                    }
                });
            }
        });
    });

    // Initialize Three.js fire effect
    initFireEffect();
    
    // Initialize timeline
    initTimeline();
    
    // Initialize gallery
    initGallery();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize scar reveal interaction
    initScarReveal();
});

function initFireEffect() {
    // This would be implemented in threejs-fire.js
    console.log("Fire effect initialized");
}

function initTimeline() {
    const timelineData = [
        {
            title: "Banished Prince",
            image: "images/characters/zuko-book1.jpg",
            description: "Zuko as the angry, banished prince seeking to capture the Avatar to restore his honor.",
            year: "Book 1: Water"
        },
        {
            title: "Fugitive",
            image: "images/characters/zuko-book2.jpg",
            description: "Living as a fugitive, Zuko begins to question his mission and his father's motives.",
            year: "Book 2: Earth"
        },
        {
            title: "Redemption",
            image: "images/characters/zuko-book3.jpg",
            description: "Zuko joins Team Avatar and confronts his sister Azula in the final Agni Kai.",
            year: "Book 3: Fire"
        }
    ];

    const container = document.querySelector('.timeline-container');
    
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.setAttribute('data-animate', index % 2 === 0 ? 'left' : 'right');
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="timeline-text">
                    <h3>${item.title}</h3>
                    <span class="timeline-year">${item.year}</span>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
        
        container.appendChild(timelineItem);
    });
}

function initGallery() {
    const galleryData = [
        { src: "images/gallery/zuko-official1.jpg", title: "Official Art 1" },
        { src: "images/gallery/zuko-official2.jpg", title: "Official Art 2" },
        { src: "images/gallery/zuko-fanart1.jpg", title: "Fan Art - The Blue Spirit" },
        { src: "images/gallery/zuko-fanart2.jpg", title: "Fan Art - Redemption" },
        { src: "images/gallery/zuko-cosplay1.jpg", title: "Cosplay - Book 1 Zuko" },
        { src: "images/gallery/zuko-cosplay2.jpg", title: "Cosplay - Fire Lord Zuko" },
        { src: "images/gallery/zuko-meme1.jpg", title: "Meme - That's Rough Buddy" },
        { src: "images/gallery/zuko-meme2.jpg", title: "Meme - Honor" }
    ];

    const gallery = document.querySelector('.mosaic-gallery');
    
    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-title', item.title);
        galleryItem.setAttribute('data-animate', '');
        
        // Make some items larger for mosaic effect
        if (index === 1 || index === 4) {
            galleryItem.style.gridRow = 'span 2';
        }
        if (index === 2 || index === 5) {
            galleryItem.style.gridColumn = 'span 2';
        }
        
        galleryItem.innerHTML = `
            <img src="${item.src}" alt="${item.title}">
        `;
        
        gallery.appendChild(galleryItem);
    });
}

function initScrollAnimations() {
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('[data-animate]');
    
    animateElements.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
    
    // Animate scar reveal on scroll
    gsap.to('.scar-overlay', {
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        opacity: 1,
        ease: "none"
    });
    
    // Parallax effect for hero background
    gsap.to('.hero', {
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        backgroundPositionY: "50%",
        ease: "none"
    });
}

function initScarReveal() {
    const scarContainer = document.querySelector('.scar-reveal');
    const scarOverlay = document.querySelector('.scar-overlay');
    
    scarContainer.addEventListener('mousemove', (e) => {
        const rect = scarContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate percentage position
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        // Create a gradient that reveals the scar based on mouse position
        scarOverlay.style.background = `
            radial-gradient(
                circle at ${xPercent}% ${yPercent}%, 
                transparent 30%, 
                rgba(0,0,0,0.8) 70%
            ),
            url('../images/zuko-scar.png')
        `;
    });
    
    scarContainer.addEventListener('mouseleave', () => {
        // Return to default state
        scarOverlay.style.background = 'url("../images/zuko-scar.png")';
    });
}
