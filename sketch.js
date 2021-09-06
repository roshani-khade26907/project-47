var game;
var gameState=0;
var form,player;
var database;
var bg,bg2;
var playerCount=0;
var player1,player2;
var players=[];
var bucket,bucket2;
var allPlayers;
var dropImage,drop;
var bDropImage,BDrop;
var dropsG,BDropsG;

function preload(){
  bg=loadImage("assets/nature background.jpg");
  bg2=loadImage("assets/rainy_bg.jpg");
  bucket=loadImage("assets/bucket.png");
  bucket2=loadImage("assets/bucket2.png");
  dropImage=loadImage("assets/drop.png");
  bDropImage=loadImage("assets/DirtyDrop.png")
}

function setup() {
  createCanvas(1400,600);
  database=firebase.database();

  dropsG=new Group();
  BDropsG=new Group();
  
  game=new Game();
  game.getState();
  game.start();
  

  
}

function draw() {
  background(bg);  

  if (playerCount===2)  {
    game.update(1);
  }

  if(gameState===1){
    game.play();
  }

  if(gameState===2){
    game.end();
  }
  
  
}