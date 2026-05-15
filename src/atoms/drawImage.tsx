// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// este arquivo contem todo a logica para o desenho da imagem

import type { ImageInfo } from "./contextCrop";
import {
  getLargestInscribedRect,
  multiplyMatrices,
  Rotate,
  Scale,
  Translation,
} from "./transformations";

export function drawImageOnCanvas(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  widthContainer: number,
  heightContainer: number,
  rotation: number,
  scaleX: number,
  scaleY: number,
  setImageInfo: (info: ImageInfo) => void,
) {
  if (!img.width || !img.height) return { renderWidth: 0, renderHeight: 0 };

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, widthContainer, heightContainer);

  // 1️⃣ Ajusta a imagem para caber no container
  const scaleFit = Math.min(
    (widthContainer - 50) / img.width,
    (heightContainer - 50) / img.height,
  );
  const renderWidth = img.width * scaleFit;
  const renderHeight = img.height * scaleFit;

  // 2️⃣ Calcula a maior área utilizável após rotação
  const { cropWidth, cropHeight } = getLargestInscribedRect(
    renderWidth,
    renderHeight,
    rotation,
  );

  const centerX = widthContainer / 2;
  const centerY = heightContainer / 2;

  // 3️⃣ Rotaciona e desenha a imagem
  const moveOrigin = Translation(-renderWidth / 2, -renderHeight / 2);
  const scale = Scale(scaleX, scaleY);
  const rot = Rotate(rotation);
  const trans = Translation(centerX, centerY);
  const mat = multiplyMatrices(
    trans,
    multiplyMatrices(rot, multiplyMatrices(scale, moveOrigin)),
  );

  ctx.setTransform(
    mat[0][0],
    mat[1][0],
    mat[0][1],
    mat[1][1],
    mat[0][2],
    mat[1][2],
  );
  ctx.drawImage(img, 0, 0, renderWidth, renderHeight);

  // 4️⃣ Captura o crop central da maior área
  const sx = centerX - cropWidth / 2;
  const sy = centerY - cropHeight / 2;
  const imageData = ctx.getImageData(sx, sy, cropWidth, cropHeight);

  // 5️⃣ Limpa canvas e redesenha o crop com rotação 0°
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, widthContainer, heightContainer);
  ctx.putImageData(
    imageData,
    centerX - cropWidth / 2,
    centerY - cropHeight / 2,
  );

  // 6️⃣ Atualiza info da imagem
  setImageInfo({
    widthOriginal: img.width,
    heightOriginal: img.height,
    widthDisplay: cropWidth * scaleX,
    heightDisplay: cropHeight * scaleY,
    offsetX: centerX - (cropWidth * scaleX) / 2,
    offsetY: centerY - (cropHeight * scaleY) / 2,
  });

  return {
    renderWidth: cropWidth * scaleX,
    renderHeight: cropHeight * scaleY,
  };
}

export function exportHighQuality(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;

  const base64 = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = base64;
  link.download = "editron.png";
  link.click();
}
