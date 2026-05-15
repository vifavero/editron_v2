// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// neste arquivo voce encontrara a função que define o menu que contem contraste e log

import { useIntensity } from "../atoms/contextIntesity";
import { Slider } from "../components/ui/slider";
// correção log - posso pensar em quando clicado ajustar a img
// contrate - botão com um input para adicionar o valor da faixa desejada
export function MenuAdjust() {
  const { state, setState } = useIntensity();

  return (
    <>
      <div className="overflow-auto flex md:w-64 w-1/4 h-full bg-foreground justify-center items-center text-white gap-3 shadow-2xl transition-all ease-in-out delay-700 duration-350 ">
        <div className="flex flex-row flex-wrap justify-between m-7 items-center gap-3 ">
          <div className="flex flex-row gap-2 items-baseline">
            <label>Temperatura</label>
            <Slider
              min={-10}
              max={50}
              step={1}
              value={[state.temp]}
              onValueChange={(value) => setState({ ...state, temp: value[0] })}
              className="w-22 h-2 rounded-full bg-gradient-to-r from-blue-400 via-yellow-300 to-red-500"
            />
          </div>
          <p className="text-sm ">
            Permite alterar a temperatura de uma imagem, ou seja, deixar mais
            quente ou mais fria.
          </p>
        </div>
      </div>
    </>
  );
}
