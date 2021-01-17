var helicopterIMG, helicopterSprite, packageSprite, packageIMG;
var packageBody, ground;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
  helicopterIMG = loadImage("helicopter.png");
  packageIMG = loadImage("package.png");
}

function setup() {
  createCanvas(800, 700);
  rectMode(CENTER);

  packageSprite = createSprite(Math.round(random(50, 750)), 80, 10, 10);
  packageSprite.addImage(packageIMG);
  packageSprite.scale = 0.2;
  packageSprite.debug = true;

  helicopterSprite = createSprite(packageSprite.x, 200, 10, 10);
  helicopterSprite.addImage(helicopterIMG);
  helicopterSprite.scale = 0.6;
  helicopterSprite.debug = true;

  groundSprite = createSprite(width / 2, height - 35, width, 10);
  groundSprite.shapeColor = color(255);

  engine = Engine.create();
  world = engine.world;

  options = { restitution: 0, isStatic: true };

  packageBody = Bodies.circle(packageSprite.x, 200, 5, options);
  World.add(world, packageBody);

  //Create a Ground
  ground = Bodies.rectangle(width / 2, 650, width, 10, { isStatic: true });
  World.add(world, ground);

  boxPosition = width / 2 - 100;
  boxY = 610;

  boxleftSprite = createSprite(boxPosition, boxY, 20, 100);
  boxleftSprite.shapeColor = color(255, 0, 0);

  boxLeftBody = Bodies.rectangle(boxPosition + 20, boxY, 20, 100, {
    isStatic: true,
  });
  World.add(world, boxLeftBody);

  boxBase = createSprite(boxPosition + 100, boxY + 40, 200, 20);
  boxBase.shapeColor = color(255, 0, 0);

  boxBottomBody = Bodies.rectangle(boxPosition + 100, boxY + 45 - 20, 200, 20, {
    isStatic: true,
  });
  World.add(world, boxBottomBody);

  boxleftSprite = createSprite(boxPosition + 200, boxY, 20, 100);
  boxleftSprite.shapeColor = color(255, 0, 0);

  boxRightBody = Bodies.rectangle(boxPosition + 200 - 20, boxY, 20, 100, {
    isStatic: true,
  });
  World.add(world, boxRightBody);

  Engine.run(engine);
}

function draw() {
  rectMode(CENTER);
  background(0);

  packageSprite.x = packageBody.position.x;
  packageSprite.y = packageBody.position.y;

  if (keyDown("RIGHT_ARROW")) {
    helicopterSprite.x += 5;
    if (packageBody.isStatic === true) {
      packageBody.position.x = helicopterSprite.x;
    }
  }

  if (keyDown("LEFT_ARROW")) {
    helicopterSprite.x += -5;
    if (packageBody.isStatic === true) {
      packageBody.position.x = helicopterSprite.x;
    }
  }

  if (keyDown("DOWN_ARROW") && packageBody.isStatic === true) {
    packageBody.position.x = helicopterSprite.x;
    Matter.Body.setStatic(packageBody, false);
  }

  drawSprites();
}
