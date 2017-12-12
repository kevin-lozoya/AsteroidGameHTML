const layoutX = 900;
const layoutY = 600;
let score = 0;
let numAsteroides = 10
let endGame = false

function random(base, top) {
    return Math.round(Math.random() * top + base)
}

class Asteroid {
    constructor(id, vX = random(-10, 20, true), vY = random(-10, 20)) {
        this.id = `ast-${id}`
        this.vX = vX
        this.vY = vY
        this.createPos()
    }
    
    createPos() {
        const place = random(0, 3)
        let x;
        switch (place) {
            case 0:
                this.posX = random(0, layoutX)
                this.posY = 0
                break;
            case 1:
                this.posX = 0
                this.posY = random(0, layoutY - 50)
                break;
            case 2:
                this.posX = layoutX - 50
                this.posY = random(0, layoutY - 50)
                break;
            case 3:
                this.posX = random(0, layout)
                this.posY = layoutY - 50
                break;
        }
    }

    create() {
        const img = document.createElement('img')
        img.setAttribute('id', this.id)
        img.setAttribute('style', `left: ${this.posX}px; top: ${this.posY}px`)
        img.setAttribute('class', 'asteroid')
        img.setAttribute('src', 'img/asteroid.gif')
        img.setAttribute('alt', 'ast')
        
        const layout = document.getElementById('layout')
        layout.appendChild(img)
    }

    destroyHTML(){
        const el = document.getElementById(this.id)
        const layout = document.getElementById('layout')
        layout.removeChild(el)
    }

    html() {
        return `<img id="${this.id}" style="left: ${this.posX}px; top: ${this.posY}px" class="asteroid" src="img/asteroid.gif" alt="ast" />`
    }

    move() {
        this.posX += this.vX
        this.posY += this.vY
        if (this.posX > layoutX) {
            this.posX = -100
        }
        else if (this.posX < -100) {
            this.posX = layoutX
        }

        if (this.posY > layoutY) {
            this.posY = -100
        }
        else if (this.posY < -100) {
            this.posY = layoutY
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
        this.direction = 0
    }

    html() {
        return `<img id="${this.id}" class="ship" style="left: ${this.posX}px; top: ${this.posY}px; transform: rotate(${this.direction}rad)" src="img/ship.png" alt="ship"/>`
    } 

    collision(asteroid) {
        if (asteroid.posX < this.posX + 80 &&
            asteroid.posX + 80 > this.posX &&
            asteroid.posY < this.posY + 80 &&
            asteroid.posY + 75 > this.posY) {
                return true
        }
        return false
    }

    create() {
        const img = document.createElement('img')
        img.setAttribute('id', this.id)
        img.setAttribute('style', `left: ${this.posX}px; top: ${this.posY}px; transform: rotate(${this.direction}rad);`)
        img.setAttribute('class', 'ship')
        img.setAttribute('src', 'img/ship.png')
        img.setAttribute('alt', 'ship')

        const layout = document.getElementById('layout')
        layout.appendChild(img)
        this.rotate()
    }

    shoot(target) {
        if (target.className == 'asteroid') {
            asts = asts.filter((el, index) => {
                if (el.id == target.id){
                    el.destroyHTML()
                    return false
                }
                return true
            })
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
        const el = document.getElementById('ship')
        rotateShip(el)
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

    layout.innerHTML = c + ship.html()

    ship.rotate()

}

upScore()

function createAsteroids(num) {
    let asteroids = []

    for (var i = 0; i < num; i++) {
        let ast = new Asteroid(i)
        asteroids.push(ast)
        ast.create()
    }

    return asteroids
}



let asts = createAsteroids(numAsteroides)
const ship = new Ship()
ship.create()

const a = setInterval(function(){
    for (const ast of asts) {
        ast.move()
        if (ship.collision(ast)){
            const as = document.getElementById(ast.id)
            as.style.border = '1px solid red'
            const s = document.getElementById(ship.id)
            s.style.border = '1px solid red'
            document.removeEventListener('keypress', shipMove)
            document.removeEventListener('click', shipShoot)
            const div = document.getElementById('layout')
            div.innerHTML += '<img class="gameover" src="img/gameover.png" />'
            clearInterval(b)
            clearInterval(a)
            break
        }
    }
}, 50)

const b = setInterval(() => {
    if (asts.length < 5){
        for (var i = 0; i < 4; i++) {
            asts.push(new Asteroid(++numAsteroides))   
        }
    }
    else 
        asts.push(new Asteroid(++numAsteroides))
    draw(asts)
}, 1000)

const shipMove = (event) => ship.move(event.keyCode)
document.addEventListener("keypress", shipMove)

const shipShoot = (event) => ship.shoot(event.target)
document.addEventListener('click', shipShoot)
