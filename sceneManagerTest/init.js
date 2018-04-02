var gameWidth;
var gameHeight;
var bkImage;
var hydra;
var worldsMap;
var worldMap1;
var player1Piece;//temp player token
var nodeImageArr;
var world1Questions;


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
  constructor(questions)
  {
    this.currentNode;
    this.x = width/4;
    this.y = height/4;
    this.width = 700;
    this.height = 300;
    this.radius = 20;
    this.visible = true;
    this.questions = questions;
    this.question;//stores the current question
    this.buttonArray = [];//stores adn array of buttons for current question
  }

  // setPosition(targetNode)
  // {
  //   this.currentNode = targetNode;
  // }

  initializeQuestion(targetNode)
  {
    this.currentNode = targetNode;//set new current node

    switch(this.currentNode.number)
    {
      case 0:
            this.question = this.questions[0].welcome;
            break;
      case 1:
            this.question = this.questions[1].question;
            break;
      case 2:
            this.question = this.questions[2].question;
            break;
      case 3:
            this.question = this.questions[3].question;
            break;
      case 4:
            this.question = this.questions[4].question;
            break;
      case 5:
            this.question = this.questions[5].question;
            break;
      case 6:
            this.question = this.questions[6].question;
            break;
    }


    buttonArray = [];//clear the button array
    this.makePuzzleButtons();//fill the button array


  }

  display(currentNode)
  {
    this.currentNode = currentNode;

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
      text(this.question, this.x + 10, this.y + 25, 700, 300);

      //BUTTONS
      for(i = 0; i < buttonArray.length; i++)
      {
        buttonArray[i].display();
      }
    }
  }

  dismiss()
  {
    clear();
    this.visible = false;
  }

  //CREATE BUTTONS FOR PUZZLES
  makePuzzleButtons()
  {
    var nodeNumber = this.currentNode.number;//current node number
    var buttonColumns;//holds puzzle divisions for buton placement
    var strLengthArr = [];//holds string lengths to be compaired
    var maxLength;//holds the largest string length of an answer button

    //DIVIDE PUZZLE INTO COLUMNS FOR BUTTONS TO SIT IN
    buttonColumns = puzzle.width/8;

    //PLACE BUTTONS DEPENDING ON IF THERE ARE 0, 2 OR 4 ANSWER OPTIONS
    //MAKE AND STORE BUTTON OBJECTS INTO buttonArr[]
    switch(questions[nodeNumber].optionNum)
    {
      case 0:
            break;
      case 2:
            strLengthArr.push(questions[nodeNumber].option1.length);
            strLengthArr.push(questions[nodeNumber].option2.length);
            maxLength = max(strLengthArr);
            this.buttonArray.push(new Button(puzzle.x + buttonColumns*3, puzzle.y + puzzle.height/9*8, maxLength, questions[nodeNumber].option1));
            this.buttonArray.push(new Button(puzzle.x + buttonColumns*5, puzzle.y + puzzle.height/9*8, maxLength, questions[nodeNumber].option2));
            break;

      case 3:
            strLengthArr.push(questions[nodeNumber].option1.length);
            strLengthArr.push(questions[nodeNumber].option2.length);
            strLengthArr.push(questions[nodeNumber].option3.length);
            maxLength = max(strLengthArr);
            this.buttonArray.push(new Button(puzzle.x + buttonColumns*2, puzzle.y + puzzle.height/9*8, maxLength, questions[nodeNumber].option1));
            this.buttonArray.push(new Button(puzzle.x + buttonColumns*4, puzzle.y + puzzle.height/9*8, maxLength, questions[nodeNumber].option2));
            this.buttonArray.push(new Button(puzzle.x + buttonColumns*6, puzzle.y + puzzle.height/9*8, maxLength, questions[nodeNumber].option3));
            break;

      case 4:
            strLengthArr.push(questions[nodeNumber].option1.length);
            strLengthArr.push(questions[nodeNumber].option2.length);
            strLengthArr.push(questions[nodeNumber].option3.length);
            strLengthArr.push(questions[nodeNumber].option4.length);
            maxLength = max(strLengthArr);
            this.buttonArray.push(new Button(puzzle.x + buttonColumns*1, puzzle.y + puzzle.height/9*8, maxLength, questions[nodeNumber].option1));
            this.buttonArray.push(new Button(puzzle.x + buttonColumns*3, puzzle.y + puzzle.height/9*8, maxLength, questions[nodeNumber].option2));
            this.buttonArray.push(new Button(puzzle.x + buttonColumns*5, puzzle.y + puzzle.height/9*8, maxLength, questions[nodeNumber].option3));
            this.buttonArray.push(new Button(puzzle.x + buttonColumns*7, puzzle.y + puzzle.height/9*8, maxLength, questions[nodeNumber].option4));
            break;
    }
  }
}

