import { createShots } from "../main.js";

export class Player {
    constructor(canvasWidth, canvasHeight, ctx) {
        this.img = new Image()
        this.img.src = '../style/imgs/ship.png'
        this.width = 50;
        this.height = 50;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = ctx;
        this.posX = (this.canvasWidth * 0.5) - (this.width / 2)
        this.posY = this.canvasHeight - this.height
        this.speed = 25;
        this.color = '#fff'
    }

    update(ev) {
        if (!ev) return
        switch (ev.key) {
            case "d":
                if (this.posX + this.width + 20 > this.canvasWidth) return
                this.posX += this.speed
                break;
            case "D":
                if (this.posX + this.width + 20 > this.canvasWidth) return
                this.posX += this.speed
                break;
            case "a":
                if (this.posX <= 0) return
                else this.posX -= this.speed
                break;
            case "A":
                if (this.posX - this.width < 0) return
                this.posX -= this.speed
                break;
            case " ":
                createShots(this.posX, this.posY)
                break;

            default:
                break;
        }
    }

    draw() {
        this.ctx.drawImage(this.img, this.posX - 10, this.posY - 30, 70, 70)

        // this.ctx.fillStyle = this.color
        // this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }
}