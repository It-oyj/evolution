var PLAY = 1;
var END = 0;
var PAUSE = -1;
var gameState = PLAY;

var cell, cellrunnig, cellcollided;
var ground, invisibleGround, groundImage, backgg, bg;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1;
var obstacle1, backg;
var cellin, cool;
var yes, no;
var yeah, nope;

var score = 0;



localStorage["HighestScore"] = 0;

function preload() {
  cellrunning = loadImage("cell.png");
  cellcollided = loadImage("sadcell.png");

  groundImage = loadImage("ground.jpg");
  backgg = loadImage("backg.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("stone.png");
  obstacle2 = loadImage("obs.png");
  obstacle3 = loadImage("obss.png");
  obstacle4 = loadImage("obsss.png");
  obstacle5 = loadImage("obsssss.png");
  obstacle6 = loadImage("obssssssss.png");
  cellin = loadImage("cellin.png");
  yes = loadImage("y.png");
  no = loadImage("n.png");

  ;

}

function setup() {
  createCanvas(1000, 600);
  backg=createSprite(500,300);
  backg.addImage("ok",backgg)
  backg.x = backg.width / 2;
  backg.velocityX=-5;
  backg.scale =2.2;

  cell = createSprite(80, 430, 10, 10);

  cell.addImage("running", cellrunning);
  cell.addImage("collided", cellcollided);
  cell.scale = 0.5;

  cool = createSprite(450, 250, 555, 1014);
  cool.visible = false;
  cool.addImage("ainwai", cellin);
  cool.scale = 1;

  yeah = createSprite(100, 200, 20, 20);
  yeah.addImage("yo", yes);
  nope = createSprite(500, 200, 20, 20);
  nope.addImage("nah", no)
  ground = createSprite(500, 580, 1000, 10);
  ground.scale = 1;


  ground.x = ground.width / 2;
  ground.velocityX = -(6 + 3 * score / 100);





  invisibleGround = createSprite(500, 590, 1000, 7);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();


  score = 0;
}

function draw() {

  background(255);

  text("Score: " + score, 500, 50);

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    ground.velocityX = -(6 + 3 * score / 100);

    if (keyDown("space") && cell.y >= 159) {
      cell.velocityY = -12;
    }

    cell.velocityY = cell.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    console.log(backg.x);
    if (backg.x < 0) {
      backg.x = backg.width / 2;
    }

    cell.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();

    if (obstaclesGroup.isTouching(cell)) {
      gameState = END;
    }
  }
  else if (gameState === PAUSE) {
    
    backg.velocityX=0;
    ground.velocityX = 0;
    cell.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    console.log("Reached in pause state");
  }
  else if (gameState === END) {


    //set velcity of each game object to 0
    ground.velocityX = 0;
    cell.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    //change the trex animation
    cell.changeAnimation("collided", cellcollided);

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    if (mousePressedOver(reset)) {
      reset();
    }

  }
  drawSprites();
  if (score === 1000) {
    gameState = PAUSE;
    cool.visible = true;
  }
  if (score === 10) {
    text("is cell the smallest unit of life", 50, 50);
    gameState = PAUSE;
  }

}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = cell.depth;
    cell.depth = cell.depth + 1;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }


}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(300, 450, 10, 40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3 * score / 100);

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
      default: break;
    }

    //assign scale and lifetime to the obstacle  
    obstacle.scale = 0.5

    obstacle.lifetime = 300;
    //add each obstacle to the groups
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  gameState = PLAY;


  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  cell.changeAnimation("running", cellrunning);


  score = 0;

}
// yes/no question in text form
// 2 sprites yes/No
//count variable to check how many answer were correct
//when question comes go to pause state
////mouse pressedover yes/no incremenet count if yes
//after 5 questions tell him score
//if count>3,"you are genius", and just show more tissue as image now
//baaki telegram p discuss kr lio jo puchna ho