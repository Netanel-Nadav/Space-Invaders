export const utilService = {
    getRandomInt
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * max + min)
}