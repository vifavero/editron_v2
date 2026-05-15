import { useState } from "react";
import { LeftPainel } from "./molecules/leftPainel";
import Page from "./pages/indexPage";

function App() {
  //   const [imgPath, setImgPath] = useState<string | null>(null);

  //   const handleAbrirImagem = async () => {
  //     const caminho = await (window as any).api.abrirImagem();
  //     if (caminho) {
  //       const safePath = caminho.replace(/\\/g, "/");
  //       setImgPath(`file://${safePath}`);
  //     }
  //   };

  //   return (
  //     <div>
  //       <button onClick={handleAbrirImagem}>Abrir imagem</button>

  //       {imgPath && <img src={imgPath} alt="Preview" />}
  //     </div>
  //   );
  // }
  return <Page />;
}
export default App;
