// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// neste arquivo contem toda a logica para renderização dos componentes

import { useCrop } from "../atoms/contextCrop";
import { useIntensity } from "../atoms/contextIntesity";
import { exportHighQuality } from "../atoms/drawImage";
import { ImageView } from "../molecules/imgView";
import { LeftPainel } from "../molecules/leftPainel";
import { Menu } from "../molecules/menu";
import { initialIntensityState } from "../atoms/contextIntesity";
import { useEffect, useRef, useState } from "react";

export type Point = {
  width: number;
  height: number;
};

export default function MainContent() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { image, setImage } = useCrop();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showRectangule, setShowRectangule] = useState("");
  const [rotation, setRotation] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [isPop, setIsPop] = useState<Point>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { setState } = useIntensity();

  const handleAbrir = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      setRotation(0);
      setScaleX(1);
      setScaleY(1);
      setShowRectangule("");
      setIsPop(undefined);
      setState(initialIntensityState);
      setImage(base64);
    };

    reader.onerror = () => {
      console.error("Erro ao ler arquivo");
    };

    reader.readAsDataURL(file);
  };

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    setWidth(rect.width);
    setHeight(rect.height);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-[--background-gradient]">
      <Menu
        onOpen={handleAbrir}
        onExport={() => {
          exportHighQuality(canvasRef.current);
        }}
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />

      <div className="flex flex-1 h-full">
        <LeftPainel
          setShowRectangule={setShowRectangule}
          onRotateChange={setRotation}
          onScaleChange={(sx, sy) => {
            setScaleX(sx);
            setScaleY(sy);
          }}
          setIsPop={setIsPop}
        />
        {/* viewport do editor */}
        <div ref={ref} className="flex-1 flex items-center justify-center">
          {image && (
            <ImageView
              canvasRef={canvasRef}
              retangule={showRectangule}
              widthContainer={width}
              heightContainer={height}
              rotation={rotation}
              scaleX={scaleX}
              scaleY={scaleY}
              isPop={isPop}
            />
          )}
        </div>
      </div>
    </div>
  );
}
