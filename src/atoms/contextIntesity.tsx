// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// define e fornece contextos React para controlar intensidade de imagem

import { createContext, useContext, useState } from "react";

type IntensityState = {
  gamma: number;
  light: number;
  contrastA: number;
  contrastB: number;
  contrastC: number;
  contrastD: number;
  useInverse: boolean;
  useLog: boolean;
  temp: number;
};

export const initialIntensityState: IntensityState = {
  gamma: 0,
  light: 0,
  contrastA: 0,
  contrastB: 255,
  contrastC: 0,
  contrastD: 255,
  useInverse: false,
  useLog: false,
  temp: 0,
};
type IntensityContextType = {
  state: IntensityState;
  setState: React.Dispatch<React.SetStateAction<IntensityState>>;
};

const IntensityContext = createContext<IntensityContextType | undefined>(
  undefined,
);

export const IntensityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<IntensityState>(initialIntensityState);

  return (
    <IntensityContext.Provider value={{ state, setState }}>
      {children}
    </IntensityContext.Provider>
  );
};

export const useIntensity = () => {
  const context = useContext(IntensityContext);
  if (!context)
    throw new Error("useIntensity must be used inside IntensityProvider");
  return context;
};
