//'use strict';
const FRAMES = 60;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const PITCH_WIDTH = 840;
const PITCH_HEIGHT = 544;

const UP = (canvas.height - PITCH_HEIGHT) / 2;
const DOWN = (canvas.height - PITCH_HEIGHT) / 2 + PITCH_HEIGHT;
const LEFT = (canvas.width - PITCH_WIDTH) / 2;
const RIGHT = (canvas.width - PITCH_WIDTH) / 2 + PITCH_WIDTH;

const ZONE_UP = 0;
const ZONE_DOWN = canvas.height;
const ZONE_LEFT = 0;
const ZONE_RIGHT = canvas.width;

const GOAL_AREA_WIDTH = 150;
const GOAL_AREA_HEIGHT = 320;
const GATE_HEIGHT = 144;

// ****************************************************************************************

var post1 = new GoalPost((canvas.width - PITCH_WIDTH) / 2 - 2, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GATE_HEIGHT) / 2, 1, 10);
var post2 = new GoalPost((canvas.width - PITCH_WIDTH) / 2 - 2, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GATE_HEIGHT) / 2 + GATE_HEIGHT, 1, 10);
var post3 = new GoalPost((canvas.width - PITCH_WIDTH) / 2  + PITCH_WIDTH + 2, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GATE_HEIGHT) / 2, 1, 10);
var post4 = new GoalPost((canvas.width - PITCH_WIDTH) / 2  + PITCH_WIDTH + 2, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GATE_HEIGHT) / 2 + GATE_HEIGHT, 1, 10);

var balls = [];

var ball = new Ball((canvas.width - PITCH_WIDTH) / 2 + PITCH_WIDTH / 2, (canvas.height - PITCH_HEIGHT) / 2 + PITCH_HEIGHT / 2, 1, 10, 7, 'white');
var player1 = new Player(750, 400, 5, 15, 3, '#00ace6');

balls.push(ball);
balls.push(player1);

// ****************************************************************************************

var timer = setInterval(script, 1000 / FRAMES);

function script() {
    update();
    console.log(player1.up, player1.right, player1.down, player1.left, player1.kick);
    draw();
}

function update() {

    for (let i = 0; i < balls.length; i++) {
        balls[i].zeroAcc();
    }

    // FRICTION
    for (let i = 0; i < balls.length; i++) {
        let friction = balls[i].velocity.get();
        let coefficient = 0.1;
        let normalForce = 0.8*balls[i].mass;
        friction.mult(-1).norm().mult(coefficient).mult(normalForce);
        balls[i].addForce(friction);
    }

    // PLAYER ACCELERATION
    if (player1.up === true) player1.addForce(new Vector2D(0, -0.7));
    if (player1.down === true) player1.addForce(new Vector2D(0, 0.7));
    if (player1.left === true) player1.addForce(new Vector2D(-0.7, 0));
    if (player1.right === true) player1.addForce(new Vector2D(0.7, 0));

    // MOVEMENT
    for (let i = 0; i < balls.length; i++) {
        balls[i].move(UP, RIGHT, DOWN, LEFT);
    }

    // BOUNCING
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            if (balls[i] != balls[j]) {
                balls[i].bounce(balls[j]);
            }
        }
    }

    for (let i = 0; i < balls.length; i++) {
        post1.bounce(balls[i], 1);
        post2.bounce(balls[i], 1);
        post3.bounce(balls[i], 1);
        post4.bounce(balls[i], 1);
    }

    // KICKING
    player1.kickBall(ball);

}

function draw() {
    drawBackground();
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
    }

    post1.draw();
    post2.draw();
    post3.draw();
    post4.draw();
}


function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#404040';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect((canvas.width - PITCH_WIDTH) / 2 - 4, (canvas.height - PITCH_HEIGHT) / 2 - 4, PITCH_WIDTH + 8, PITCH_HEIGHT + 8);
    ctx.fillStyle = '#006622';
    ctx.fillRect((canvas.width - PITCH_WIDTH) / 2, (canvas.height - PITCH_HEIGHT) / 2, PITCH_WIDTH, PITCH_HEIGHT);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo((canvas.width - PITCH_WIDTH) / 2, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GOAL_AREA_HEIGHT) / 2);
    ctx.lineTo((canvas.width - PITCH_WIDTH) / 2 + GOAL_AREA_WIDTH, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GOAL_AREA_HEIGHT) / 2);
    ctx.lineTo((canvas.width - PITCH_WIDTH) / 2 + GOAL_AREA_WIDTH, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GOAL_AREA_HEIGHT) / 2 + GOAL_AREA_HEIGHT);
    ctx.lineTo((canvas.width - PITCH_WIDTH) / 2, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GOAL_AREA_HEIGHT) / 2 + GOAL_AREA_HEIGHT);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo((canvas.width - PITCH_WIDTH) / 2 + PITCH_WIDTH / 2, (canvas.height - PITCH_HEIGHT) / 2);
    ctx.lineTo((canvas.width - PITCH_WIDTH) / 2 + PITCH_WIDTH / 2, (canvas.height - PITCH_HEIGHT) / 2 + PITCH_HEIGHT);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo((canvas.width - PITCH_WIDTH) / 2 + PITCH_WIDTH, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GOAL_AREA_HEIGHT) / 2);
    ctx.lineTo((canvas.width - PITCH_WIDTH) / 2 + PITCH_WIDTH - GOAL_AREA_WIDTH, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GOAL_AREA_HEIGHT) / 2);
    ctx.lineTo((canvas.width - PITCH_WIDTH) / 2 + PITCH_WIDTH - GOAL_AREA_WIDTH, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GOAL_AREA_HEIGHT) / 2 + GOAL_AREA_HEIGHT);
    ctx.lineTo((canvas.width - PITCH_WIDTH) / 2 + PITCH_WIDTH, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GOAL_AREA_HEIGHT) / 2 + GOAL_AREA_HEIGHT);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc((canvas.width - PITCH_WIDTH) / 2 + PITCH_WIDTH / 2, (canvas.height - PITCH_HEIGHT) / 2 + PITCH_HEIGHT / 2, 72, 0, 2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc((canvas.width - PITCH_WIDTH) / 2 + PITCH_WIDTH / 2, (canvas.height - PITCH_HEIGHT) / 2 + PITCH_HEIGHT / 2, 3, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo((canvas.width - PITCH_WIDTH) / 2 - 2, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GATE_HEIGHT) / 2);
    ctx.lineTo((canvas.width - PITCH_WIDTH) / 2 - 2, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GATE_HEIGHT) / 2 + GATE_HEIGHT);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo((canvas.width - PITCH_WIDTH) / 2  + PITCH_WIDTH + 2, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GATE_HEIGHT) / 2);
    ctx.lineTo((canvas.width - PITCH_WIDTH) / 2  + PITCH_WIDTH + 2, (canvas.height - PITCH_HEIGHT) / 2 + (PITCH_HEIGHT - GATE_HEIGHT) / 2 + GATE_HEIGHT);
    ctx.stroke();
}

// player 1 controller
document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 38:
            player1.up = true;
            break;
        case 40:
            player1.down = true;
            break;
        case 37:
            player1.left = true;
            break;
        case 39:
            player1.right = true;
            break;
        case 88:
            player1.kick = true;
            break;
    }
});
document.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
        case 38:
            player1.up = false;
            break;
        case 40:
            player1.down = false;
            break;
        case 37:
            player1.left = false;
            break;
        case 39:
            player1.right = false;
            break;
        case 88:
            player1.kick = false;
            break;
    }
});
