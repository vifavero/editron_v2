// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// define e fornece contextos React para controlar informações do crop

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface ImageInfo {
  widthOriginal: number; // largura real da imagem
  heightOriginal: number; // altura real da imagem
  widthDisplay: number; // largura que a imagem ocupa no container
  heightDisplay: number; // altura que a imagem ocupa no container
  offsetX: number; // posição da imagem dentro do container (esquerda)
  offsetY: number; // posição da imagem dentro do container (topo)
}

interface CropContextType {
  rect: Rect;
  setRect: Dispatch<SetStateAction<Rect>>;
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
  imageInfo: ImageInfo;
  setImageInfo: Dispatch<SetStateAction<ImageInfo>>;
}

const defaultRect: Rect = { x: 0, y: 0, width: 0, height: 0 };

const defaultImageInfo: ImageInfo = {
  widthOriginal: 0,
  heightOriginal: 0,
  widthDisplay: 0,
  heightDisplay: 0,
  offsetX: 0,
  offsetY: 0,
};

const defaultCropContext: CropContextType = {
  rect: defaultRect,
  setRect: () => {},
  image: null,
  setImage: () => {},
  imageInfo: defaultImageInfo,
  setImageInfo: () => {},
};

export const CropContext = createContext<CropContextType>(defaultCropContext);

export const CropProvider = ({ children }: { children: ReactNode }) => {
  const [rect, setRect] = useState<Rect>(defaultRect);
  const [image, setImage] = useState<string | null>(null);
  const [imageInfo, setImageInfo] = useState<ImageInfo>(defaultImageInfo);

  return (
    <CropContext.Provider
      value={{ rect, setRect, image, setImage, imageInfo, setImageInfo }}
    >
      {children}
    </CropContext.Provider>
  );
};

// consumir o contexto
export const useCrop = () => useContext(CropContext);
