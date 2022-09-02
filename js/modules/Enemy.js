export class Enemy {
    constructor(ctx, posX, posY) {
        this.img = new Image()
        this.img.src = './style/imgs/enemy.png'
        this.ctx = ctx;
        this.posX = posX
        this.posY = posY
        this.width = 30;
        this.height = 30;
        this.color = '#FFFF00'
    }

    update(speed) {
        this.posX += speed.x
        this.posY += speed.y

    }

    draw() {
        if (this.img.src) {
            console.log(this.img.src);
            this.ctx.drawImage(this.img, this.posX, this.posY, 35, 35)
        }
    }
}