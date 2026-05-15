// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// este arquivo contem a função que desenha a parte da imagem que foi cortada

export function cropImage(
  source: HTMLImageElement,
  rect: { x: number; y: number; width: number; height: number },
): HTMLCanvasElement | null {
  if (!source || rect.width === 0 || rect.height === 0) return null;

  const canvas = document.createElement("canvas");
  canvas.width = rect.width;
  canvas.height = rect.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.drawImage(
    source, // imagem original
    rect.x, // ponto inicial X da imagem original
    rect.y, // ponto inicial Y da imagem original
    rect.width, // largura da área a ser cortada
    rect.height, // altura da área a ser cortada
    0, // ponto X no canvas destino
    0, // ponto Y no canvas destino
    rect.width, // largura no canvas destino
    rect.height, // altura no canvas destino
  );

  return canvas;
}
