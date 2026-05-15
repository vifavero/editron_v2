// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// neste arquivo voce encontrara a função que define o menu que contem negativo/inversa e gamma

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useIntensity } from "../atoms/contextIntesity";

// botão para inversão de intensidade com input para digitar o valor do pixel
// correção gama - botao com input de valor
export function MenuIntensity() {
  const { state, setState } = useIntensity();

  return (
    <>
      <div className="overflow-auto flex md:w-64 w-1/4 h-full bg-foreground justify-center items-center text-white gap-3 shadow-2xl transition-all ease-in-out delay-700 duration-350 ">
        <div className="flex flex-row flex-wrap  m-7 items-center gap-3 ">
          <div className="flex flex-row gap-3 mt-10 items-baseline ">
            <label>Negativo</label>
            <Button
              size={"sm"}
              onClick={() =>
                setState({ ...state, useInverse: !state.useInverse })
              }
            >
              {state.useInverse ? "Desativar " : "Ativar "}
            </Button>
          </div>
          <p className="text-sm ">
            Aplica uma inversão de intensidade tanto para negativo de uma imagem
            ou destacar regiões claras e escuras.
          </p>
          <div className="flex flex-row gap-2 mt-10">
            <label>Gamma</label>
            <Input
              type="number"
              value={state.gamma}
              onChange={(e) =>
                setState({ ...state, gamma: Number(e.target.value) || 0 })
              }
              className="w-14 h-6 rounded-sm p-3"
            />
          </div>
          <p className="text-sm">
            Ajusta o brilho de forma não-linear. Se gamma &lt; 1, a imagem fica
            mais clara; se gamma &gt; 1, a imagem fica mais escura.
          </p>
        </div>
      </div>
    </>
  );
}
