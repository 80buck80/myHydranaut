var gameWidth;
var gameHeight;
var bkImage;
var hydra;
var worldsMap;
var worldMap1;
var player1Piece;//temp player token
var nodeImageArr;
var questionsArr;

class Node
{
    constructor(x, y, radius, number)
    {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.number = number
    }

    display()
    {
      noStroke();
      noFill();
      ellipse(this.x, this.y, this.radius);
    }

    //CHECK IF CLICK WAS MADE INSIDE THE CIRCLE
    clicked(x, y)
    {
      let d = dist(x, y, this.x, this.y);
      if(d < this.radius)
      {
        return true;
      }
    }
}


//PLAYER CLASS
class Player
{
  constructor(currentNode, player1Piece)
  {
    this.x = currentNode.x - 15;
    this.y = currentNode.y - 50;
    this.width = 30;
    this.height = 50;
    this.piece = player1Piece;
    this.currentNode = currentNode;
  }

  display()
  {

    image(this.piece,this.x, this.y, this.width, this.height);
  }

  move(targetNode)
  {

    this.currentNode = targetNode;
    this.x = targetNode.x - 15;
    this.y = targetNode.y - 50;
    this.display();
  }
}

class Puzzle
{
  constructor()
  {
    this.currentNode;
    this.x = width/4;
    this.y = height/4;
    this.width = 700;
    this.height = 300;
    this.radius = 20;
    this.visible = false;
    // this.questions = ['Going on the space adventure requires that your spaceship is NOT broken. After an inspection of the ship you find that you ship’s rockets are not working. Will you be able to go on the space adventure?', 'Sample Question 2', 'Sample Question 3'];
    this.buttonX = this.x + this.width/2;
    this.buttonY = this.y + this.height/9*8;
    this.buttonWidth = 80;
    this.buttonHeight = 25;
    this.buttonRadius = 5;

  }

  setPosition(targetNode)
  {
    this.currentNode = targetNode;
  }

  display()
  {
    if(this.visible)
    {
      //POP UP
      fill(10, 10, 10, 200);
      stroke(0, 100, 150);
      strokeWeight(3);
      rect(this.x, this.y, this.width, this.height, this.radius);

      //PUZZLE TEXT
      strokeWeight(0);
      fill(255);
      textSize(24);
      switch(this.currentNode.number)
      {
        case 1:
              text(this.questions[0].toString(), this.x + 20, this.y + 25, 700, 300);
              break;
        case 2:
              text(this.questions[1].toString(), this.x + 20, this.y + 25);
              break;
        case 3:
              text(this.questions[2].toString(), this.x + 20, this.y + 25);
              break;

      }



      //BUTTON
      this.buttonX = this.x + this.width/2;
      this.buttonY = this.y + this.height/9*8;
      this.buttonWidth = 80;
      this.buttonHeight = 25;
      this.buttonRadius = 5;
      rectMode(CENTER);
      rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight, this.buttonRadius);

      //BUTTON TEXT
      strokeWeight(0);
      fill(0, 100, 150)
      textSize(24);
      textAlign(CENTER);
      text('close', this.buttonX, this.buttonY + 7);
    }
  }

  dismiss()
  {
    clear();
    this.visible = false;
  }

  //CHECK IF CLICK WAS MADE INSIDE THE BUTTON
  clicked(x, y)
  {

    //let r = dist(x, y, this.buttonX, this.buttonY);
    var dx = abs(x - this.buttonX);
    var dy = abs(y - this.buttonY);
    if(dx <= this.buttonWidth && dy <= this.buttonHeight)
    {
      return true;
    }
  }


}



function preload()
{

    //load all images
    bkImage = loadImage('images/indexBG.jpg');
    hydra = loadImage('images/hydra.png');
    worldsMap = loadImage('images/worldsMap.png');
    worldMap1 = loadImage('images/full-world.png');
    player1Piece = loadImage('images/gamePiece.png');//load player piece (434X720)

}

function setup()
{
    var cnv = createCanvas(1280,720);
    var windowCenterX = (windowWidth - width) / 2;
    var windowCenterY = (windowHeight - height) / 2;
    cnv.position(windowCenterX, windowCenterY);


    // //CREATE THE SCENE MANAGER
    var mgr = new SceneManager();

    //LOAD ALL IMAGES INTO THE SCENE MANAGER
    mgr.bkImage = bkImage;
    mgr.hydra = hydra;
    mgr.worldsMap = worldsMap;
    mgr.worldMap1 = worldMap1;
    mgr.player1Piece = player1Piece;

    //LOAD QUESTIONS FROM JSON FILE
    loadJSON("questions.json", loadQuestionArray);


    //DONT KNOW WHAT THIS DOES
    mgr.wire();

    //SWITCH TO THE FRONT PAGE
    mgr.showScene(FrontPage);
}

function windowResized() {
  centerCanvas();
}

function loadQuestionArray(question)
{
  for(i = 0; i < question.length; i++)
  {
    questionsArr[i] = question[i];
  }
}
