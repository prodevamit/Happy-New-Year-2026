function updateCountdown() {
    const targetDate = new Date(2026, 0, 1).getTime();
    
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
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            createConfetti(100);
        }
    }, 1000);
}

function createConfetti(count) {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ffd89b', '#667eea', '#764ba2', '#f093fb', '#4facfe'];
    
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.delay = Math.random() * 0.5 + 's';
        piece.style.duration = (Math.random() * 2 + 2.5) + 's';
        confettiContainer.appendChild(piece);
        
        setTimeout(() => piece.remove(), 3000);
    }
}

document.querySelector('.btn').addEventListener('click', () => {
    createConfetti(50);
});

updateCountdown();
