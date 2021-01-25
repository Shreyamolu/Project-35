//const....

var balloon;
var database, position;


function preload()
{
  bgImg = loadImage("sprites/bgImg.png");
  balloonImg1 = loadImage("sprites/HAB-1(Y).png");
  balloonImg2 = loadImage("sprites/HAB-2(R).png");
  balloonImg3 = loadImage("sprites/HAB-3(G).png");
}

function setup() {
  createCanvas(1000,1000);
  //createSprite(400, 200, 50, 50);

  database = firebase.database();

  balloon = createSprite(50,450,20,20);
  balloon.addImage(balloonImg1);

  var balloonPosition = database.ref ('balloon/position');
  balloonPosition.on("value", readHeight, showError);
}

function draw() {
  background(bgImg);  

  textSize(20);
  fill("red");
  stroke(2);
  text("You can use the Arrow Keys to move the Hot Air Balloon", 10, 50);

  if(keyDown(LEFT_ARROW))
  {
    balloon.x = balloon.x - 10;
  }
  if(keyDown(RIGHT_ARROW))
  {
    balloon.x = balloon.x + 10;
  }
  if(keyDown(UP_ARROW))
  {
    balloon.y = balloon.y - 10;
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImg2);
    balloon.scale = balloon.scale -0.01;
  }
  if(keyDown(DOWN_ARROW))
  {
    balloon.y = balloon.y + 10;
  }

  drawSprites();
}

function updateHeight(x,y)
{
    database.ref('balloon/position').set({
      'x' : height.x + x,
      'y' : height.y + y
    })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError()
{
    console.log("Error in writing to the database!")
}