// Tela //
var tela = 1;
var largura = 200;
var altura = 50;
var xMenu = 50;
var yMenu1 = 85;
var yMenu2 = 145;

// Imagens do Jogo //
var fundoI, fundo2, jogador, inimigo, tela, fundo4, fundo5;

// Variaveis do Jogador //
var x = 5;
var y = 300;

// Variaveis do Inimigo //
var base = 25;
var termo = 5;
var raioT = 30;
var xi = 100;
var yi = 120;
var vxo = [];
var vyo = [];
var vtam = [];
var qtObj = 20;

// Variaveis do Disparo //
var xd = 0;
var yd = 0;
var inicialDisparo = false;

// Variaveis de Exposição //
var vida = 3;
var pontos = 0;
var nivel = 1;
var barreiraDePontos = 150;

function preload(){
  fundoI = loadImage("inicio.jpg");
  fundo2 = loadImage("over.jpg");
  fundo3 = loadImage("tela.png");
  jogador = loadImage("jogador.png");
  inimigo = loadImage("morto.png");
  fundo4 = loadImage("bala.png");
  fundo5 = loadImage("baby.png");
}
function setup() {
  createCanvas(500, 400);
    // Quantidade de Inimigos no jogo //
  for(var i = 0; i < qtObj; i++){
    vxo[i] = random(0, 500);
    vyo[i] = random(0, 400);
    vtam[i] = random(40, 50);
  }
}

function draw() {
  textFont('Georgia');
  // Tela do Menu //
  if(tela == 1){
    background(fundoI);
    // Menu com duas opções //
    // Iniciar o jogo //
    textAlign(CENTER);
    textSize(26);
    
    if(mouseX > xMenu && mouseX < xMenu + largura && mouseY > yMenu1 && mouseY < yMenu1 + altura){
      stroke(20);
      fill(20);
      rect(xMenu, yMenu1, largura, altura, 15);
      if(mouseIsPressed){
        tela = 2;
      }
    }
    fill(240);
    noStroke();
    text("Iniciar", 150, 120);
    
    // Informações sobre o jogo //
    if(mouseX > xMenu && mouseX < xMenu + largura && mouseY > yMenu2 && mouseY < yMenu2 + altura){
      stroke(200);
      fill(20);
      rect(xMenu, yMenu2, largura, altura, 15);
      if(mouseIsPressed){
        tela = 3;
      }
    }
    fill(240);
    noStroke();
    text("Informações", 150, 180);
  }
  
  // Jogo em ação //
  else if(tela == 2){
    background(fundo2);
    
    // Personagem e Movimentos do Jogador //
    image(jogador, x, y);
    if(keyIsDown(RIGHT_ARROW)){
       x = x + 5;
       if(x > 400){ // Evitar que o personagem passe do limite
         x = 400;
         
       }
     }
   if(keyIsDown(LEFT_ARROW)){
     x = x - 5;
     if(x < 0){ // Evitar que o personagem passe do limite
      x = 0; 
     }
   } 
    // Disparo //
    if(keyIsDown(CONTROL) && inicialDisparo == false){
      xd = x;
      yd = y;
      inicialDisparo = true;
    }
    if(inicialDisparo == true){
      ellipse(xd, yd, 5, 5);
      yd = yd - 50;
      if(yd < 0){
        inicialDisparo = false;
      }
    }
    // Parte de Inimigos //
        for (var i = 0; i < qtObj; i++) {
      image(inimigo, vxo[i], vyo[i], vtam[i], vtam[i]) // inimigo
      if (dist(vxo[i], vyo[i], x, y) < base + termo) {
        x = 300;
        y = 400;
        vida--;
      }
      vyo[i]++
      if (vyo[i] > 500) {
        vxo[i] = random(25, 640)
        vyo[i] = random(0, -100);
      }
  
  }
    
    //disparos
    for (i = 0; i < qtObj; i++) {
        if (dist(vxo[i], vyo[i], xd, yd) < raioT + termo) {
          vxo[i] = 700;
          vyo[i] = 700;
          pontos = pontos + 1
        }
      }
    
    // Parte de Exposição //
    fill(240);
    textSize(25);
    text('Vidas: ' + vida, 100, 30);
    text('Pontos: ' + pontos, 258, 30);
    text('Nivel: ' + nivel, 400, 30);

    if (pontos >= 10000) {
      tela = 5; 
      inicialDisparo = false
      flag = true;
    }
    if (vida <= 0) {
      tela = 7;
      inicialDisparo = false
      flag = true;
    }
  }
if (tela == 7) { // Game Over
    image(fundo4, 0, 0);
    textSize(18);
    fill(200);
    text('Pressione CONTROL para reiniciar o jogo', 200, 100);
    if (keyIsDown(CONTROL)) {
      tela = 1;
      vida = 3;
      pontos = 0;
      qtObj = 20;
      for (var l = 0; l < qtObj; l++) {
        vxo[l] = random(0, 665);
        vyo[l] = random(-10, -100);
        vtam[l] = random(15, 30);
      }
    }
  }
  else if(tela == 3){
    background(fundo5);
    if (keyIsDown(18)) { //tecla alt
      tela = 1
    }
  
  }
}