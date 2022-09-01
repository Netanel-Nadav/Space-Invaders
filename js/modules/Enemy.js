export class Enemy {
    constructor(ctx, posX, posY) {
        this.img = new Image()
        this.img.src = '../style/imgs/enemy.png'
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
        this.ctx.drawImage(this.img, this.posX, this.posY, 35, 35)
        // this.ctx.fillStyle = this.color
        // this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }
}