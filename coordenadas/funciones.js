const canvas = document.getElementById('plano');
const ctx = canvas.getContext('2d');
const escala = 50;
const maxCoord = 5;
const maxGrid = 10;
let usarCuadrantes = false;
let origen;
let objeto = { x: 3, y: 2 };

function actualizarOrigen() {
  origen = usarCuadrantes
    ? { x: canvas.width / 2, y: canvas.height / 2 }
    : { x: 50, y: canvas.height - 50 };
}

function limpiar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarGrilla() {
  ctx.beginPath();
  ctx.strokeStyle = '#ccc'; // color claro para grilla
  ctx.lineWidth = 0.5;

  for (let i = -maxCoord; i <= maxGrid; i++) {
    if (!usarCuadrantes && i < 0) continue;

    // líneas verticales
    ctx.moveTo(origen.x + i * escala, 0);
    ctx.lineTo(origen.x + i * escala, canvas.height);

    // líneas horizontales
    ctx.moveTo(0, origen.y - i * escala);
    ctx.lineTo(canvas.width, origen.y - i * escala);
  }

  ctx.stroke();
}

function dibujarEjes() {
  ctx.beginPath();
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 2;

  ctx.moveTo(0, origen.y);
  ctx.lineTo(canvas.width, origen.y);
  ctx.moveTo(origen.x, 0);
  ctx.lineTo(origen.x, canvas.height);
  ctx.stroke();

  ctx.fillStyle = '#222';
  for (let i = -maxCoord; i <= maxCoord; i++) {
    if (!usarCuadrantes && i < 0) continue;
    if (i === 0) continue;
    ctx.fillRect(origen.x + i * escala - 1, origen.y - 3, 2, 6);
    ctx.fillRect(origen.x - 3, origen.y - i * escala - 1, 6, 2);
  }
}

function dibujarObjeto() {
  const px = origen.x + objeto.x * escala;
  const py = origen.y - objeto.y * escala;

  ctx.strokeStyle = '#888';
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(px, origen.y);
  ctx.moveTo(px, py);
  ctx.lineTo(origen.x, py);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#e63946';
  ctx.beginPath();
  ctx.moveTo(px, py - 10);
  ctx.lineTo(px - 10, py + 10);
  ctx.lineTo(px + 10, py + 10);
  ctx.closePath();
  ctx.fill();
}

function verificar() {
  const x = parseInt(document.getElementById('x').value);
  const y = parseInt(document.getElementById('y').value);
  const mensaje = document.getElementById('mensaje');

  if (x === objeto.x && y === objeto.y) {
    mensaje.textContent = '¡Muy bien! 🎉';
    mensaje.style.color = 'green';
  } else {
    mensaje.textContent = 'Intentalo de nuevo...';
    mensaje.style.color = 'red';
  }
}

function nuevoEnsayo() {
  actualizarOrigen();
  limpiar();
  const rango = usarCuadrantes ? maxCoord * 2 + 1 : maxCoord + 1;
  objeto.x = usarCuadrantes
    ? Math.floor(Math.random() * rango) - maxCoord
    : Math.floor(Math.random() * maxCoord + 1);
  objeto.y = usarCuadrantes
    ? Math.floor(Math.random() * rango) - maxCoord
    : Math.floor(Math.random() * maxCoord + 1);
  document.getElementById('mensaje').textContent = '';
  document.getElementById('x').value = '';
  document.getElementById('y').value = '';
  dibujarEjes();
  dibujarGrilla();
  dibujarObjeto();
}

function toggleCuadrantes() {
  usarCuadrantes = !usarCuadrantes;
  const modoBtn = document.getElementById('modoBtn');
  modoBtn.textContent = usarCuadrantes ? 'Modo solo positivos' : 'Modo avanzado';
  nuevoEnsayo();
}

toggleCuadrantes();
