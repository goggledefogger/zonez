class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.ySpeed = -5;
        this.color = color(random(255), random(255), random(255));
    
        this.toRemove = false; // Flag to indicate if the ball should be removed
    }

    update() {
        this.y += this.ySpeed;

        // Check if the ball should be removed
        if (this.toRemove || this.y > height) {
            // If the ball is out of bounds or marked for removal, remove it
            let index = balls.indexOf(this);
            if (index !== -1) {
                balls.splice(index, 1);
            }
        }
    }

    show() {
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.radius * 2);
    }

    hits(block) {
        if (!block.alive) {
            return false;
        }
        let x1 = this.x - this.radius;
        let x2 = this.x + this.radius;
        let y1 = this.y - this.radius;
        let y2 = this.y + this.radius;

        return (
            x1 < block.x + block.width &&
            x2 > block.x &&
            y1 < block.y + block.height &&
            y2 > block.y
        );
    }

    bounceOffBlock(block) {
        if (!block.alive) {
            return;
        }

        let closestX = constrain(this.x, block.x, block.x + block.width);
        let closestY = constrain(this.y, block.y, block.y + block.height);

        let distanceX = this.x - closestX;
        let distanceY = this.y - closestY;
        let distanceSquared = distanceX * distanceX + distanceY * distanceY;

        if (distanceSquared <= this.radius * this.radius) {
            if (abs(distanceX) > abs(distanceY)) {
                this.xSpeed *= -1;
            } else {
                this.ySpeed *= -1;
            }
            block.countdownTick();
        }
    }
}
