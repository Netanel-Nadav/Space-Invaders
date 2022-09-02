import { createShots } from "../main.js";

export class Player {
    constructor(canvasWidth, canvasHeight, ctx) {
        this.img = new Image()
        
        this.img.src = './style/imgs/ship.png'
        this.width = 50;
        this.height = 50;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = ctx;
        this.posX = (this.canvasWidth * 0.5) - (this.width / 2)
        this.posY = this.canvasHeight - this.height
        this.speed = 15;
        this.color = '#fff'
    }




    update(keys) {
        if (this.img.src) {
            this.draw()
            if (keys.a.pressed) {
                if (this.posX <= 0) return
                this.posX -= this.speed
            }
            else if (keys.d.pressed) {
                if (this.posX + this.width + 20 > this.canvasWidth) return
                this.posX += this.speed
            }
            else if (keys.space.pressed) {
                createShots(this.posX, this.posY)
            }
        }
    }

    draw() {
        this.ctx.drawImage(this.img, this.posX - 10, this.posY - 30, 70, 70)
    }
}