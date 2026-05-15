// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// neste arquivo encontra a função que define o painel lateral

import { BiCrop, BiRotateRight } from "react-icons/bi";
import { ImBrightnessContrast } from "react-icons/im";
import { TbContrast2Filled } from "react-icons/tb";
import { MenuItemCrop } from "../organisms/menuItemCrop";
import { useState } from "react";
import { MenuTransforms } from "../organisms/menuItemTrasforms";
import { MenuIntensity } from "../organisms/menuItemIluminity";
import { MenuDetails } from "../organisms/menuItemDetails";
import type { Point } from "../pages/main";
import { useIntensity } from "../atoms/contextIntesity";
import { MdFormatColorReset } from "react-icons/md";
import { MenuAdjust } from "../organisms/menuItemAdjust";
import { Plus } from "lucide-react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { Item } from "../components/ui/item";

export type cropProps = {
  setShowRectangule: (value: string) => void;
  setIsPop: (size: Point) => void;
  onRotateChange: (theta: number) => void;
  onScaleChange: (sx: number, sy: number) => void;
};

export function LeftPainel({
  setShowRectangule,
  onRotateChange,
  onScaleChange,
  setIsPop,
}: cropProps) {
  const [showMenu, setShowMenu] = useState("");
  const { setState } = useIntensity();
  const handleReset = () => {
    setShowRectangule("");
    setShowMenu("reset");

    onRotateChange(0); // rotação padrão
    onScaleChange(1, 1); // escala padrão
    setState({
      gamma: 0,
      light: 0,
      contrastA: 0,
      contrastB: 255,
      contrastC: 0,
      contrastD: 255,
      useInverse: false,
      useLog: false,
      temp: 0,
    });
  };

  return (
    <div className="flex h-full ">
      <div className="bg-foreground w-16 h-full flex flex-col justify-center items-center gap-5">
        {/* Item Crop */}
        <Item
          onClick={() => setShowMenu("cropFree")}
          className="hover:bg-gray-700 rounded-lg p-2"
          variant={showMenu === "cropFree" ? "outline" : "default"}
        >
          <BiCrop
            size={32}
            className={`
              ${showMenu === "cropFree" ? "text-bg-background" : "text-gray-300"} 
              hover:text-white
            `}
          />
        </Item>

        {/* Item Rotate */}
        <Item
          onClick={() => setShowMenu("rotate")}
          className="hover:bg-gray-700 rounded-lg p-2"
          variant={showMenu === "rotate" ? "outline" : "default"}
        >
          <BiRotateRight
            size={32}
            className={`
              ${showMenu === "rotate" ? "text-bg-background" : "text-gray-300"} 
              hover:text-white
            `}
          />
        </Item>

        {/* Item Details */}
        <Item
          onClick={() => setShowMenu("details")}
          className="hover:bg-gray-700 rounded-lg p-2"
          variant={showMenu === "details" ? "outline" : "default"}
        >
          <ImBrightnessContrast
            size={32}
            className={`
              ${showMenu === "details" ? "text-bg-background" : "text-gray-300"} 
              hover:text-white
            `}
          />
        </Item>

        {/* Item Iluminity */}
        <Item
          onClick={() => setShowMenu("iluminity")}
          className="hover:bg-gray-700 rounded-lg p-2"
          variant={showMenu === "iluminity" ? "outline" : "default"}
        >
          <TbContrast2Filled
            size={32}
            className={`
              ${showMenu === "iluminity" ? "text-bg-background" : "text-gray-300"} 
              hover:text-white
            `}
          />
        </Item>
        <Item
          onClick={() => setShowMenu("temp")}
          className="hover:bg-gray-700 rounded-lg p-2"
          variant={showMenu === "temp" ? "outline" : "default"}
        >
          <HiAdjustmentsHorizontal
            size={32}
            className={`
              ${showMenu === "temp" ? "text-bg-background" : "text-gray-300"} 
              hover:text-white
            `}
          />
        </Item>

        <Item
          onClick={handleReset}
          className="hover:bg-gray-700 rounded-lg p-2"
          variant={showMenu === "reset" ? "outline" : "default"}
        >
          <MdFormatColorReset
            size={32}
            className={`
              ${showMenu === "reset" ? "text-bg-background" : "text-gray-300"} 
              hover:text-white
            `}
          />
        </Item>
      </div>

      {/* Conteúdos do painel lateral */}
      {showMenu === "cropFree" && (
        <MenuItemCrop
          setShowRectangule={setShowRectangule}
          setIsPop={setIsPop}
        />
      )}
      {showMenu === "rotate" && (
        <MenuTransforms
          onRotateChange={onRotateChange}
          onScaleChange={onScaleChange}
        />
      )}
      {showMenu === "iluminity" && <MenuIntensity />}
      {showMenu === "details" && <MenuDetails />}
      {showMenu === "temp" && <MenuAdjust />}
    </div>
  );
}
