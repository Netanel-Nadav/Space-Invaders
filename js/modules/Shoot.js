import { utilService } from "../utils.js";


export class Shoot {
    constructor(ctx, posX, posY) {
        this.width = 5;
        this.height = 10;
        this.speed = 25;
        this.radius = utilService.getRandomInt(2, 5)
        this.color = '#ff0000'
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
    }

    update () {
        this.posY = this.posY - this.speed
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill()
    }
}