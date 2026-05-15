// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// Este arquivo contem funções para criar o menu do crop

import { MdCrop75, MdCropFree } from "react-icons/md";
import { Button } from "../components/ui/button";
import { cropImage } from "../atoms/cropImage";
import { useCrop } from "../atoms/contextCrop";
import type { Point } from "../pages/main";
type cropProps = {
  setShowRectangule: (value: string) => void;
  setIsPop: (size: Point) => void;
};

export function MenuItemCrop({ setShowRectangule, setIsPop }: cropProps) {
  const { rect, image, setImage, imageInfo } = useCrop();

  return (
    <>
      <div className="flex md:w-64 w-1/4 h-full bg-foreground justify-center items-center text-white gap-3 shadow-2xl transition-all ease-in-out delay-700 duration-350 ">
        <div className="flex flex-row flex-wrap justify-center items-center gap-7">
          <Button
            onClick={() => setShowRectangule("free")}
            iconSrc={<MdCropFree size={40} />}
          >
            Forma Livre
          </Button>
          <Button
            onClick={() => {
              setShowRectangule("1:1");
              setIsPop({ width: 200, height: 200 });
            }}
            iconSrc={<MdCrop75 size={40} />}
          >
            1:1
          </Button>
          <Button
            onClick={() => {
              setShowRectangule("3x2");
              setIsPop({ width: 300, height: 200 });
            }}
            iconSrc={<MdCrop75 size={40} />}
          >
            3:2
          </Button>
          <Button
            onClick={() => {
              setShowRectangule("3x4");
              setIsPop({ width: 150, height: 200 });
            }}
            iconSrc={<MdCrop75 size={40} />}
          >
            3:4
          </Button>
          <Button
            onClick={() => {
              setShowRectangule("4:2");
              setIsPop({ width: 400, height: 200 });
            }}
            iconSrc={<MdCrop75 size={40} />}
          >
            4:2
          </Button>
          <Button
            onClick={() => {
              setShowRectangule("16x9");
              setIsPop({ width: 320, height: 180 });
            }}
            iconSrc={<MdCrop75 size={40} />}
          >
            16:9
          </Button>

          <Button
            onClick={() => {
              if (!image || rect.width === 0 || rect.height === 0) return;

              const img = new Image();

              img.src = image;
              img.onload = () => {
                const scaleX = imageInfo.widthOriginal / imageInfo.widthDisplay;
                const scaleY =
                  imageInfo.heightOriginal / imageInfo.heightDisplay;

                const cropRect = {
                  x: Math.round((rect.x - imageInfo.offsetX) * scaleX),
                  y: Math.round((rect.y - imageInfo.offsetY) * scaleY),
                  width: Math.round(rect.width * scaleX),
                  height: Math.round(rect.height * scaleY),
                };

                const croppedCanvas = cropImage(img, cropRect);
                if (croppedCanvas) {
                  const croppedURL = croppedCanvas.toDataURL();
                  setImage(croppedURL);
                }
              };
            }}
            disabled={!image || rect.width === 0 || rect.height === 0}
            className="p-2"
            variant={"default"}
            size={"lg"}
          >
            Cortar
          </Button>
        </div>
      </div>
    </>
  );
}
