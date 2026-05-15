// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// Este arquivo contem um função para criar um retangulo
// para podermos usar no crop e deixar melhor
// visualmente a area que o usuario ira cortar

// criar o retnagulo preciso da altura, largura, x e y para pegar as coordenadas (top e centro) de onde esta o meu novo retangulo
// x → horizontal → left
// y → vertical → top

type Rect = {
  x: number;
  y: number;
  lrg: number;
  alt: number;
  mouse?: (e: React.MouseEvent) => void;
};

export function Retangulo({ x, y, lrg, alt }: Rect) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: lrg,
        height: alt,
        border: "2px dashed #007bff",
        pointerEvents: "auto",
        cursor: "crosshair",
      }}
    />
  );
}
