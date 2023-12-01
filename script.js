const ctx = document.getElementById("corridaCanvas").getContext("2d");
    const angulosX = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
    const angulosY = [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2,
     3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const pistaMapa = [
      [1, 'x', 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
    ];
    let carroX = 10;
    let carroY = 10;
    let carroAngulo = 18;
    let virarEsquerda = false;
    let virarDireita = false;

    function viraCarro(tecla) {
      if (tecla == 37) virarEsquerda = true;
      if (tecla == 39) virarDireita = true;
    }

    function paraCarro(tecla) {
      if (tecla == 37) virarEsquerda = false;
      if (tecla == 39) virarDireita = false;
    }

    function linhaDeChegada() {
      const linhaChegadaX = pistaMapa[0].indexOf('x');
      const linhaChegadaY = 0;

      if (carroX > linhaChegadaY * 200 && carroY > linhaChegadaX * 200) {
        alert("Game Over - Você cruzou a linha de chegada!");
        window.location.reload(); // Recarrega a página
      }
    }

    function moverCarro() {
      if (virarEsquerda) carroAngulo = (carroAngulo - 2 + 36) % 36;
      if (virarDireita) carroAngulo = (carroAngulo + 2) % 36;

      document.getElementById('carroContainer').innerHTML = `
        <div style='position:relative; z-index:2; top:254px; width:20px; height:40px; background-color:#ff0000; border-radius:4px; transform:rotate(${carroAngulo}0deg);'>
          <div style='width:10px; height:4px; background-color:#ffff00; border:5px solid #ffff00; border-top:none; border-bottom:none;'></div>
          <div style='width:14px; height:20px; background-color:#ffffff; border:3px solid #000000;'></div>
        </div>`;

      ctx.fillStyle = "#00DB0F"; // Cor verde para a grama
      ctx.fillRect(0, 0, 460, 460);
      carroX += angulosX[carroAngulo] * 3.7;
      carroY += angulosY[carroAngulo] * 3.7;

      ctx.fillStyle = "#595959"; // Cor cinza para a pista
      for (let x = 0; x < pistaMapa.length; x++) {
        for (let y = 0; y < pistaMapa[x].length; y++) {
          if (pistaMapa[x][y] != 0) {
            ctx.fillRect((200 * y) + carroY + 38, (200 * x) + carroX + 28, 200, 200);
          }
        }
      }

      linhaDeChegada();

      setTimeout(moverCarro, 75);
    }

    moverCarro();