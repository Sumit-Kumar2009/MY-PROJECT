  
var spaceshipImg, spaceship;
var Planet1Img, Planet1, Planet1Group;
var space, spaceImg;
var laser,laser2,laserImg,laserGroup,laserSound;
var invisibleBlock,invisibleBlockGroup;
var gameState = "play";
var destroy = 0;
var score = 0;


function preload(){
  spaceImg = loadImage("Space.png");
  spaceshipImg = loadImage("Spaceship1.png");
  spookySound = loadSound("spooky.wav");
  Planet1Img = loadImage("Planet1.png");
  laserImg = loadImage("laser.png");
  laserSound = loadSound("LaserSound.wav");
}

function setup() {
  edges = createEdgeSprites();
  createCanvas(windowWidth,windowHeight);
  space = createSprite(width/2,height/2);
  space.addImage(spaceImg);
  space.velocityY = 1;
  space.scale = 0.3;


  Planet1Group = new Group();
  laserGroup = new Group();
 // invisibleBlockGroup = new Group();

  spaceship = createSprite(width/2,height/2,50,50);
  spaceship.scale = 0.15;
  spaceship.addImage(spaceshipImg);
}


function draw() {
  background(0);

  
  if (gameState === "play") {
    
    if(keyDown("left_arrow")){
        spaceship.x = spaceship.x - 3;

      // write a code to move left when left arrow is pressed
    }
    if(keyDown("right_arrow")){
  
          spaceship.x = spaceship.x + 3;

      // write a code to move left when right arrow is pressed
      
    }
    if(keyWentDown("up_arrow")){
  
         spaceship.velocityY = -10;

      // write a code to move up when space arrow is pressed
    }   

    if(keyWentUp("space")){
         
         laserSound.play();
         shootLasers();
    }
  
         spaceship.velocityY = spaceship.velocityY + 0.8;

      //write a condition for infinte scrolling tower
      if(space.y > height/2){
        space.y= (height/2)-50;
      }

      spawnPlanets();

      spaceship.collide(edges[0]);
      spaceship.collide(edges[1]);

  
//write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.S
    if(Planet1Group.isTouching(spaceship) || spaceship.y > height){
      spaceship.destroy();
      gameState = "end";
    }

    if(laserGroup.isTouching(Planet1Group)){
      Planet1Group.destroyEach();
      laserGroup.destroyEach();
      score+=1;
    }
    
  
  drawSprites();
}

  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", (width/2)-75,(height/2)+15);
  }
 
  stroke("yellow");
  fill("yellow");
  textSize(15);
  text("Score:"+score,width-75,30)}
function spawnPlanets()
 {
  //write code here to spawn the clouds
  if (frameCount % 280 === 0) {
    var Planet1 = createSprite(100,10);
    //var invisibleBlock = createSprite(100,15);
    //invisibleBlock.width = Planet1.width;
    //invisibleBlock.height = 2;
    //add the random function
    Planet1.x = Math.round(random(50,width-50));
    //invisibleBlock.x = Planet1.x;

    Planet1.addImage(Planet1Img);
    Planet1.scale = 0.1;

    Planet1.velocityY = 2.5;
    //invisibleBlock.velocityY = 7.5;


    //change the depth of the ghost and door
    
     
    spaceship.depth=Planet1.depth;
    spaceship.depth +=1
    Planet1.scale=0.05;
    
    //assign lifetime for the  door, climber and invisible block

    Planet1.lifetime = height;
    Planet1.setCollider("circle",0,0,950);
    //Planet1.debug = true;

    //invisibleBlock.lifetime = height;

    
    //add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block
    Planet1Group.add(Planet1);
    //invisibleBlock.debug = true;
    //invisibleBlockGroup.add(invisibleBlock);
 
  }
}

function shootLasers()
{
  laser = createSprite(100,100);
  laser.x = spaceship.x+28  ;
  laser.y = spaceship.y+2;
  laser.velocityY =  -10;
  laser.scale = 0.25 ;
  laser.addImage(laserImg);


  laser2 = createSprite(100,100);
  laser2.x = spaceship.x-28  ;
  laser2.y = spaceship.y+2;
  laser2.velocityY =  -10;
  laser2.scale = 0.25 ;
  laser2.addImage(laserImg);


  laserGroup.add(laser);
  laserGroup.add(laser2);

  laser.lifetime = height;
  laser2.lifetime = height;
}

     

