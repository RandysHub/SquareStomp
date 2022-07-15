const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = innerHeight - 4 //Idk what's going on but subtracting 4 or more makes it so that the scrolling goes away
canvas.width = innerWidth;

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
        this.color = color
    }
    show() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
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
        c.fillStyle = this.color
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
    }
}
// const randomizeItem = () => {
//     let num = Math.random() * 3
//     let x;
//     let y;

//     switch (num) {
//         case 0:
//             x = 
//     }
// }
const user = new Player(20, 50, 'orange');
const user2 = new Player(canvas.width - 100, 100, 'blue')
const item1 = new Player(itemLocations.third.x, itemLocations.third.y, 'black')
//platforms
const platBL = new Plat(0, 700, 550, 30, 'white')
const platBR = new Plat(canvas.width - 550, 700, 550, 30, 'white')
const platMid = new Plat(canvas.width / 2 - 325, 500, 650, 30, 'white')
const floor = new Plat(0, canvas.height - 30, canvas.width, 30, 'white')
const platTL = new Plat(0, 250, 550, 30, 'white')
const platTR = new Plat(canvas.width - 550, 250, 550, 30, 'white')

let controller1 = {
    left: false,
    right: false,
    up: false,

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
        player.position.y = plat.position.y - player.height    //Idk why 28.6 but it works. I must've messed up somewhere
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
}
const showAll = () => {
    user2.show();
    user.show();

    item1.show();

    platBL.show();
    platBR.show();
    platMid.show();
    floor.show();
    platTL.show();
    platTR.show();

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
        player.falling === true) {



        player.velocity.y -= 65

        //tried to make jumping on them reset
        // player.height += 50
        // player2.position.x = canvas.width - 100
        // player2.position.y = 100

        //add scoring

    }
    // Bonking item
    if (player.position.y + player.height > item.position.y &&
        player.position.x < item.position.x + item.width &&
        player.position.x + player.width > item.position.x &&
        player.position.y < item.position.y + item.height &&
        player.falling === true) {

        player.velocity.y -= 65

        //tried to make jumping on them reset
        // player.height += 50
        // player2.position.x = canvas.width - 100
        // player2.position.y = 100

        //add scoring

    }

}
const itemPhysics = (item) => {
    item.position.y += item.velocity.y
    item.velocity.y += 1.3

}
let game = () => {
    playerMovement(user, user2, item1, controller1)
    playerMovement(user2, user, item1, controller2)
    //plat 1 collision
    collisionAll();

}

const animate = () => {
    requestAnimationFrame(animate)
    //this is what's clearing the canvas everyframe.
    c.clearRect(0, 0, canvas.width, canvas.height)
    showAll();

    game();
}
animate();





addEventListener("keydown", controller1.keyChecker)
addEventListener('keyup', controller1.keyChecker)

addEventListener("keydown", controller2.keyChecker)
addEventListener("keyup", controller2.keyChecker)