// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// neste arquivo voce encontra todas a logica para renderização dos retangulos do crop e mouse
import { useState } from "react";
import { useCrop } from "./contextCrop";
import type { Point } from "../pages/main";

export function useDragRect(retangule: string, isPop: Point) {
  const { rect, setRect, imageInfo } = useCrop();

  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rectCanvas = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rectCanvas.left;
    const y = e.clientY - rectCanvas.top;

    if (
      x >= rect.x &&
      x <= rect.x + rect.width &&
      y >= rect.y &&
      y <= rect.y + rect.height &&
      rect.width &&
      rect.height
    ) {
      // estou dentro do retangulo
      setIsDrag(true);
      setDragOffset({ x: x - rect.x, y: y - rect.y });
    } else {
      setStartPoint({ x, y });
      setIsDrawing(true);
      setRect({ x, y, width: 0, height: 0 });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing && !isDrag) return;

    const rectCanvas = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rectCanvas.left;
    const currentY = e.clientY - rectCanvas.top;

    // limite de dentro da imagem
    const imgLeft = imageInfo.offsetX;
    const imgTop = imageInfo.offsetY;
    const imgRight = imgLeft + imageInfo.widthDisplay;
    const imgBottom = imgTop + imageInfo.heightDisplay;

    const clampedX = Math.max(imgLeft, Math.min(currentX, imgRight));
    const clampedY = Math.max(imgTop, Math.min(currentY, imgBottom));
    const x = Math.min(startPoint.x, clampedX);
    const y = Math.min(startPoint.y, clampedY);

    if (isDrag) {
      const newX = currentX - dragOffset.x;
      const newY = currentY - dragOffset.y;

      const boundedX = Math.max(imgLeft, Math.min(newX, imgRight - rect.width));
      const boundedY = Math.max(
        imgTop,
        Math.min(newY, imgBottom - rect.height),
      );

      setRect((prev) => ({
        ...prev,
        x: boundedX,
        y: boundedY,
      }));
    } else if (retangule !== "free") {
      setRect({ x, y, width: isPop.width, height: isPop.height });
    } else {
      setRect({
        x,
        y,
        width: Math.abs(clampedX - startPoint.x),
        height: Math.abs(clampedY - startPoint.y),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setIsDrag(false);
  };

  return { rect, handleMouseDown, handleMouseMove, handleMouseUp };
}
