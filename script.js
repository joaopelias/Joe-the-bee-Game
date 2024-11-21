var canvas = document.getElementById('canvas').getContext("2d");

var bg = new Bg(0,0,500,900, "assets/bg.png")
var flower = new Flower(0,0,50,50, "assets/flower1.png")
var bg2 = new Bg(0,-900,500,900, "assets/bg.png")
var bee = new Bee(200,500,100,80, "assets/bee1.png");
var spider = new Spider(100,100,100,100, "assets/spider1.png");

var text_points = new Text();
var text_lifes = new Text();
var gameover = new Text();

var play = true;

document.addEventListener("keydown", function(event){
  if (event.key === "a"){
    bee.dir = -3;
  }
  if (event.key === "d"){
    bee.dir = 3;
  }
});

document.addEventListener("keyup", function(event){
  if (event.key === "a"){
    bee.dir = 0;
  }
  if (event.key === "d"){
    bee.dir = 0;
  }
});

function collides() {
  if (bee.collide(spider)){
    spider.respaw();
    bee.lifes -= 1;
  }

  if (bee.collide(flower)){
    flower.respaw();
    bee.pts += 1;
  }
}

function gameOver(){
  if(bee.lifes <= 0){
    play = false;
  }
}

function draw() {
  bg.draw();
  bg2.draw();
  if (play){
    bee.draw();
    spider.draw();
    flower.draw();
    text_points.draw(bee.pts, 240, 100, "white");
    text_lifes.draw(bee.lifes, 40, 100, "white");
  }else {
    gameover.draw("GameOver", 150,450, "white");
  }
}

function update() {
  bg.move(3, 900, 0);
  bg2.move(3, 0, -900);
  if(play){
    bee.move();
    bee.animation("bee", 4);
    spider.move();
    spider.animation("spider", 4);
    flower.move();
    flower.animation("flower", 2);
    collides();
    gameOver();
  }

}

function main() {
  canvas.clearRect(0,0,500,900);
  update();
  draw();
}

setInterval(main, 10);
