function initFireEffect() {
    // Only initialize if Three.js is available and screen is large enough
    if (typeof THREE === 'undefined' || window.innerWidth < 768) return;
    
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.opacity = '0.5';
    document.body.appendChild(renderer.domElement);
    
    // Create fire particles
    const particleCount = 500;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const fireColors = [
        [1.0, 0.5, 0.1], // Orange
        [1.0, 0.8, 0.2], // Yellow
        [1.0, 0.3, 0.1]  // Red
    ];
    
    for (let i = 0; i < particleCount; i++) {
        // Random positions
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = Math.random() * 5 - 2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        
        // Random colors from fire palette
        const color = fireColors[Math.floor(Math.random() * fireColors.length)];
        colors[i * 3] = color[0];
        colors[i * 3 + 1] = color[1];
        colors[i * 3 + 2] = color[2];
        
        // Random sizes
        sizes[i] = Math.random() * 0.5 + 0.1;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create particle system
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Position camera
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate particles
        const positions = particles.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            // Move particles upward
            positions[i * 3 + 1] += 0.01 + Math.random() * 0.02;
            
            // Reset particles that go too high
            if (positions[i * 3 + 1] > 3) {
                positions[i * 3] = (Math.random() - 0.5) * 10;
                positions[i * 3 + 1] = -2;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            }
            
            // Slight horizontal movement
            positions[i * 3] += (Math.random() - 0.5) * 0.01;
            positions[i * 3 + 2] += (Math.random() - 0.5) * 0.01;
        }
        
        particles.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
