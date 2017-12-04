const layoutX = 900;
const layoutY = 600;
let score = 0;
let numAsteroides = 10

function random(base, top) {
    return Math.floor(Math.random() * top + base)
}

class Asteroid {
    constructor(id, vX = random(-7, 14, true), vY = random(-7, 14, true)) {
        this.id = `ast-${id}`
        this.vX = vX
        this.vY = vY
        this.posX = random(1, layoutX - 1)
        this.posY = random(1, layoutY - 1)
    }

    html() {
        return `<img id="${this.id}" style="left: ${this.posX}px; top: ${this.posY}px" class="asteroid" src="img/asteroid.gif" alt="ast" />`
    }

    move() {
        this.posX += this.vX
        this.posY += this.vY
        if (this.posX > layoutX) {
            this.posX = 0
        }
        else if (this.posX < 0) {
            this.posX = layoutX
        }

        if (this.posY > layoutY) {
            this.posY = 1
        }
        else if (this.posY < 0) {
            this.posY = layoutY - 1
        }

        const b = document.getElementById(this.id)
        b.style.left = `${this.posX}px`
        b.style.top = `${this.posY}px`
    }
}


class Ship {
    constructor() {
        this.v = 5;
        this.id = "ship"
        this.posX = 400
        this.posY = 225
        this.html = `<img id="${this.id}" class="ship" style="left: ${this.posX}px; top: ${this.posY}px;" src="img/ship.png" alt="ship"/>`
    }

    shoot(event) {
        const target = event.target
        if (target.className == 'asteroid') {
            asts = asts.filter((el, index) => (el.id != target.id))
            draw(asts)
            upScore(1)
        }
    }

    move(tecla) {
        const s = document.getElementById(this.id)
        const KEY_LEFT = 37
        const KEY_UP = 38
        const KEY_RIGHT = 39
        const KEY_DOWN = 40

        switch (tecla) {
            case KEY_RIGHT:
                this.posX += this.v
                break
            case KEY_UP:
                this.posY -= this.v
                break;
            case KEY_LEFT:
                this.posX -= this.v
                break
            case KEY_DOWN:
                this.posY += this.v
                break
            default:
                break
        }

        s.style.left = `${this.posX}px`
        s.style.top = `${this.posY}px`
    }

    rotate() {
        const elem = document.getElementById('ship')
        rotateShip(elem)
    }
}

function upScore(p = 0) {
    const divScore = document.getElementById('score')
    score += p
    divScore.innerHTML = `SCORE: ${score}`
}

function draw(a) {
    const layout = document.getElementById('layout')
    let c = ''
    for (const ast of a) {
        c += ast.html()
    }

    layout.innerHTML = c + ship.html

    ship.rotate()

}

upScore()

let ship = new Ship()


function createAsteroids(num) {
    let asteroids = []

    for (var i = 0; i < num; i++) {
        let ast = new Asteroid(i)
        asteroids.push(ast)
    }

    return asteroids
}



let asts = createAsteroids(numAsteroides)

draw(asts)

const a = setInterval(function(){
    for (const ast of asts) {
        ast.move()
    }
}, 50)

const b = setInterval(() => {
    asts.push(new Asteroid(++numAsteroides))
    draw(asts)
}, 1000)

document.addEventListener("keypress", (event) => ship.move(event.keyCode))

document.addEventListener('click', (event) => ship.shoot(event))
