// Nome:Victoria Favero Nunes,
//  NUSP: 15698302,
// Código TUrma: SCC0251,
// Ano/Semstre: 2026/1,
// // Titulo Trabalho: Editron / MEU PRIMEIRO SOFTWARE GENÉRICO DE IMAGENS

// Este arquivo contem todas as funções para realizar as trasformações geométricas

export function Rotate(thetaDeg: number) {
  // a pessoa entra com o theta (grau de rotação que ela deseja)
  // preciso retornar a matriz com invertida = trasposta e
  // depois de multiplico as matizes (img e a da trasformação)
  const theta = (thetaDeg * Math.PI) / 180; // converter para radianos

  return [
    [Math.cos(theta), -Math.sin(theta), 0],
    [Math.sin(theta), Math.cos(theta), 0],
    [0, 0, 1],
  ];
}

export function Scale(si: number, sj: number) {
  // sx > 1- o eixo x estica
  // 0 < sx < 1 - encolhe o eixo x
  // sx < 0 alem de escalar, inverte o eixo x
  //  si e sj são valores no qual o ususrio ira colocar que irão alterar a escala
  return [
    [1 / si, 0, 0],
    [0, 1 / sj, 0],
    [0, 0, 1],
  ];
}

export function Translation(ti: number, tj: number) {
  // ti e tj são os valores desejados pelo usuario para fazer a trasformação
  // então para um ponto p somo o valor de ti ou tj para obter os novos valores
  return [
    [1, 0, ti],
    [0, 1, tj],
    [0, 0, 1],
  ];
}
export function multiplyMatrices(a: number[][], b: number[][]) {
  const result = Array(3)
    .fill(0)
    .map(() => Array(3).fill(0));
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++) result[i][j] += a[i][k] * b[k][j];
  return result;
}

//para img rotacionada verifico a 'area util' e corto baseado nela
export function getLargestInscribedRect(
  w: number,
  h: number,
  angleDeg: number,
) {
  const radians = (angleDeg * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));

  const newWidth = w * cos + h * sin;
  const newHeight = w * sin + h * cos;

  const scale = Math.min(w / newWidth, h / newHeight);

  return {
    cropWidth: w * scale,
    cropHeight: h * scale,
  };
}
