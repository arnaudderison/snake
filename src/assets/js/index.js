const canvas = document.getElementById("Game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const BLOCK = 20;

//border sizes
let COLUMN = Math.floor(canvas.width / BLOCK);
let LINE = Math.floor(canvas.height / BLOCK);


class Snake {
    constructor(fill, stroke) {
        this.fill = fill;
        this.stroke = stroke;
    }

    snake = [
        { x: BLOCK * 2, y: BLOCK * 2 },
    ];

    velocity = {
        x: 0,
        y: 0
    }

    drawSnakePart(partSnake) {
        ctx.beginPath();

        ctx.fillStyle = this.fill;
        ctx.strokestyle = this.stroke;

        ctx.fillRect(partSnake.x, partSnake.y, BLOCK, BLOCK);
        ctx.strokeRect(partSnake.x, partSnake.y, BLOCK, BLOCK);

        ctx.closePath();
    }

    async move_snake() {
        const head = { x: this.snake[0].x + this.velocity.x, y: this.snake[0].y + this.velocity.y }
        this.snake.unshift(head);
        this.snake.pop();

        for(let i = 1; i < this.snake.length; i++){
            if((head.x - this.snake[i].x === 0) && (head.y - this.snake[i].y === 0)){
                Gameover();
                return false;
            }
        }
        return true
    }

    async drawSnake() {
        this.snake.forEach(await this.drawSnakePart.bind(this));
    }

    wallColision() {
        const isLeftWall = this.snake[0].x + 20 <= BLOCK;
        const isRightWall = this.snake[0].x + 20 >= BLOCK * COLUMN;
        const isTopWall = this.snake[0].y + 20 <= BLOCK;
        const isBottomWall = this.snake[0].y + 20 >= BLOCK * LINE;


        return isLeftWall || isRightWall || isTopWall || isBottomWall;
    }
}

class Appel {
    // nbpoint
    get point() {
        return Math.floor((Math.random() * 4) + 1)
    }
    //position
    position = {
        x: Math.floor(Math.random() * (COLUMN -2)) * BLOCK + BLOCK,
        y: Math.floor(Math.random() * (LINE -2)) * BLOCK + BLOCK
    }

    //draw
    draw(){
        ctx.beginPath();

        ctx.rect(this.position.x, this.position.y, BLOCK, BLOCK);
        ctx.fillStyle = "#00FF00";
        ctx.fill();

        ctx.closePath();
    }

    newPosition(){
        this.position.x = Math.floor(Math.random() * (COLUMN -2)) * BLOCK + BLOCK
        this.position.y = Math.floor(Math.random() * (LINE -2)) * BLOCK + BLOCK
    }

}


const createBorder = () => {
    //draw border
    let map = [];

    for (let i = 0; i < LINE; i++) {
        let elLine = [];
        for (let j = 0; j < COLUMN; j++) {
            if ((i === 0 || i === LINE - 1) || (j === 0 || j === COLUMN - 1)) elLine[j] = "-"
            else elLine[j] = "";
        }
        map.push(elLine);
    }

    map.forEach((line, key) => {
        for (i = 0; i < line.length; i++) {
            if (line[i] === "-" && key === line - 1) {
                ctx.beginPath();

                ctx.rect(i * BLOCK, key * BLOCK, BLOCK, BLOCK + (canvas.height % BLOCK));
                ctx.fillStyle = "#FF0000";
                ctx.fill();

                ctx.closePath();
            }
            if (line[i] === "-") {


                if (i === COLUMN - 1) {
                    ctx.beginPath();
                    ctx.rect(i * BLOCK, key * BLOCK, BLOCK + (canvas.width % BLOCK), BLOCK);
                    ctx.fillStyle = "#FF0000";
                    ctx.fill();
                    ctx.closePath();
                }
                if (key === LINE - 1) {
                    ctx.beginPath();
                    ctx.rect(i * BLOCK, key * BLOCK, BLOCK, BLOCK + (canvas.height % BLOCK));
                    ctx.fillStyle = "#FF0000";
                    ctx.fill();
                    ctx.closePath();
                }

                ctx.beginPath();
                ctx.rect(i * BLOCK, key * BLOCK, BLOCK, BLOCK);
                ctx.fillStyle = "#FF0000";
                ctx.fill();

                ctx.closePath();
            }
        }
    });

}

theSnake = new Snake("lightblue", "#000")
theApple = new Appel();

function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = theSnake.velocity.y === -20;
    const goingDown = theSnake.velocity.y === 20;
    const goingRight = theSnake.velocity.x === 20;
    const goingLeft = theSnake.velocity.x === -20;
    let isOk = true;

    if (keyPressed === LEFT_KEY && !goingRight && isOk) {
        isOk != isOk;
        theSnake.velocity.x = -20;
        theSnake.velocity.y = 0;
        isOk = true;
    }

    if (keyPressed === UP_KEY && !goingDown && isOk) {
        isOk != isOk;
        theSnake.velocity.x = 0;
        theSnake.velocity.y = -20;
        isOk = true;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft && isOk) {
        isOk != isOk;
        theSnake.velocity.x = 20;
        theSnake.velocity.y = 0;
        isOk = true;
    }

    if (keyPressed === DOWN_KEY && !goingUp && isOk) {
        isOk != isOk;
        theSnake.velocity.x = 0;
        theSnake.velocity.y = 20;
        isOk = true;
    }
}

function appelColision(){
    if(((theSnake.snake[0].x - theApple.position.x === 0) && (theSnake.snake[0].y - theApple.position.y === 0))){
        return true;
    }
    return false;
}

//event LISTENER
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    COLUMN = Math.floor(canvas.width / BLOCK);
    LINE = Math.floor(canvas.height / BLOCK);
    createBorder();
})
window.addEventListener('keydown', change_direction)

function Gameover(){
    theSnake.snake = [{ x: BLOCK * 2, y: BLOCK * 2 }]
    theSnake.velocity = {
        x: 0,
        y: 0
    }
    alert('perdu')
}

function main() {
    if (theSnake.wallColision()) Gameover();
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createBorder()
        theApple.draw()
        if(appelColision()){
            let point = theApple.point;
            console.log(point)
            for(let i =0; i < point; i++){
                const head = { x: theSnake.snake[0].x + theSnake.velocity.x, y: theSnake.snake[0].y + theSnake.velocity.y }
                theSnake.snake.unshift(head);
            }
            theApple.newPosition()
        }
        theSnake.move_snake();  
        theSnake.drawSnake();
        main();
    }, 50)

}
main();