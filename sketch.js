var sword,sword_Image,gameOver;
var f,f1_i,f2_i,f3_i,f4_i;
var fruitGroup,enemyGroup;
var enemym,enemy_i;

var score=0;

var swoosh,overSound;

var PLAY=1
var END=0

var position;

var gameState=PLAY;

function preload(){
  sword_Image= loadAnimation("sword.png")
  
  f1_i=loadImage("fruit1.png");
   f2_i=loadImage("fruit2.png");
   f3_i=loadImage("fruit3.png");
   f4_i=loadImage("fruit4.png");
  
  enemy_i=loadAnimation("alien1.png","alien2.png");
  
  gameOver=loadImage("gameover.png");
  
  swoosh=loadSound("knifeSwooshSound.mp3");
  overSound=loadSound("gameover.mp3");
  
 
}

function setup(){
  createCanvas(600,470);
  
  sword=createSprite(300,245,30,30);
  sword.addAnimation("knife",sword_Image);
  sword.scale=0.7;
  
  fruitGroup= createGroup();
  enemyGroup= createGroup();
  
  sword.setCollider("rectangle",0,0,50,50);
  //sword.debug=true;
  
 
  
}

function draw(){
 background("lightblue");

  
  
  if(gameState===PLAY)
{
    
  sword.y=World.mouseY;
  
  sword.x=World.mouseX;
  
fruits();
  enemy();
  
  if(fruitGroup.isTouching(sword))
   {
    fruitGroup.destroyEach();
    score=score+2
     swoosh.play();
   }
     else if(enemyGroup.isTouching(sword))
     {
       gameState=END
     }

  
  }
  
  if(gameState===END)
  {
    sword.addImage('fixed',gameOver);
    sword.x=300;
    sword.y=245;
    
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    
    enemyGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    
    overSound.play();
  }
  
  
  
  
  drawSprites();
  
  text("Score: "+score,300,20);
  
}
  


function fruits()
{
  if(World.frameCount%60===0)
  {
     position = Math.round(random(1,2));
  f=createSprite(500,200,10,10);
  f.scale=0.2
    
    r=Math.round(random(1,4));
    if(r==1)
    {
      f.addImage(f1_i);
    }
     else if(r==2)
    {
      f.addImage(f2_i);
    }
     else if(r==3)
    {
      f.addImage(f3_i);
    }
     else if(r==4)
    {
      f.addImage(f4_i);
    }
  
    if(position==1)
      {
        f.x400=0;
        f.velocityX=-(7+(score/4));
      }
    else
      {
        if(position==2){
          f.x=0;
          f.velocityX=(7+(score/4));
        }
      }
  
  f.y=Math.round(random(40,450));
  

  f.setLifetime=100;
  
  fruitGroup.add(f);
  }
}

function enemy()
{
  if(World.frameCount%200===0)
  {
    enemym=createSprite(500,200,20,20);
    console.log("enemym");
    enemym.scale=10;
    enemym.addAnimation("moving",enemy_i);
    enemym.y=Math.round(random(30,300));
    enemym.velocityX=-(8+(score/10));
    enemym.setLifetime=100;
    
     console.log(enemym.velocityX);
    
    enemyGroup.add(enemym);
  }
}
