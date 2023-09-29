class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = blockWidth;
        this.height = blockHeight;
        this.countdown = floor(random(1, 10));
        this.alive = true;
    }

    show() {
        if (this.alive) {
            fill(255);
            rect(this.x, this.y, this.width, this.height);
            fill(0);
            textSize(16);
            textAlign(CENTER, CENTER);
            text(this.countdown, this.x + this.width / 2, this.y + this.height / 2);
        }
    }

    countdownTick() {
        if (this.alive) {
            this.countdown--;
            if (this.countdown <= 0) {
                this.alive = false;
            }
        }
    }
}
