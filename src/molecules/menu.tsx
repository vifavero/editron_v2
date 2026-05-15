// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// neste arquivo você encontrara a função que define a navbar
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../components/ui/menubar";

type MenuProps = {
  onOpen: () => void;
  onExport: () => void;
};

export function Menu({ onOpen, onExport }: MenuProps) {
  return (
    <Menubar className="border-none bg-chart-2 rounded-none">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-chart-3 hover:text-foreground">
          Arquivo
        </MenubarTrigger>
        <MenubarContent className="bg-chart-3 ml-2">
          <MenubarGroup>
            <MenubarItem onClick={onOpen}>Abrir Imagem</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-chart-3 hover:text-foreground">
          Exportar
        </MenubarTrigger>
        <MenubarContent className="bg-chart-3 ml-2">
          <MenubarGroup>
            <MenubarItem onClick={onExport}>Salvar Imagem</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
