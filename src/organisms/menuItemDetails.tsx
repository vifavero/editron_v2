// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// neste arquivo voce encontrara a função que define o menu que contem contraste e log

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useIntensity } from "../atoms/contextIntesity";

// correção log - posso pensar em quando clicado ajustar a img
// contrate - botão com um input para adicionar o valor da faixa desejada
export function MenuDetails() {
  const { state, setState } = useIntensity();

  return (
    <>
      <div className="overflow-auto flex md:w-64 w-1/4 h-full bg-foreground justify-center items-center text-white gap-3 shadow-2xl transition-all ease-in-out delay-700 duration-350 ">
        <div className="flex flex-row flex-wrap justify-between m-7 items-center gap-3 ">
          <label>Contraste</label>
          <p className="text-sm">
            Para realçar detalhes em uma faixa específica da imagem (como
            realçar apenas tons médios ou claros).{" "}
          </p>
          <p>Intervalo Inicial</p>
          <div className="flex flex-row gap-2">
            <Input
              type="number"
              value={state.contrastA}
              onChange={(e) =>
                setState({ ...state, contrastA: Number(e.target.value) || 0 })
              }
              className="w-14 h-6 rounded-sm p-3"
            />

            <Input
              type="number"
              value={state.contrastB}
              onChange={(e) =>
                setState({ ...state, contrastB: Number(e.target.value) || 0 })
              }
              className="w-14 h-6 rounded-sm p-3"
            />
          </div>
          <label>Destino do contraste</label>

          <div className="flex flex-row gap-2">
            <Input
              type="number"
              value={state.contrastC}
              onChange={(e) =>
                setState({ ...state, contrastC: Number(e.target.value) || 0 })
              }
              className="w-14 h-6 rounded-sm p-3"
            />
            <Input
              type="number"
              value={state.contrastD}
              onChange={(e) =>
                setState({ ...state, contrastD: Number(e.target.value) || 0 })
              }
              className="w-14 h-6 rounded-sm p-3"
            />
          </div>
          <div className="flex flex-row gap-3 mt-10 items-baseline ">
            <label>Log</label>
            <Button
              size={"sm"}
              onClick={() => setState({ ...state, useLog: !state.useLog })}
            >
              {state.useLog ? "Desativar " : "Ativar"}
            </Button>
          </div>
          <p>
            Aplica uma transformação logarítmica, usado para realçar detalhes em
            regiões escuras da imagem.
          </p>
        </div>
      </div>
    </>
  );
}
