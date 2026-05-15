// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// neste arquivo você encontrara a função que carrega o desenho e funções para aplicar na da imagem

import { useEffect, useState } from "react";
import { Retangulo } from "../atoms/retangule";
import { useIntensity } from "../atoms/contextIntesity";

// import { drawImageOnCanvas } from "../atoms/drawImage";
import { applyIntensity } from "../atoms/intensity";
import { useDragRect } from "../atoms/dragReact";
import { useCrop } from "../atoms/contextCrop";
import type { Point } from "../pages/main";
import { drawImageOnCanvas } from "../atoms/drawImage";

type ImageViewProps = {
  retangule: string;
  widthContainer: number;
  heightContainer: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  isPop: Point;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export function ImageView({
  retangule,
  widthContainer,
  heightContainer,
  rotation,
  scaleX,
  scaleY,
  isPop,
  canvasRef,
}: ImageViewProps) {
  const [widthImg, setWidthImg] = useState(0);
  const [heightImg, setHeightImg] = useState(0);
  const { state } = useIntensity();
  const { rect, image } = useCrop();
  const { setImageInfo } = useCrop();

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useDragRect(
    retangule,
    isPop,
  );

  useEffect(() => {
    if (!image) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!rotation) {
      canvas.width = widthContainer;
      canvas.height = heightContainer;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();

    img.src = image;

    img.onload = () => {
      const { renderWidth, renderHeight } = drawImageOnCanvas(
        ctx,
        img,
        widthContainer,
        heightContainer,
        rotation,
        scaleX,
        scaleY,
        setImageInfo,
      );

      setWidthImg(renderWidth);
      setHeightImg(renderHeight);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const processed = applyIntensity(imageData, state);
      ctx.putImageData(processed, 0, 0);
    };
  }, [
    image,
    widthContainer,
    heightContainer,
    rotation,
    scaleX,
    scaleY,
    state,
    canvasRef,
    setImageInfo,
  ]);

  return (
    <div
      style={{ position: "relative" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas ref={canvasRef} />
      <Retangulo x={rect.x} y={rect.y} lrg={rect.width} alt={rect.height} />
    </div>
  );
}
