<script>
const canvas = document.getElementById('bouncingBallsCanvas');
const ctx = canvas.getContext('2d');
const loaderBar = document.getElementById('loaderBar');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ballSize = 10;
const ballCount = 5; // Number of balls

let balls = [];

for (let i = 0; i < ballCount; i++) {
    balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4
    });
}

function drawBall(ball) {
    ctx.fillStyle = '#39ff14';
    ctx.fillRect(ball.x - ballSize / 2, ball.y - ballSize / 2, ballSize, ballSize);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        // Move ball
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Ball collision with edges
        if (ball.x < 0 || ball.x > canvas.width) ball.dx = -ball.dx;
        if (ball.y < 0 || ball.y > canvas.height) ball.dy = -ball.dy;

        drawBall(ball);
    });

    requestAnimationFrame(update);
}

update();

// Scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    loaderBar.style.width = scrollProgress + '%';
}

// Update scroll progress on scroll
window.addEventListener('scroll', updateScrollProgress);

// Initial call to set loader position
updateScrollProgress();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateScrollProgress();
});
</script>