let balls = [];
let blocks = [];
let blockRowCount = 5;
let blockColumnCount = 10;
let blockWidth;
let blockHeight;
let blockPadding = 10;
let blockTopOffset = 50;
let ballReleased = false; // Track if a ball has been released

let aiming = false; // Track aiming state
let aimingBall; // Track the aiming ball

function setup() {
    createCanvas(800, 600);
    blockWidth = (width - (blockColumnCount - 1) * blockPadding) / blockColumnCount;
    blockHeight = blockWidth;
    initializeBlocks();
}


function draw() {
    background(0);

    // Handle aiming
    if (aiming) {
        drawAimingLine();
    }

    // Check for a click to initiate aiming
    if (!aiming && mouseIsPressed) {
        aiming = true;
        aimingBall = new Ball(mouseX, height);
        aimingBall.show(); // Display the aiming ball
    } else if (aiming && mouseIsPressed) {
        // Release the ball when clicked again
        aiming = false;
        aimingBall.xSpeed = (mouseX - aimingBall.x) * 0.05; // Adjust horizontal speed
        aimingBall.ySpeed = -5; // Set vertical speed
        balls.push(aimingBall);
        ballReleased = true;
    }

    // Update and show balls
    for (let ball of balls) {
        ball.update();
        ball.show();

        // Check for collisions with blocks and bounce
        for (let column of blocks) {
            for (let block of column) {
                ball.bounceOffBlock(block);
            }
        }
    }

    // Update and show blocks
    for (let column of blocks) {
        for (let block of column) {
            block.show();
        }
    }

    // Remove empty columns
    for (let i = blocks.length - 1; i >= 0; i--) {
        if (blocks[i].every(block => !block.alive)) {
            blocks.splice(i, 1);
        }
    }

    // Move blocks down one row if necessary
    if (ballReleased && frameCount % 60 === 0) {
        for (let column of blocks) {
            for (let block of column) {
                if (block.y + blockHeight + blockPadding < height) {
                    block.y += blockHeight + blockPadding;
                }
            }
        }
    }
}

function drawAimingLine() {
    // Draw an imaginary aiming line using a line segment
    stroke(255);
    line(aimingBall.x, aimingBall.y, mouseX, mouseY);
}
function initializeBlocks() {
    blocks = [];
    for (let i = 0; i < blockColumnCount; i++) {
        blocks[i] = [];
        for (let j = 0; j < blockRowCount; j++) {
            let x = i * (blockWidth + blockPadding);
            let y = j * (blockHeight + blockPadding) + blockTopOffset;
            blocks[i][j] = new Block(x, y);
        }
    }
}

function mouseClicked() {
    let ball = new Ball(mouseX, height);
    balls.push(ball);
}
