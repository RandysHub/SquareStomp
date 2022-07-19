// Canvas Stuff
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = innerHeight - 4 //Idk what's going on but subtracting 4 or more makes it so that the scrolling goes away
canvas.width = innerWidth;

const popup = document.querySelector('#gameStart')
const multi = document.querySelector('#multiPlayer')
const single = document.querySelector('#singlePlayer')
const pop = ele => {
    ele.classList.add('open-popup')
}
const unpop = ele => {

    ele.classList.remove('open-popup')
}
pop(popup);

class Player {
    constructor(xValue, yValue, color) {
        this.position = {
            x: xValue,
            y: yValue
        }
        this.velocity = {
            x: 0,
            y: 2
        }
        this.width = 50
        this.height = 50
        this.jumping = false;
        this.falling = false;
        this.color = color;
        this.hp = 3; //probably don't need this anymore
        this.score = 0
    }
    show() {
        this.height = 50
        this.width = 50;

        c.fillStyle = this.color
        // c.rect(this.position.x, this.position.y, this.width, this.height)
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.lineWidth = 3;
        c.strokeStyle = 'black'
        c.strokeRect(this.position.x, this.position.y, this.width, this.height);
        // c.clearRect(0, 0, canvas.width, canvas.height)

    }
    hide() {
        item1.width = 0;
        item1.height = 0;
    }

}

