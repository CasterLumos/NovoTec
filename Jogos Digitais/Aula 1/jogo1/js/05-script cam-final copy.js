let canvas,
    ctx,
    ALTURA,
    LARGURA,
    frames = 0;

let tileSize = 64;

let walls = [];

let player = {
    color: "#00f",
    x: tileSize + 2,
    y: tileSize + 2,
    width: 32 - 4,
    height: 32 - 4,
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

    let mazeWidth = maze[0].length * tileSize;
    let mazeHeight = maze.length * tileSize;

    for (const row in maze) {
        for (const column in maze[row]) {
            let tile = maze[row][column];
            if (tile === 1) {
                let wall = {
                    x: tileSize * column,
                    y: tileSize * row,
                    width: tileSize,
                    height: tileSize,
                };
                walls.push(wall);
            }
        }
    }

    let cam = {
        x: 0,
        y: 0,
        width: LARGURA,
        height: ALTURA,
        innerLeftBoundary: function () {
            return this.x + this.width * 0.25;
        },
        innerTopBoundary: function () {
            return this.y + this.height * 0.25;
        },
        innerRightBoundary: function () {
            return this.x + this.width * 0.75;
        },
        innerBottomBoundary: function () {
            return this.y + this.height * 0.75;
        },
    };

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

    function blockRectangle(objA, objB) {
        let distX = objA.x + objA.width / 2 - (objB.x + objB.width / 2);
        let distY = objA.y + objA.height / 2 - (objB.y + objB.height / 2);
        let sumWidth = (objA.width + objB.width) / 2;
        let sumHeight = (objA.height + objB.height) / 2;

        if (Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight) {
            console.log("colidiu");
            let overLapX = sumWidth - Math.abs(distX);
            let overLapY = sumHeight - Math.abs(distY);
            if (overLapX > overLapY) {
                objA.y = distY > 0 ? objA.y + overLapY : objA.y - overLapY;
            } else {
                objA.x = distX > 0 ? objA.x + overLapX : objA.x - overLapX;
            }
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

        for (const i in walls) {
            let blockWall = walls[i];
            blockRectangle(player, blockWall);
        }

        if (player.x < cam.innerLeftBoundary()) {
            cam.x = player.x - cam.width * 0.25;
        }
        if (player.y < cam.innerTopBoundary()) {
            cam.y = player.y - cam.height * 0.25;
        }
        if (player.x + player.width > cam.innerRightBoundary()) {
            cam.x = player.x + player.width - cam.width * 0.75;
        }
        if (player.y + player.height > cam.innerBottomBoundary()) {
            cam.y = player.y + player.height - cam.height * 0.75;
        }

        cam.x = Math.max(0, Math.min(mazeWidth - cam.width, cam.x));
        cam.y = Math.max(0, Math.min(mazeHeight - cam.height, cam.y));
    }

    function render() {
        ctx.clearRect(0, 0, LARGURA, ALTURA);
        ctx.save();
        ctx.translate(-cam.x, -cam.y);
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
