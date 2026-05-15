// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// neste arquivo voce encontrara a função que define o menu das transformações geometricas

import { useState } from "react";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

interface MenuTransformsProps {
  onRotateChange: (theta: number) => void;
  onScaleChange: (sx: number, sy: number) => void;
}

export function MenuTransforms({
  onRotateChange,
  onScaleChange,
}: MenuTransformsProps) {
  const [inputRotate, setInputRotate] = useState("");
  const [inputScaleX, setInputScaleX] = useState("");
  const [inputScaleY, setInputScaleY] = useState("");

  const validRotations = [0, 90, 180];

  const canScale = (theta: number) => validRotations.includes(theta);

  const getTheta = () => {
    const theta = Number(inputRotate);
    return Number.isNaN(theta) ? 0 : theta;
  };

  const handleScaleChange = (sx: number, sy: number) => {
    const theta = getTheta();

    if (!canScale(theta)) {
      toast.error(
        "Você só pode redimensionar quando a rotação for 0, 90 ou 180.",
      );
      return;
    }

    onScaleChange(sx, sy);
  };

  return (
    <div className="flex md:w-64 w-1/4 h-full bg-foreground justify-center items-center text-white gap-3 shadow-2xl transition-all ease-in-out delay-700 duration-350">
      <div className="flex flex-row flex-wrap ml-4 items-center gap-7">
        {/* ROTATION */}
        <label>Endireitar</label>

        <Input
          placeholder="90"
          value={inputRotate}
          onChange={(e) => {
            const value = e.target.value;
            setInputRotate(value);

            const theta = Number(value);
            onRotateChange(Number.isNaN(theta) ? 0 : theta);
          }}
          className="w-14 h-6 rounded-sm p-3"
        />

        <p className="text-sm">
          Aplica rotação à imagem em graus. Valores positivos giram no sentido
          horário.
        </p>

        {/* SCALE */}
        <label>Redimensionar</label>

        <p className="text-sm">
          Ajusta o tamanho da imagem horizontalmente e verticalmente.
        </p>

        <div className="flex flex-row gap-2">
          {/* SX */}
          <Input
            placeholder="1"
            value={inputScaleX}
            onChange={(e) => {
              const value = Number(e.target.value);
              setInputScaleX(e.target.value);

              const sy = Number(inputScaleY) || 1;

              handleScaleChange(value || 1, sy);
            }}
            className="w-14 h-6 rounded-sm p-3"
          />

          <p>x</p>

          {/* SY */}
          <Input
            placeholder="1"
            value={inputScaleY}
            onChange={(e) => {
              const value = Number(e.target.value);
              setInputScaleY(e.target.value);

              const sx = Number(inputScaleX) || 1;

              handleScaleChange(sx, value || 1);
            }}
            className="w-14 h-6 rounded-sm p-3"
          />
        </div>
      </div>
    </div>
  );
}
