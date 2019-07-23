c = document.getElementById("c1");
c.width = window.innerWidth;
c.height = window.innerHeight;

ctx = c.getContext("2d");
img = new Image();
img.onload = go;
img.src = "pizza.png";

state = [];

COUNT = (window.innerWidth * window.innerHeight) / 300;
SIZE = 25;
console.log(SIZE, COUNT);

function rdo(low, high) {
  return Math.random() * (high - low) + low;
}

for (var i = 0; i < COUNT; i++) {
  state.push({
    x: Math.random() * -window.innerWidth,
    y: Math.random() * -window.innerHeight,
    vx: rdo(-0.2, 0.2),
    vy: rdo(-0.2, 0.2),
    ax: rdo(-0.0001, 0.0001),
    ay: rdo(-0.0001, 0.0001),
    jx: rdo(-0.00001, 0.00001),
    jy: rdo(-0.00001, 0.00001),
    r: rdo(0, 2 * Math.PI)
  });
}

function go() {
  window.requestAnimationFrame(function() {
    update();
    draw();
    go();
  });
}

function update() {
  for (var i = 0; i < state.length; i++) {
    pizza = state[i];
    state[i].x = pizza.x + pizza.vx;
    state[i].y = pizza.y + pizza.vy;
    state[i].vx = pizza.vx + pizza.ax;
    state[i].vy = pizza.vy + pizza.ay;
    state[i].ax = pizza.ax + pizza.jx;
    state[i].ay = pizza.ay + pizza.jy;
  }
}

function draw() {
  for (var i = 0; i < state.length; i++) {
    pizza = state[i];
    x = pizza.x % window.innerWidth;
    y = pizza.y % window.innerHeight;
    x = (x + window.innerWidth) % window.innerWidth;
    y = (y + window.innerHeight) % window.innerHeight;
    ctx.drawImage(img, x - SIZE / 2, y - SIZE / 2, SIZE, SIZE);
  }
}
