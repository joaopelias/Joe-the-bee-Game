class Obj {
  frame = 1; // Quadro atual da animação
  timer = 0; // Temporizador para controle da animação

  constructor(x, y, width, height, color) {
    this.x = x; // Posição no eixo X
    this.y = y; // Posição no eixo Y
    this.width = width; // Largura do objeto
    this.height = height; // Altura do objeto
    this.color = color; // Caminho da imagem
  }

  draw() {
    var img = new Image();
    img.src = this.color; // Define a imagem do objeto
    canvas.drawImage(img, this.x, this.y, this.width, this.height);
  }

  animation(nome, limit) {
    // Atualiza o quadro da animação
    this.timer += 1;
    if (this.timer > 10) {
      this.timer = 0;
      this.frame += 1;
    }
    if (this.frame > limit) {
      this.frame = 1; // Reinicia a animação
    }
    this.color = "assets/" + nome + this.frame + ".png"; // Atualiza a imagem
  }

  collide() {
    // Método para colisões
  }
}


class Bee extends Obj {
  dir = 0; // Direção do movimento
  lifes = 3; // Número de vidas
  pts = 0; // Pontuação do jogador

  move() {
    this.x += this.dir; // Move a abelha horizontalmente
  }

  collide(obj) {
    // Verifica se há colisão com outro objeto
    if (this.x < obj.x + obj.width &&
        this.x + this.width > obj.x &&
        this.y < obj.y + obj.height &&
        this.y + this.height > obj.y) {
      return true; // Com colisão 
    } else {
      return false; // Sem colisão
    }
  }
}


class Spider extends Obj {
  move() {
    this.y += 4; // Move a aranha para baixo
    if (this.y > 900) {
      // Reposiciona a aranha no topo da tela ao sair do limite
      this.y = -50;
      this.x = Math.random() * (400 - 0); // Posição X aleatória
    }
  }

  respaw() {
    // Reposiciona a aranha no topo, fora da tela
    this.y = -300;
    this.x = Math.random() * (400 - 0);
  }
}

class Bg extends Obj {
  move(speed, limit, pos) {
    this.y += speed; // Move o fundo para baixo
    if (this.y > limit) {
      this.y = pos; // Reposiciona o fundo para criar o loop contínuo
    }
  }
}

class Flower extends Spider {
  respaw() {
    this.y = -300; // Reposiciona a flor no topo
    this.x = Math.random() * (400 - 0); // Posição X aleatória
  }
}

class Text {
  draw(text, x, y, color) {
    canvas.font = "40px Arial"; // Fonte e tamanho do texto
    canvas.fillStyle = color; // Cor do texto
    canvas.fillText(text, x, y); // Desenha o texto na posição definida com x e y
  }
}
