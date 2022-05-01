let canvas,
  ctx,
  ALTURA,
  LARGURA,
  frames = 0;
let tileSize = 32;
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

  function update() {}

  function render() {
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
  }

  function loop(params) {
    update();
    render();
    requestAnimationFrame(loop, document.querySelector("canvas"));
  }
  loop();
}

main();
