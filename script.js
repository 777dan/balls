const canvas = document.getElementById("canvas");
const applyBtn = document.getElementById("apply-btn");
const numInput = document.getElementById("num-input");
const clearBtn = document.getElementById("clear-btn");
const submitBtn = document.getElementById("submit-speed-btn");
const speedInput = document.getElementById("speed-input");
const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

class Ball {
    constructor(canvas, x = 100, y = 100) {
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.xSpeed = Math.floor(Math.random() * 10);
        this.ySpeed = Math.floor(Math.random() * 10);
        this.randomColor = colors[Math.floor(Math.random() * colors.length)];
        // ctx.fillStyle = ctx.clearRect(0, 0, width, height);
        this.color = "blue";
    }

    changeSpeed(newSpeed) {
        this.xSpeed *= Number(newSpeed);
        this.ySpeed *= Number(newSpeed);
    }

    circle(x, y, radius, fillCircle) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        if (fillCircle) {
            this.ctx.fill();
        } else {
            this.ctx.stroke();
        }
    }

    draw() {
        this.ctx.fillStyle = this.randomColor;
        this.circle(this.x, this.y, this.radius, true);
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    checkCollosion() {
        if (this.x < 0 || this.x > this.width) {
            this.xSpeed = -this.xSpeed;
        }

        if (this.y < 0 || this.y > this.height) {
            this.ySpeed = -this.ySpeed;
        }
    }
}

// let ball = new Ball(canvas);
// console.log(ball.x, ball.y, ball.xSpeed, ball.ySpeed);
// ball.draw();
// ball.move();
// balls.checkCollosion();
// console.log(ball.x, ball.y, ball.xSpeed, ball.ySpeed);

class BallsGame {
    constructor(balls, canvas) {
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.balls = balls;
    }

    clear() {
        this.ctx.fillStyle = this.ctx.clearRect(0, 0, this.width, this.height);
        clearInterval(this.interval);
        ballsGame.drawBorder();
    }

    drawBorder() {
        this.ctx.strokeStyle = "grey";
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(0, 0, this.width, this.height);
    }

    go() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].draw();
            this.balls[i].move();
            this.balls[i].checkCollosion();
        }
        this.drawBorder();
    }

    start() {
        this.interval = setInterval(this.go.bind(this), 30);
    }
}

const balls = [];
let ballsGame = new BallsGame(balls, canvas);
ballsGame.drawBorder();
let isStarted = false;
applyBtn.addEventListener('click', () => {
    isStarted = true;
    const n = Number(numInput.value);
    for (let i = 0; i < n; i++) {
        balls[i] = new Ball(canvas);
    }
    ballsGame.start();
});

clearBtn.addEventListener('click', () => {
    ballsGame.clear();
});

submitBtn.addEventListener('click', () => {
    for (let i = 0; i < balls.length; i++) {
        balls[i].changeSpeed(speedInput.value);
    }
});