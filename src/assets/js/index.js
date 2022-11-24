const canvas = document.getElementById("Game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const BLOCK = 20;

const createBorder = () => {
    //border size
    const COLUMN = Math.floor(canvas.width / BLOCK);
    const LINE = Math.floor(canvas.height / BLOCK);

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
                ctx.beginPath();

                if (i === COLUMN - 1) {

                    ctx.rect(i * BLOCK, key * BLOCK, BLOCK + (canvas.width % BLOCK), BLOCK);
                    ctx.fillStyle = "#FF0000";
                    ctx.fill();
                }
                if (key === LINE - 1) {
                    ctx.rect(i * BLOCK, key * BLOCK, BLOCK, BLOCK + (canvas.height % BLOCK));
                    ctx.fillStyle = "#FF0000";
                    ctx.fill();
                }


                ctx.rect(i * BLOCK, key * BLOCK, BLOCK, BLOCK);
                ctx.fillStyle = "#FF0000";
                ctx.fill();

                ctx.closePath();
            }
        }
    });

}




//event LISTENER
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createBorder();
})
createBorder()