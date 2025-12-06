function createGlowParticles() {
    const container = document.getElementById('glowParticlesContainer');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'glow-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 5) + 's';
        container.appendChild(particle);
    }
}

function updateCountdown() {
    const targetDate = new Date(2026, 0, 1).getTime(); // January 1st, 2026
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(timer);
            showCelebration();
        }
    }, 1000);
}

function showCelebration() {
    const celebrationScreen = document.getElementById('celebrationScreen');
    celebrationScreen.classList.add('active');
    createConfetti(300);
    createSparkles(50);
    createParticleBurst(100);
    triggerPartyPoppers();
    playSound();
    setTimeout(() => startPersistentFloatingParticles(), 500);
}

function triggerPartyPoppers() {
    // Left popper
    createPartyPopper(window.innerWidth * 0.1, 50, -1);
    // Right popper
    createPartyPopper(window.innerWidth * 0.9, 50, 1);
}

function createPartyPopper(startX, startY, direction) {
    const confettiContainer = document.getElementById('confetti');
    const particleCount = 80;
    const colors = ['#ff6b6b', '#ffd89b', '#667eea', '#764ba2', '#f093fb', '#4facfe', '#4ecdc4'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'popper-burst';
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI / 4) + (Math.random() - 0.5) * (Math.PI / 2);
        const velocity = 150 + Math.random() * 250;
        const tx = Math.cos(angle) * velocity * direction;
        const ty = Math.sin(angle) * velocity - 50;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        confettiContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 1500);
    }
}

let particleInterval;

function startPersistentFloatingParticles() {
    const colors = ['#ffd89b', '#667eea', '#764ba2', '#f093fb', '#4facfe', '#ff6b6b', '#4ecdc4', '#fff'];
    
    particleInterval = setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'persistent-particle';
        particle.style.left = Math.random() * (window.innerWidth - 20) + 'px';
        particle.style.bottom = '20px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(particle);
        
        let isDragging = false;
        let offsetY = 0;
        let offsetX = 0;
        
        const handleMouseDown = (e) => {
            isDragging = true;
            particle.classList.add('dragging');
            offsetX = e.clientX - particle.getBoundingClientRect().left;
            offsetY = e.clientY - particle.getBoundingClientRect().top;
            e.preventDefault();
        };
        
        const handleTouchStart = (e) => {
            isDragging = true;
            particle.classList.add('dragging');
            const touch = e.touches[0];
            offsetX = touch.clientX - particle.getBoundingClientRect().left;
            offsetY = touch.clientY - particle.getBoundingClientRect().top;
            e.preventDefault();
        };
        
        const handleMouseMove = (e) => {
            if (isDragging && particle.parentElement) {
                const newLeft = e.clientX - offsetX;
                const newTop = e.clientY - offsetY;
                particle.style.left = newLeft + 'px';
                particle.style.top = newTop + 'px';
                particle.style.bottom = 'auto';
            }
        };
        
        const handleTouchMove = (e) => {
            if (isDragging && particle.parentElement) {
                const touch = e.touches[0];
                const newLeft = touch.clientX - offsetX;
                const newTop = touch.clientY - offsetY;
                particle.style.left = newLeft + 'px';
                particle.style.top = newTop + 'px';
                particle.style.bottom = 'auto';
            }
        };
        
        const handleMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                particle.classList.remove('dragging');
                particle.style.bottom = '20px';
                particle.style.top = 'auto';
                particle.classList.add('falling-to-bottom');
            }
        };
        
        const handleTouchEnd = () => {
            if (isDragging) {
                isDragging = false;
                particle.classList.remove('dragging');
                particle.style.bottom = '20px';
                particle.style.top = 'auto';
                particle.classList.add('falling-to-bottom');
            }
        };
        
        particle.addEventListener('mousedown', handleMouseDown);
        particle.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchend', handleTouchEnd);
    }, 800);
}

function createConfetti(count) {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ffd89b', '#667eea', '#764ba2', '#f093fb', '#4facfe', '#ff6b6b', '#4ecdc4', '#fff'];
    
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        piece.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
        piece.style.width = (Math.random() * 8 + 5) + 'px';
        piece.style.height = piece.style.width;
        confettiContainer.appendChild(piece);
        
        setTimeout(() => piece.remove(), 5000);
    }
}

function createSparkles(count) {
    const celebrationScreen = document.getElementById('celebrationScreen');
    
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        celebrationScreen.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 5000);
    }
}

function createParticleBurst(count) {
    const confettiContainer = document.getElementById('confetti');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-burst';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 200 + Math.random() * 300;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        confettiContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }
}

function playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // First beep
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    osc1.frequency.value = 800;
    gain1.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    osc1.start(audioContext.currentTime);
    osc1.stop(audioContext.currentTime + 0.3);
    
    // Second beep
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    osc2.frequency.value = 1000;
    gain2.gain.setValueAtTime(0.3, audioContext.currentTime + 0.4);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.7);
    osc2.start(audioContext.currentTime + 0.4);
    osc2.stop(audioContext.currentTime + 0.7);
}

document.querySelector('.btn').addEventListener('click', () => {
    createConfetti(150);
    triggerPartyPoppers();
    playSound();
});

// Initialize on page load
createGlowParticles();
updateCountdown();
