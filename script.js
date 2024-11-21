var canvas = document.getElementById('canvas').getContext("2d");

// Cria os objetos do jogo
var bg = new Bg(0, 0, 500, 900, "assets/bg.png"); // Fundo principal
var flower = new Flower(0, 0, 50, 50, "assets/flower1.png"); // Flor que a abelha coleta
var bg2 = new Bg(0, -900, 500, 900, "assets/bg.png"); // Fundo secundário para efeito contínuo
var bee = new Bee(200, 500, 100, 80, "assets/bee1.png"); // Abelha controlada pelo jogador
var spider = new Spider(100, 100, 100, 100, "assets/spider1.png"); // Aranha, obstáculo do jogo

// Elementos de texto para exibir informações
var text_points = new Text(); // Exibe a pontuação
var text_lifes = new Text(); // Exibe as vidas restantes
var gameover = new Text(); // Exibe "Game Over"

// Variável para controlar se o jogo está em andamento
var play = true;

// Eventos de teclado para movimentar a abelha
document.addEventListener("keydown", function(event) {
  if (event.key === "a") { // Tecla 'A' move para a esquerda
    bee.dir = -3;
  }
  if (event.key === "d") { // Tecla 'D' move para a direita
    bee.dir = 3;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.key === "a") { // Para o movimento ao soltar a tecla 'A'
    bee.dir = 0;
  }
  if (event.key === "d") { // Para o movimento ao soltar a tecla 'D'
    bee.dir = 0;
  }
});

// Função que verifica colisões no jogo
function collides() {
  if (bee.collide(spider)) { // Colisão com a aranha
    spider.respaw(); // Reposiciona a aranha
    bee.lifes -= 1; // Perde uma vida
  }

  if (bee.collide(flower)) { // Colisão com a flor
    flower.respaw(); // Reposiciona a flor
    bee.pts += 1; // Ganha um ponto
  }
}

// Função para verificar se o jogo acabou
function gameOver() {
  if (bee.lifes <= 0) { // Se as vidas forem 0, o jogo para
    play = false;
  }
}

// Função para desenhar todos os elementos na tela
function draw() {
  bg.draw(); // Desenha o fundo principal
  bg2.draw(); // Desenha o fundo secundário
  if (play) { // Se o jogo estiver em andamento
    bee.draw(); // Desenha a abelha
    spider.draw(); // Desenha a aranha
    flower.draw(); // Desenha a flor
    text_points.draw(bee.pts, 240, 100, "white"); // Exibe a pontuação
    text_lifes.draw(bee.lifes, 40, 100, "white"); // Exibe as vidas restantes
  } else { // Se o jogo acabou
    gameover.draw("GameOver", 150, 450, "white"); // Exibe "Game Over"
  }
}

// Função para atualizar o estado do jogo
function update() {
  bg.move(3, 900, 0); // Move o fundo principal
  bg2.move(3, 0, -900); // Move o fundo secundário
  if (play) { // Se o jogo estiver em andamento
    bee.move(); // Move a abelha
    bee.animation("bee", 4); // Anima a abelha
    spider.move(); // Move a aranha
    spider.animation("spider", 4); // Anima a aranha
    flower.move(); // Move a flor
    flower.animation("flower", 2); // Anima a flor
    collides(); // Verifica colisões
    gameOver(); // Verifica se o jogo acabou
  }
}

// Função principal que roda o jogo em loop
function main() {
  canvas.clearRect(0, 0, 500, 900); // Limpa o canvas
  update(); // Atualiza o estado do jogo
  draw(); // Desenha os elementos atualizados
}

// Configura um loop que executa a função main a cada 10ms
setInterval(main, 10);
