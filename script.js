const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const particlesArray = [];
const mouse = { x: undefined, y: undefined };
let hue = 0;

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

class Dot {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;

    this.size = 6;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;

    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.3) this.size -= 0.07;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawDots() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 160) {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].color;
        ctx.lineWidth = particlesArray[i].size / 4;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    if (particlesArray[i].size < 0.4) {
      particlesArray.splice(i, 1);
      i++;
    }
  }
}

function animate() {
  hue += 1;
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawDots();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("pointermove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  particlesArray.push(new Dot());
});
