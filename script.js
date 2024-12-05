const canvas = document.getElementById('color-wheel');
const ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 300;

//desenha a roda de cores
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

// evento de hover
canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width; // Proporção horizontal
  const scaleY = canvas.height / rect.height; // Proporção vertical
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;


  const imageData = ctx.getImageData(x, y, 1, 1).data;
  const [r, g, b] = imageData;
  const hexColor = rgbToHex(r, g, b);

  const colorInfo = document.getElementById('color-info');
  colorInfo.textContent = `Cor: ${hexColor}`;
});

// Função para converter RGB para hexadecimal
function rgbToHex(r, g, b) {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

drawColorWheel();
