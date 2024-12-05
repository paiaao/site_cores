function hexToHSL(hex) {
 
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
  
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; 
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h *= 60;
    }
  
    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
  }
  
  function hslToHex(h, s, l) {
    
    s /= 100;
    l /= 100;
  
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
  
    let r = 0, g = 0, b = 0;
  
    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
  
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
  
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }
  
  function generateCombinations() {
    const colorInput = document.getElementById('colorPicker').value;
    const hsl = hexToHSL(colorInput);
  
  
    const complementary = hslToHex((hsl[0] + 180) % 360, hsl[1], hsl[2]);
  

    const analogous1 = hslToHex((hsl[0] + 30) % 360, hsl[1], hsl[2]);
    const analogous2 = hslToHex((hsl[0] - 30 + 360) % 360, hsl[1], hsl[2]);

    const triadic1 = hslToHex((hsl[0] + 120) % 360, hsl[1], hsl[2]);
    const triadic2 = hslToHex((hsl[0] + 240) % 360, hsl[1], hsl[2]);
  

    document.getElementById('complementary').innerHTML = `
      <h3>Complementary</h3>
      <div class="color-box" style="background-color: ${complementary}"></div>
      <p>${complementary}</p>
    `;
    
    document.getElementById('analogous').innerHTML = `
      <h3>Analogous</h3>
      <div class="color-box" style="background-color: ${analogous1}"></div>
      <div class="color-box" style="background-color: ${analogous2}"></div>
      <p>${analogous1}, ${analogous2}</p>
    `;
    
    document.getElementById('triadic').innerHTML = `
      <h3>Triadic</h3>
      <div class="color-box" style="background-color: ${triadic1}"></div>
      <div class="color-box" style="background-color: ${triadic2}"></div>
      <p>${triadic1}, ${triadic2}</p>
    `;
  }
  
  document.getElementById('generateButton').addEventListener('click', generateCombinations);
  