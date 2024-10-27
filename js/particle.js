// const canvas = document.getElementById('particles');
// const ctx = canvas.getContext('2d');
// const particles = [];
// const numberOfParticles = 200; // Increased particle count

// // Set the canvas dimensions
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// class Particle {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.size = Math.random() * 5 + 1;
//         this.speedX = Math.random() * 2 - 1; // Slower speed
//         this.speedY = Math.random() * 2 - 1; // Slower speed
//     }

//     update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         // Wrap around the edges of the screen
//         if (this.x > canvas.width) this.x = 0;
//         if (this.x < 0) this.x = canvas.width;
//         if (this.y > canvas.height) this.y = 0;
//         if (this.y < 0) this.y = canvas.height;
//     }

//     draw() {
//         ctx.fillStyle = 'navy';
//         ctx.strokeStyle = 'blue';
//         ctx.lineWidth = 2;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.closePath();
//         ctx.fill();
//         ctx.stroke();
//     }
// }

// function init() {
//     for (let i = 0; i < numberOfParticles; i++) {
//         particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
//     }
// }

// function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     particles.forEach(particle => {
//         particle.update();
//         particle.draw();
//     });
//     requestAnimationFrame(animate);
// }

// // Handle window resize
// window.addEventListener('resize', () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// });