class Plat {
    constructor(xValue, yValue, w, h, color) {
        this.label = 'platform'
        this.position = {
            x: xValue,
            y: yValue
        }
        this.width = w
        this.height = h
        this.color = color
    }
    show() {
        // I tried to draw the backgrounds using canvas but I can't figure it out for now. 
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

//players
let itemLocations = {
    first: {
        x: 100,
        y: canvas.height - 200
    },
    second: {
        x: canvas.width - 100,
        y: canvas.height - 200
    },
    third: {
        x: canvas.width / 2,
        y: 400
    },
    fourth: {
        x: 100,
        y: 0
    },
    fifth: {
        x: canvas.width - 100,
        y: 200
    }
}

// Players

const user = new Player(20, 50, '#cc0066');
const user2 = new Player(canvas.width - 300, 100, '#66ffcc')

let reset = () => {

    user.position.x = 20;
    user.position.y = 50;
    user.score = 0


    user2.position.x = canvas.width - 300;
    user2.position.y = 100;
    user2.score = 0

    item1.position.x = itemLocations.third.x
    item1.position.y = itemLocations.third.y

}
//Scoreboard 
let p1ScoreDisplay = document.querySelector('#p1')
p1ScoreDisplay.innerHTML = 'Player 1 : ' + user.score

let p2ScoreDisplay = document.querySelector('#p2')
let p2Score = 0;
p2ScoreDisplay.innerHTML = 'Player 2: ' + p2Score
// Items

const item1 = new Player(itemLocations.third.x, itemLocations.third.y, '#ffcc00')

//platforms

const platBL = new Plat(0, 700, 550, 30, 'white')
const platBR = new Plat(canvas.width - 550, 700, 550, 30, 'white')
const platMid = new Plat(canvas.width / 2 - 325, 500, 650, 30, 'white')
const floor = new Plat(0, canvas.height - 30, canvas.width, 30, 'white')
const platTL = new Plat(0, 250, 550, 50, 'white')
const platTR = new Plat(canvas.width - 550, 250, 550, 30, 'white')

// Controllers
let controller1 = {
    left: false,
    right: false,
    up: false,
    action: false,

    keyChecker: (event) => {
        let keyState = (event.type === 'keydown') ? true : false;

        switch (event.keyCode) {

            case 87:
                controller1.up = keyState;
                break;
            case 65:
                controller1.left = keyState;
                break;
            case 68:
                controller1.right = keyState;
                break;
            case 69:
                controller1.action = keyState;
        }
    }
}
let controller2 = {
    left: false,
    right: false,
    up: false,

    keyChecker: (event) => {
        let keyState = (event.type === 'keydown') ? true : false;

        switch (event.keyCode) {

            case 73:
                controller2.up = keyState;
                break;
            case 74:
                controller2.left = keyState;
                break;
            case 76:
                controller2.right = keyState;
                break;
        }
    }
}
let controller3 = {
    left: false,
    right: false,
    up: false,

    keyChecker: (event) => {
        let keyState = (event.type === 'keydown') ? true : false;

        switch (event.keyCode) {

            case 1:
                controller1.up = keyState;
                break;
            case 2:
                controller1.left = keyState;
                break;
            case 3:
                controller1.right = keyState;
                break;
        }
    }
}

const collision = (player, plat) => {
    if (player.position.y + player.height > plat.position.y &&
        player.position.x < plat.position.x + plat.width &&
        player.position.x + player.width > plat.position.x &&
        player.position.y < plat.position.y + plat.height && player.falling === true
    ) {
        player.position.y = plat.position.y - player.height   //Idk why 28.6 but it works. I must've messed up somewhere
        player.velocity.y = -1;
        player.jumping = false;
        player.falling = false;
    }
}
// user.height = 80
const collisionAll = () => {
    collision(user, platBL)
    collision(user, platBR)
    collision(user, platMid)
    collision(user, floor)
    collision(user, platTL)
    collision(user, platTR)

    collision(user2, platBL)
    collision(user2, platBR)
    collision(user2, platMid)
    collision(user2, floor)
    collision(user2, platTL)
    collision(user2, platTR)

    collision(item1, platMid)
    collision(item1, floor)
    collision(item1, platBL)
    collision(item1, platBR)
    collision(item1, platTL)
    collision(item1, platTR)

}

const showAll = () => {


    platBL.show();
    platBR.show();
    platMid.show();
    floor.show();
    platTL.show();
    platTR.show();

    user2.show();
    user.show();
    item1.show();
}
const showSinglePlayer = () => {


    platBL.show();
    platBR.show();
    platMid.show();
    floor.show();
    platTL.show();
    platTR.show();

    user.show();
    item1.show();

    p2ScoreDisplay.style.display = 'none'
}

let num;
const randomizeItem = (num) => {
    num = Math.floor(Math.random() * 5)
    switch (num) {
        case 0:
            item1.position.x = itemLocations.first.x
            item1.position.y = itemLocations.first.y
            break;
        case 1:
            item1.position.x = itemLocations.second.x
            item1.position.y = itemLocations.second.y
            break;
        case 2:
            item1.position.x = itemLocations.third.x
            item1.position.y = itemLocations.third.y
            break;
        case 3:
            item1.position.x = itemLocations.fourth.x
            item1.position.y = itemLocations.fourth.y
            break;
        case 4:
            item1.position.x = itemLocations.fifth.x
            item1.position.y = itemLocations.fifth.y
            break;
        default:
            item1.position.x = itemLocations.third.x
            item1.position.y = itemLocations.third.y
            break;

    }
}
const playerMovement = (player, player2, item, controller) => {
    // Tried to make it so you can't jump when falling off of platforms :<
    if (player.velocity.y > 0) {
        player.falling = true;
    }
    if (player.falling) {
        player.jumping = true;
    }
    if (controller.up && player.jumping === false) {
        player.velocity.y -= 50;
        player.jumping = true;
    }
    if (controller.left) {
        player.velocity.x -= 1;
    }
    if (controller.right) {
        player.velocity.x += 1;

    }

    if (controller.action && controller.right) {
        player.velocity.x += 2
        player.velocity.y -= 1.3
    }
    if (controller.action && controller.left) {
        player.velocity.x -= 2
        player.velocity.y -= 1.3
    }
    //Gravity!!!
    player.velocity.y += 1.3;
    player.position.x += player.velocity.x;
    player.position.y += player.velocity.y;


    //Friction
    player.velocity.x *= 0.9;
    player.velocity.y *= 0.9;


    //loop to the other side when you hit the edge
    if (player.position.x < -player.width) {
        player.position.x = canvas.width;
    } else if (player.position.x > canvas.width) {
        player.position.x = -player.width;
    }

    //Bonking player
    if (player.position.y + player.height > player2.position.y &&
        player.position.x < player2.position.x + player2.width &&
        player.position.x + player.width > player2.position.x &&
        player.position.y < player2.position.y + player2.height &&
        player.falling === true &&
        player !== item1) {

        player.velocity.y -= 65

        // Tried to give them health and kill them after 3 hits. It's still being dumb with colission stuff.
        // player2.hp -= 1
        // console.log(player2.hp)
        // if (player2.hp === 0) {
        //     player2.position.y = 0
        //     player2.position.x = canvas.width / 2
        //     player2.hp = 0
        // }
    }

    // Bonking item
    if (player.position.y + player.height > item.position.y &&
        player.position.x < item.position.x + item.width &&
        player.position.x + player.width > item.position.x &&
        player.position.y < item.position.y + item.height &&
        player.falling === true) {

        player.velocity.y -= 65
        player.score += 1
        if (player === user) {
            p1ScoreDisplay.innerHTML = 'Player 1 : ' + user.score
        } else if (player === user2) {
            p2ScoreDisplay.innerHTML = 'Player 2 : ' + user2.score
        }
        let interval = setInterval((item.hide(), 100))

        randomizeItem(num);
        setTimeout(clearInterval(interval));
    }


}
let gameOver = () => {
    let gameOverPopup = document.querySelector('#gameOver')
    if (user.score === 1) {
        pop(gameOverPopup)
        // tried to make it so you can't move after the game ends
        // user.controller = controller3
        reset()
    } else if (user2.score === 10) {
        pop(gameOverPopup)
        reset()
        // user2.controller = controller3
    }
}
let game = () => {
    playerMovement(user, user2, item1, controller1)
    playerMovement(user2, user, item1, controller2)
    playerMovement(item1, user, user2, controller3)
    collisionAll();
}

const animate = () => {
    requestAnimationFrame(animate)
    //this is what's clearing the canvas everyframe.
    c.clearRect(0, 0, canvas.width, canvas.height)
    showAll();
    game();
    gameOver();
}
const animateSinglePlayer = () => {
    requestAnimationFrame(animateSinglePlayer)
    //this is what's clearing the canvas everyframe.
    c.clearRect(0, 0, canvas.width, canvas.height)
    showSinglePlayer();
    game();
    gameOver();
}


// Controller 1
addEventListener("keydown", controller1.keyChecker)
addEventListener('keyup', controller1.keyChecker)

// Controller 2
addEventListener("keydown", controller2.keyChecker)
addEventListener("keyup", controller2.keyChecker)

multi.addEventListener('click', function () {
    animate()
})
single.addEventListener('click', function () {
    animateSinglePlayer()
})
