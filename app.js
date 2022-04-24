const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let frames = 0;
let eatingPhase = false;
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

class Player {
  constructor({ position, velocity, radius, width, height, color }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (player.position.y + player.radius >= canvas.height) {
      player.position.y = canvas.height - player.radius;
      player.velocity.y = 0;
    }
    if (player.position.y - player.radius <= 0) {
      player.position.y = player.radius;
      player.velocity.y = 0;
    }
    if (player.position.x + player.radius >= canvas.width) {
      player.position.x = canvas.width - player.radius;
      player.velocity.x = 0;
    }
    if (player.position.x - player.radius <= 0) {
      player.position.x = player.radius;
      player.velocity.x = 0;
    }
  }
}

class Enemy {
  constructor({ position, velocity, radius, width, height, color }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.radius >= canvas.height) {
      this.position.y = canvas.height - this.radius;
      this.velocity.y = -this.velocity.y;
    }
    if (this.position.y - this.radius <= 0) {
      this.position.y = this.radius;
      this.velocity.y = -this.velocity.y;
    }
    if (this.position.x + this.radius >= canvas.width) {
      this.position.x = canvas.width - this.radius;
      this.velocity.x = -this.velocity.x;
    }
    if (this.position.x - this.radius <= 0) {
      this.position.x = this.radius;
      this.velocity.x = -this.velocity.x;
    }
  }
}

const player = new Player({
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  radius: 100,
  color: "red",
});

let enemies = [];

function animate() {
  requestAnimationFrame(animate);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();

  frames++;
  //   console.log(frames);
  if (frames % 100 === 0) {
    enemies.push(
      new Enemy({
        position: {
          x: Math.random() * canvas.width, //random x,
          y: Math.random() * canvas.height, //random y,
        },
        velocity: {
          x: Math.random() * 10 - 5,
          y: Math.random() * 10 - 5,
        },
        radius: 10,
        color: "blue",
      })
    );
  }
  enemies.forEach((enemy) => {
    enemy.update();
    if (
      enemy.position.x + enemy.radius >= player.position.x - player.radius &&
      enemy.position.x - enemy.radius <= player.position.x + player.radius &&
      enemy.position.y + enemy.radius >= player.position.y - player.radius &&
      enemy.position.y - enemy.radius <= player.position.y + player.radius &&
      !eatingPhase
    ) {
      enemies.splice(enemies.indexOf(enemy), 1);
      player.radius -= 10;
      if (player.radius <= 9) {
        alert("Game Over");
        player.radius = 100;
        enemies = [];
      }
    }
    if (
      enemy.position.x + enemy.radius >= player.position.x - player.radius &&
      enemy.position.x - enemy.radius <= player.position.x + player.radius &&
      enemy.position.y + enemy.radius >= player.position.y - player.radius &&
      enemy.position.y - enemy.radius <= player.position.y + player.radius &&
      eatingPhase
    ) {
      enemies.splice(enemies.indexOf(enemy), 1);
      player.radius += 10;
    }
  });

  console.log(frames);
  if (frames % 1500 === 0) {
    player.color = "white";
    frames = 0;
    eatingPhase = true;
  }
  if (eatingPhase && (frames + 15) % 400 === 0) {
    player.color = "red";
    eatingPhase = false;
  }

  if (upPressed) player.velocity.y = -5;
  if (downPressed) player.velocity.y = 5;
  if (leftPressed) player.velocity.x = -5;
  if (rightPressed) player.velocity.x = 5;
  if (!upPressed && !downPressed) player.velocity.y = 0;
  if (!leftPressed && !rightPressed) player.velocity.x = 0;
}

animate();

addEventListener("keydown", (e) => {
  if (e.key === "w") upPressed = true;
  if (e.key === "s") downPressed = true;
  if (e.key === "a") leftPressed = true;
  if (e.key === "d") rightPressed = true;
});

addEventListener("keyup", (e) => {
  if (e.key === "w") upPressed = false;
  if (e.key === "s") downPressed = false;
  if (e.key === "a") leftPressed = false;
  if (e.key === "d") rightPressed = false;
});

// addEventListener("resize", () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });
