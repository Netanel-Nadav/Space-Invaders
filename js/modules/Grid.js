import { utilService } from "../utils.js";
import { Enemy } from "./Enemy.js";

export class Grid {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.rows = utilService.getRandomInt(2, 5)
        this.columns = utilService.getRandomInt(2, 15)
        this.invaders = []
        this.ctx = ctx
        this.speed = {
            x: 2,
            y: 0 
        }
        this.posX = 0
        this.posY = 0
        this.width = canvasWidth
        this.height = canvasHeight

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.invaders.push(new Enemy(ctx, j * 35, i * 35))
            }
        }
    }

    update() {
        this.speed.y = 0
        if (this.posX + this.columns * 35 > this.width || this.posX < 0) {
            this.speed.x = -this.speed.x
            this.speed.y = 35
        }
        this.posX += this.speed.x
        this.posY = this.speed.y
    }

}