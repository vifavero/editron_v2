// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

//  neste arquivo tem apenas a chamada da pagina principal com os providers
import { Toaster } from "sonner";
import { CropProvider } from "../atoms/contextCrop";
import { IntensityProvider } from "../atoms/contextIntesity";
import MainContent from "./main";

export default function Page() {
  return (
    <>
      <Toaster />
      <CropProvider>
        <IntensityProvider>
          <MainContent />
        </IntensityProvider>
      </CropProvider>
    </>
  );
}
