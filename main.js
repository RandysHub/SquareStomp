const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = innerHeight;
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
        this.color = color
    }
    show() {
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)
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
const user = new Player(10, 10, 'orange');
const user2 = new Player(canvas.width - 10, canvas.height - 10, 'blue')
//platforms
const platBL = new Plat(0, 700, 550, 30, 'white')
const platBR = new Plat(canvas.width - 550, 700, 550, 30, 'white')
const platMid = new Plat(canvas.width / 2 - 325, 500, 650, 30, 'white')
const floor = new Plat(0, canvas.height, canvas.width, 30, 'blue')
const platTL = new Plat(0, 250, 550, 30, 'white')
const platTR = new Plat(canvas.width - 550, 250, 550, 30, 'white')

let controller = {
    left: false,
    right: false,
    up: false,

    keyChecker: (event) => {
        let keyState = (event.type === 'keydown') ? true : false;

        switch (event.keyCode) {

            case 87:
                controller.up = keyState;
                break;
            case 65:
                controller.left = keyState;
                break;
            case 68:
                controller.right = keyState;
                break;
        }
    }
}
const collision = (player, plat) => {
    if (player.position.y + player.height > plat.position.y &&
        player.position.x < plat.position.x + plat.width &&
        player.position.x + player.width > plat.position.x &&
        player.position.y < plat.position.y + plat.height
    ) {
        player.position.y = plat.position.y - plat.height - player.height + 29.6  //Idk why 28.6 but it works. I must've messed up somewhere
        player.velocity.y = 0;
        player.jumping = false;
    }
}
let game = (player) => {
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

    //plat 1 collision
    collision(user, platBL)
    collision(user, platBR)
    collision(user, platMid)
    collision(user, floor)
    collision(user, platTL)
    collision(user, platTR)


    //floor
    // if (player.position.y > canvas.height - 50 - player.height) {
    //     player.velocity.y = 0;
    //     player.jumping = false;
    //     player.position.y = canvas.height - 50 - player.height;
    // }

    //loop to the other side when you hit the edge
    if (player.position.x < -player.width) {
        player.position.x = canvas.width;
    } else if (player.position.x > canvas.width) {
        player.position.x = -player.width;
    }
}




user.show();
platBL.show();
platBR.show();
// cpu.show();

const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    user.show();
    platBL.show()
    platBR.show();
    platMid.show();
    floor.show();
    platTL.show();
    platTR.show();

    //if the bottom of the square is above the platform

    // cpu.show();
    game(user);
}

animate();





addEventListener("keydown", controller.keyChecker)
addEventListener('keyup', controller.keyChecker)
// addEventListener('keydown', (e) => console.log(e.keyCode))