import { Grid } from "./modules/Grid.js";
import { Player } from "./modules/Player.js";
import { Shoot } from "./modules/Shoot.js";
import { Star } from "./modules/Star.js";
import { utilService } from "./utils.js";


// GLOBALS
const modal = document.querySelector('.modal')
modal.classList.add('hidden')

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
let randomSpwanTime = utilService.getRandomInt(300, 1000)

const KEYS = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    },
}


function init() {
    modal.classList.add('hidden')
    enemys = []
    shoots = []
    frames = 0
    isGameOn = true
    stars = createStarBackground()
    player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT, ctx)
    document.body.addEventListener('keydown', checkMovment)
    document.body.addEventListener('keyup', checkStopMovment)
    document.body.addEventListener('touchstart', touchStartCheckingMovment)
    document.body.addEventListener('touchend', touchEndCheckingMovment)
    animate()
}

function checkStopMovment({ key }) {
    switch (key) {
        case 'a':
            KEYS.a.pressed = false
            break;

        case 'd':
            KEYS.d.pressed = false
            break;

        case ' ':
            KEYS.space.pressed = false
            break;

        default:
            break;
    }
}


function checkMovment({ key }) {
    switch (key) {
        case "a":
            KEYS.a.pressed = true
            break;
        case "d":
            KEYS.d.pressed = true
            break;
        case " ":
            KEYS.space.pressed = true
            break;

        default:
            break;
    }
}

function touchStartCheckingMovment({changedTouches}) {
    if (changedTouches[0].clientX < player.posX) {
        KEYS.a.pressed = true
    }
    if (changedTouches[0].clientX > player.posX) {
        KEYS.d.pressed = true
    }
}

function touchEndCheckingMovment({type}) {
    if (type === 'touchend') {
        KEYS.a.pressed = false
        KEYS.d.pressed = false
    }
}

function checkWin(state) {
    document.body.removeEventListener('keydown', checkMovment)
    document.body.removeEventListener('keyup', checkStopMovment)
    modal.classList.remove('hidden')
    document.querySelector('.start-game').addEventListener('click', init)
    switch (state) {
        case 'lose':
            document.querySelector('.title').innerText = 'YOU LOSE!'
            break;
            case 'win':
            document.querySelector('.title').innerText = 'YOU WON!'
            break;

        default:
            break;
    }

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
        player.update(KEYS)

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
                        checkWin('win')
                        isGameOn = false
                    }
                }
            })

        })

        // Enemys Render
        if (frames % randomSpwanTime === 0) {
            randomSpwanTime = utilService.getRandomInt(300, 1000)
            enemys.push(new Grid(ctx, CANVAS_WIDTH, CANVAS_HEIGHT))
        }
        enemys.forEach(grid => {
            grid.update()
            grid.invaders.forEach(invader => {
                invader.update(grid.speed)
                invader.draw()
                if (invader.posY + invader.height >= CANVAS_HEIGHT) {
                    isGameOn = false
                    checkWin('lose')
                }

            })
        })
        frames++
        requestAnimationFrame(animate)
    }
}




// STARTGAME
window.onload = init()