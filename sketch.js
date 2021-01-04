var PLAY = 1;
var END = 0;
var gameState = PLAY;
var counterCake = 0;
var counterSmoothie = 0;
var score=0;
var gameOver, restart;
var rand;



function preload()
{
    backgroundImg = loadImage("images/bg1.jpg");
    bunnyImg = loadImage("images/bunny1.png");
    bunnyFull = loadImage("images/bunny3.png")
    pandaImg = loadImage("images/panda2.png");
    pandaFull = loadImage("images/panda3.png");
    smoothieImg = loadImage("images/smoothie.png");
    cakeImg = loadImage("images/cake.png");
    bg2img = loadImage("images/bg2.jpg") 
}

function setup() {
 createCanvas(windowWidth,windowHeight);
 
 bunny = createSprite(1171,482,10,10)
 bunny.addImage(bunnyImg);
 bunny.addAnimation("bunnyFull",bunnyFull)
 bunny.scale = 0.70;

 panda = createSprite(325,442,10,10)
 panda.addImage(pandaImg);
 panda.addAnimation("pandaFull",pandaFull)
 panda.scale = 0.37;

 cakeGroup = new Group();
 smoothieGroup = new Group();

 rand = Math.round(random(1,2))
 
}

function draw() {
  //changing the background
  if(counterSmoothie>=1 && counterCake>=1)
  {
      console.log(bg2img)
      background(bg2img)
      panda.x = 966;
      panda.y = 636;
      panda.scale = 1.5;

      bunny.x = 596;
      bunny.y = 425;
      bunny.scale = 1.5;

      gameState = END;

  }else
  {
    background(backgroundImg);
  }
  if(gameState===PLAY)
  {
    if ((frameCount%30===0))
    {
        rand = Math.round(random(1,2))
        
        if (rand===1)
        {
            var tempCake = spawnCakes()

            if (keyDown("LEFT_ARROW"))
            {
                var tempFood = spawnCakes();
                
                tempFood.velocityX = -6;
                counterCake = counterCake+1
                tempCake.destroy()

                if(counterCake>=1)
                {
                    panda.changeAnimation("pandaFull",pandaFull)
                    panda.scale = 2;
                    
                }
            }
            

        }
        else if (rand===2)
        {
            var tempSmoothie = spawnSmoothies()
            if (keyDown("RIGHT_ARROW"))
            {
                var tempFood = spawnSmoothies();
                tempFood.velocityX = 6;
                counterSmoothie = counterSmoothie+1
                tempSmoothie.destroy()
                
                if(counterSmoothie>=1)
                {
                    bunny.changeAnimation("bunnyFull",bunnyFull)
                    bunny.scale = 2;
                    
                }
                
            }
        }
        
        
    }

    textSize(20)
    fill(0)
    stroke("black")
    text("Panda:" + counterCake,displayWidth/2 -560,displayHeight/2 - 325)
    text("Bunny:" + counterSmoothie,displayWidth/2 + 540,displayHeight/2 - 325)

}
else if(gameState===END)
{
    stroke(0)
    fill(0)
    textSize(66)
    text("GAME OVER",windowWidth/2-200,windowHeight/2)
}

 drawSprites();

}


function spawnSmoothies() {
    //if(frameCount % 60 === 0) {
    var smoothie = createSprite(770,485,10,40);
    //food.velocityX = (6 + 3*score/100);
    smoothie.addImage(smoothieImg);
    
    
    //assign scale and lifetime to the obstacle 
    smoothie.scale = 0.5;
    smoothie.lifetime = 70;
    //add each obstacle to the group
    smoothieGroup.add(smoothie);
    //}
    return smoothie;
}
function spawnCakes() {
    //if(frameCount % 60 === 0) {
    var cake = createSprite(770,485,10,40);
    //food.velocityX = (6 + 3*score/100);
    cake.addImage(cakeImg);
    
    //assign scale and lifetime to the obstacle 
    cake.scale = 0.5;
    cake.lifetime = 70;
    //add each obstacle to the group
    cakeGroup.add(cake);
    //}
    return cake;
}


function reset(){
 gameState = PLAY;
 ground.velocityX = -(6 + 3*score/100);
 gameOver.visible = false;
 restart.visible = false;
 
 obstaclesGroup.destroyEach();
 cloudsGroup.destroyEach();
 
 trex.changeAnimation("running",trex_running);
 
 score = 0;
 
}
