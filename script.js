const ctx = document.getElementById("corridaCanvas").getContext("2d"); // essa função deixa o canvas como 2d
const angulosX = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8]; 
const angulosY = [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1];
// os componentes x e y de vetores em direções específicas para calcular o angulo do carro.

const pistaMapa = [
  [1, 'x', 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0],
  [1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
];// aqui estou definindo como é a pista.
let carroX = 10;
let carroY = 10;
let carroAngulo = 18;
// essas variáveis armazenam a posição inicial do carro na tela (x e y) e o ângulo do carro.

let virarEsquerda = false;
let virarDireita = false;
// essas variáveis indicam se o jogador está pressionando as teclas de seta esquerda ou direita para virar o carro.

function viraCarro(tecla) {
  if (tecla == 37) virarEsquerda = true;
  if (tecla == 39) virarDireita = true;
}
function paraCarro(tecla) {
  if (tecla == 37) virarEsquerda = false;
  if (tecla == 39) virarDireita = false;
} // quando as funções são chamadas no html, elas ajustam as variáveis virarEsquerda e virarDireita com base nas teclas de seta esquerda (37) e direita (39).

function linhaDeChegada() {
  const linhaChegadaX = pistaMapa[0].indexOf('x');
  const linhaChegadaY = 0;

  if (carroX > linhaChegadaY * 200 && carroY > linhaChegadaX * 200) {
    alert("Game Over - Você cruzou a linha de chegada!");
    window.location.reload(); // recarrega a página.
  }
} // essa função verifica se o carro cruzou a linha de chegada, representada pelo caractere 'x' no array da pista, se cruzar, exibe um alerta de game over e recarrega a página.

function moverCarro() {
  if (virarEsquerda) carroAngulo = (carroAngulo - 2 + 36) % 36; //se a variável virarEsquerda for verdadeira, o ângulo do carro é diminuido em 2 e ajustado para estar dentro do intervalo [0, 36) usando a operação de módulo %.
  if (virarDireita) carroAngulo = (carroAngulo + 2) % 36; //se a variável virarDireita for verdadeira, o ângulo do carro é aumentado em 2 e ajustado para estar dentro do intervalo [0, 36) usando a operação de módulo %.

  document.getElementById('carroContainer').innerHTML = `
    <div style='position:relative; z-index:2; top:254px; width:20px; height:40px; background-color:#ff0000; border-radius:4px; transform:rotate(${carroAngulo}0deg);'>
    <div style='width:10px; height:4px; background-color:#ffff00; border:5px solid #ffff00; border-top:none; border-bottom:none;'></div>
    <div style='width:14px; height:20px; background-color:#ffffff; border:3px solid #000000;'></div>
    </div>`;//cria uma representação visual do carro com base no ângulo atual do carro. O carro é desenhado usando elementos <div> com estilos CSS específicos, incluindo uma rotação com base no ângulo atual.

  ctx.fillStyle = "#00DB0F"; // Cor verde para a grama
  ctx.fillRect(0, 0, 460, 460);// desenha um retângulo verde (grama) no desenho, cobrindo toda a área do canvas.
  carroX += angulosX[carroAngulo] * 3.7;
  carroY += angulosY[carroAngulo] * 3.7;
  //atualiza as coordenadas x e y do carro com base nos valores dos arrays angulosX e angulosY, multiplicados por 3.7. Isso representa o movimento do carro na direção especificada pelo ângulo.

  ctx.fillStyle = "#595959"; // Cor cinza para a pista
    for (let x = 0; x < pistaMapa.length; x++) {
      for (let y = 0; y < pistaMapa[x].length; y++) {
        if (pistaMapa[x][y] != 0) {
          ctx.fillRect((200 * y) + carroY + 38, (200 * x) + carroX + 28, 200, 200);
        }
      }
    } //um loop sobre o array bidimensional pistaMapa. se um elemento do array não for igual a zero, desenha um retângulo (representando parte da pista) nas coordenadas apropriadas com base na posição do carro.

  linhaDeChegada();// chama a função linhaDeChegada() para verificar se o carro cruzou a linha de chegada.

  setTimeout(moverCarro, 75);// configura um temporizador para chamar recursivamente a função moverCarro() a cada 75 milissegundos, criando uma animação contínua
}

moverCarro(); // inicia o movimento do carro chamando a função moverCarro().