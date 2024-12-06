const canvas = document.getElementById('color-wheel');
const ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 300;

let isFixed = false; // Controla se o círculo está fixo
let mouseX = 0;
let mouseY = 0;

// Função para desenhar a roda de cores
function drawColorWheel() {
  const radius = canvas.width / 2;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  for (let angle = 0; angle < 360; angle++) {
    const startAngle = (angle * Math.PI) / 180;
    const endAngle = ((angle + 1) * Math.PI) / 180;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = `hsl(${angle}, 100%, 50%)`;
    ctx.fill();
  }
}

// Desenha o círculo indicador
function drawHighlight(x, y, hexColor) {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fillStyle = hexColor; // Preenche com a cor ampliada
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// Evento de movimento do mouse
canvas.addEventListener('mousemove', (event) => {
  if (isFixed) return; // Se o círculo estiver fixo, não atualiza a posição
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width; // Proporção horizontal
  const scaleY = canvas.height / rect.height; // Proporção vertical
  mouseX = (event.clientX - rect.left) * scaleX;
  mouseY = (event.clientY - rect.top) * scaleY;

  // Limite à área da roda de cores
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const distance = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);
  if (distance > canvas.width / 2) {
    mouseX = centerX + ((mouseX - centerX) * (canvas.width / 2)) / distance;
    mouseY = centerY + ((mouseY - centerY) * (canvas.height / 2)) / distance;
  }

  draw();
});

// Evento de clique
canvas.addEventListener('click', () => {
  isFixed = !isFixed; // Alterna entre fixo e móvel
});

function draw() {
  // Redesenha a roda de cores
  drawColorWheel();

  // Captura a cor no ponto selecionado
  const imageData = ctx.getImageData(mouseX, mouseY, 1, 1).data;
  const [r, g, b] = imageData;
  const hexColor = rgbToHex(r, g, b);

  // Desenha o círculo com zoom dentro
  drawHighlight(mouseX, mouseY, hexColor);

  // Atualiza o texto com a cor selecionada
  const colorInfo = document.getElementById('color-info');
  colorInfo.textContent = `Cor: ${hexColor}`;
}

// Função para converter RGB para hexadecimal
function rgbToHex(r, g, b) {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

draw();