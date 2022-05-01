let canvas,
    ctx,
    ALTURA,
    LARGURA,
    frames = 0;

let tileSize = 32;

let player = {
    color: "#00f",
    x: tileSize + 2,
    y: tileSize + 2,
    width: tileSize - 4,
    height: tileSize - 4,
    speed: 2,
};

let LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40;

let mvLeft = false;
let mvUp = false;
let mvRight = false;
let mvDown = false;

function main() {
    ALTURA = window.innerHeight;
    LARGURA = window.innerWidth;
    if (LARGURA >= 500) {
        LARGURA = 448;
        ALTURA = 352;
    }
    canvas = document.createElement("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000";
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    let maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);

    function keydownHandler(e) {
        let key = e.keyCode;
        switch (key) {
            case LEFT:
                mvLeft = true;
                break;
            case RIGHT:
                mvRight = true;
                break;
            case UP:
                mvUp = true;
                break;
            case DOWN:
                mvDown = true;
                break;
            default:
                break;
        }
    }
    function keyupHandler(e) {
        let key = e.keyCode;
        switch (key) {
            case LEFT:
                mvLeft = false;
                break;
            case RIGHT:
                mvRight = false;
                break;
            case UP:
                mvUp = false;
                break;
            case DOWN:
                mvDown = false;
                break;
            default:
                break;
        }
    }

    function update() {
        if (mvLeft && !mvRight) {
            player.x -= player.speed;
        }
        if (!mvLeft && mvRight) {
            player.x += player.speed;
        }
        if (mvUp && !mvDown) {
            player.y -= player.speed;
        }
        if (!mvUp && mvDown) {
            player.y += player.speed;
        }
    }

    function render() {
        ctx.clearRect(0, 0, LARGURA, ALTURA);
        ctx.save();
        for (const row in maze) {
            for (const column in maze[row]) {
                let tile = maze[row][column];
                if (tile === 1) {
                    let x = column * tileSize;
                    let y = row * tileSize;
                    ctx.fillRect(x, y, tileSize, tileSize);
                }
            }
        }
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.restore();
    }

    function loop(params) {
        update();
        render();
        requestAnimationFrame(loop, document.querySelector("canvas"));
    }
    loop();
}

main();