class Button
{
  constructor(x, y, width, str)
  {
    //BUTTON LOCATION
    this.buttonX = x;
    this.buttonY = y;

    //BUTTON SIZE
    this.buttonWidth = width/2*24 + 10;
    this.buttonHeight = 30;
    this.buttonRadius = 5;

    //BUTTON TEXT
    this.str = str;

    //BUTTON VISIBILITY
    this.visible = true;

    //BUTTON SELECTED STATE
    this.selected = false;
  }

  display()
  {
    if(this.visible)
    {
      if(this.selected)
      {
        fill(0, 100, 150, 200);
        stroke(0, 100, 150);
        strokeWeight(3);
        rectMode(CENTER);
        rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight, this.buttonRadius);

        strokeWeight(0);
        fill(255, 255, 255);
        textSize(24);
        textAlign(CENTER);
        text(this.str, this.buttonX, this.buttonY + 9);
      }
      else
      {
        fill(10, 10, 10, 200);
        stroke(0, 100, 150);
        strokeWeight(3);
        rectMode(CENTER);
        rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight, this.buttonRadius);

        strokeWeight(0);
        fill(0, 100, 150);
        textSize(24);
        textAlign(CENTER);
        text(this.str, this.buttonX, this.buttonY + 9);
      }
    }
  }

  //CHECK IF CLICK WAS MADE INSIDE THE BUTTON
  clicked(x, y)
  {
    var dx = abs(x - this.buttonX);
    var dy = abs(y - this.buttonY);
    if(dx <= this.buttonWidth && dy <= this.buttonHeight)
    {
      return true;
    }
  }

  dismiss()
  {
    clear();
    this.visible = false;
  }

  setSelected()
  {
    if(this.selected)
    {
      this.selected = false;
    }
    else
    {
      this.selected = true;
    }
  }

}



function preload()
{

    //load all images
    bkImage = loadImage('images/indexBG.jpg');
    hydra = loadImage('images/hydra.png');
    worldsMap = loadImage('images/worldsMap.png');
    worldMap1 = loadImage('images/World1.png');
    player1Piece = loadImage('images/gamePiece.png');//load player piece (434X720)

    //LOAD WORLD QUESTIONS FROM JSON FILE
    world1Questions = loadJSON("world1Questions.json");
}

function setup()
{
    var cnv = createCanvas(1280,720);
    var windowCenterX = (windowWidth - width) / 2;
    var windowCenterY = (windowHeight - height) / 2;
    cnv.position(windowCenterX, windowCenterY);


    //CREATE THE SCENE MANAGER
    var mgr = new SceneManager();

    //LOAD ALL IMAGES INTO THE SCENE MANAGER
    mgr.bkImage = bkImage;
    mgr.hydra = hydra;
    mgr.worldsMap = worldsMap;
    mgr.worldMap1 = worldMap1;
    mgr.player1Piece = player1Piece;

    //DONT KNOW WHAT THIS DOES
    mgr.wire();

    //SWITCH TO THE FRONT PAGE
    mgr.showScene(FrontPage);
}

function windowResized() {
  centerCanvas();
}
