import { Enemy } from "./modules/Enemy.js";
import { Grid } from "./modules/Grid.js";
import { Player } from "./modules/Player.js";
import { Shoot } from "./modules/Shoot.js";
import { Star } from "./modules/Star.js";


// GLOBALS
const app = document.querySelector('.app')
const modal = document.createElement('div')
modal.classList.add('modal')
modal.classList.add('hidden')
app.appendChild(modal)

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = innerWidth;
const CANVAS_HEIGHT = innerHeight - 100;
const STARS_NUMBER = 30;
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

// SETUP
let stars;
let player;
let enemys;
let shoots;
let frames;
let isGameOn;




function init() {
    enemys = []
    shoots = []
    frames = 0
    isGameOn = true
    stars = createStarBackground()
    player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT, ctx)
    document.body.addEventListener('keydown', (ev) => {
        player.update(ev)

    })
    animate()
}


function checkWin(){
    const div = document.createElement('div')
    div.classList.add('container')
    div.innerHTML = `
    <h1>You Won!</h1>
    <button class="btn start-game" onclick="init()">Play again!</button>
    `
    modal.classList.remove('hidden')
    modal.appendChild(div)
}

function createStarBackground() {
    const stars = [];
    for (let i = 0; i < STARS_NUMBER; i++) {
        stars.push(new Star(CANVAS_WIDTH, CANVAS_HEIGHT, ctx))
    }
    return stars
}


export function createShots(posX, posY) {
    shoots.push(new Shoot(ctx, posX + 25, posY))
    return shoots
}


function animate() {
    if (isGameOn) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)


        // Background Render
        stars.forEach(star => {
            star.update();
            star.draw();
        })


        // Player Render
        player.update()
        player.draw()


        // Shoots Render
        shoots.forEach((shoot, idx) => {
            shoot.update()
            shoot.draw()
            if (shoot.posY <= 0) {
                shoots.splice(idx, 1)
            }

            enemys.forEach((enemyGrid, i) => {
                enemyGrid.invaders.forEach((invader, j) => {
                    if (invader.posX + invader.width >= shoot.posX &&
                        invader.posX <= shoot.posX &&
                        invader.posY + invader.height >= shoot.posY &&
                        invader.posY <= shoot.posY
                    ) {
                        enemyGrid.invaders.splice(j, 1)
                        shoots.splice(idx, 1)
                    }
                })
                if (!enemyGrid.invaders.length) {
                    enemys.splice(i, 1)
                    if (!enemys.length) {
                        checkWin()
                        isGameOn = false
                    }
                }
            })

        })

        // Enemys Render
        if (frames % 500 === 0) {
            enemys.push(new Grid(ctx, CANVAS_WIDTH, CANVAS_HEIGHT))
        }
        enemys.forEach(grid => {
            grid.update()
            grid.invaders.forEach(invader => {
                invader.update(grid.speed)
                invader.draw()
                if (invader.posY + invader.height >= CANVAS_HEIGHT) {
                    isGameOn = false
                }

            })
        })

        frames++
        requestAnimationFrame(animate)
    }
}




// STARTGAME
window.onload = init()