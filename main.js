const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = innerHeight;
canvas.width = innerWidth;
canvas.margin = 0;

class Player {
    constructor(xValue, yValue, color) {
        this.position = {
            x: xValue,
            y: yValue
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 100
        this.height = 100
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

let game = (player) => {
    if (controller.up && player.jumping === false) {
        player.velocity.y -= 40;
        player.jumping = true;
    }
    if (controller.left) {
        player.velocity.x -= 1.5
    }
    if (controller.right) {
        player.velocity.x += 1.5
    }

    //Gravity!!!
    player.velocity.y += 1.3;
    player.position.x += player.velocity.x;
    player.position.y += player.velocity.y;
    //Friction
    player.velocity.x *= 0.9;
    player.velocity.y *= 0.9;


    if (player.position.y > canvas.height - 300 - player.height) {
        player.velocity.y = 0;
        player.jumping = false;
        player.position.y = canvas.height - 300 - player.height;
    }
    //loop to the other side when you hit the edge
    if (player.position.x < -player.width) {
        player.position.x = canvas.width;
    } else if (player.position.x > canvas.width) {
        player.position.x = -player.width;
    }
}



const user = new Player(500, 500, 'orange');
// const cpu = new Player(700, 500, 'blue')
user.show();
// cpu.show();

const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    user.show();
    // cpu.show();
    game(user);
}
c.fillStyle = 'blue'
c.fillRect(300, 300, 100, 100)
animate();





addEventListener("keydown", controller.keyChecker)
addEventListener('keyup', controller.keyChecker)
addEventListener('keydown', (e) => console.log(e.keyCode))