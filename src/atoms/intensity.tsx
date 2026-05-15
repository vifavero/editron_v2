// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// Este arquivo contem todas as funções para realizar as trasformações de intensidades
export function applyIntensity(imageData: ImageData, state: any) {
  const processed = new ImageData(imageData.width, imageData.height);

  const clamp = (value: number) =>
    Math.min(255, Math.max(0, Math.round(value)));

  for (let i = 0; i < imageData.data.length; i += 4) {
    let r = imageData.data[i];
    let g = imageData.data[i + 1];
    let b = imageData.data[i + 2];

    const temp = state.temp || 0;
    const tempReal = temp * 6;

    const factorR = r / 255;
    const factorB = b / 255;

    r += tempReal * factorR;
    b -= tempReal * 0.7 * (1 - factorB);
    // Inversa
    if (state.useInverse) {
      r = 255 - r + (state.light || 0);
      g = 255 - g + (state.light || 0);
      b = 255 - b + (state.light || 0);
    }

    // Logaritmo
    if (state.useLog) {
      const c = 255 / Math.log(255 + 1);
      r = c * Math.log(r + 1);
      g = c * Math.log(g + 1);
      b = c * Math.log(b + 1);
    }

    // Gamma
    if (state.gamma > 0) {
      r = 255 * Math.pow(r / 255, state.gamma);
      g = 255 * Math.pow(g / 255, state.gamma);
      b = 255 * Math.pow(b / 255, state.gamma);
    }

    // Contraste
    const {
      contrastA: a,
      contrastB: bContrast,
      contrastC: cContrast,
      contrastD: dContrast,
    } = state;
    const contrastSafe = (light: number) =>
      bContrast === a
        ? 0
        : (light - a) * ((dContrast - cContrast) / (bContrast - a)) + cContrast;

    r = contrastSafe(r);
    g = contrastSafe(g);
    b = contrastSafe(b);

    processed.data[i] = clamp(r);
    processed.data[i + 1] = clamp(g);
    processed.data[i + 2] = clamp(b);
    processed.data[i + 3] = imageData.data[i + 3];
  }

  return processed;
}
