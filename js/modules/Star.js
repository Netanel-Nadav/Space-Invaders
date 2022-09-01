import { utilService } from '../utils.js'

export class Star {
    constructor(canvasWidth, canvasHeight, ctx) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.posX = utilService.getRandomInt(0, this.canvasWidth)
        this.posY = utilService.getRandomInt(0, this.canvasHeight)
        this.ctx = ctx
        this.radius = utilService.getRandomInt(0, 5)
        this.speed = utilService.getRandomInt(0, 6)
        this.color = '#fff'
    }

    update() {
        if (this.posY > this.canvasHeight) this.posY = 0
        else this.posY = this.posY + this.speed
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill()
    }
}