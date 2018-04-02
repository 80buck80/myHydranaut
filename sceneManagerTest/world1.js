var player,firstplayer;
//var map;
var xpos , ypos;
var playstate;
var a;
var i;
var imgLoc;
var dR,dB,dG,puzzle,ans,start;
var buttonArray;


function World1()
{
    var nodesLocation = [
        [200,423],
        [250,330],
        [290,229],
        [338,137],
        [599,155],
        [579,263],
        [570,395],
        [905,375],
        [860,225],
        [837,130],
        [960,125]
    ];

    var me = this;
    start = 0;

    playstate=0;
    mouseIsPressed=false;
    player = createSprite(200, 423);
    player.addAnimation("normal", p1);
    //set max speed for when sprite moves.
    player.maxSpeed = 5;
    player.scale = .5;
    //set velocity to 0 to make sure its not moving.
    player.velocity.y = 0;
    player.velocity.x = 0;


    dR=createSprite((width/2)-200,600);
    dR.addAnimation("normal",dRed);
    dR.scale=.3
    dR.mouseActive=true;
    dB=createSprite((width/2),600);
    dB.addAnimation("normal",dBlue);
    dB.scale=.3
    dB.mouseActive=true;

    dG=createSprite((width/2)+200,600);
    dG.addAnimation("normal",dGreen);
    dG.scale=.3
    dG.mouseActive=true;
   // puzzle = new Puzzle();

  //var player = new Player(node0, player1Piece);
   puzzle = new Puzzle(world1Questions);//gives the puzzle class the set of world questions
  var closeButton = new Button(puzzle.x + puzzle.width/2, puzzle.y + puzzle.height/9*8, "close");
  buttonArray = [];


  this.draw = function()
  {
    //DISPLAY BOARD
    image(this.sceneManager.worldMap1, 0, 0, width, height);
      if(playstate == 11 ){
          playstate=0;
          //puzzle.visible = true;
      }

      ans=0;
    //DISPLAY POP-UP


    //DISPLAY BUTTON
    buttonArray = this.puzzleButtons(puzzle, world1Questions);
      if(dR.mouseIsOver && mouseIsPressed){
          console.log("dR mouse");
          dR.visible=false;
          ans = 3;
      }
      if(dB.mouseIsOver && mouseIsPressed){
          console.log("dB mouse");
          dB.visible=false;
          ans=1;

      }
      if(dG.mouseIsOver && mouseIsPressed){
          console.log("dG mouse");
          dG.visible=false;
      }
      puzzle.display(playstate);
    if(buttonArray.length !== 0)
    {
      for(i = 0; i < buttonArray.length; i++)
      {
        buttonArray[i].display();
      }
    }
      checkoverlap();

      mouseIsPressed=false;
      drawSprites();
  }
  function Question(){

    if(ans==1){
        advanceState();

    }
    if(ans==3)
        advanceState();

}





    this.mousePressed = function(){
    //if state is at last node reset it. (we can have this to move to next world)
    // if(playstate == 11 ){
    //     playstate=0;
    //     //puzzle.visible = true;
    // }
    // else {
        playstate++;
   // }
    //set new x and y coordinates
    setxy();
    //console.log(` mouse x = ${mouseX}  y = ${mouseY} playstate = ${playstate}`);
    //set new attraction point for player to move to new x and y coordinates
    movePlayer();


}

    //checks to see if player has reached coordinates and set velocity to 0 so that it can stop moving.
    function checkoverlap() {
        if (player.overlapPoint(xpos, ypos))
        {
            // if(start==2){
            //     start=0;
            // }

            player.setVelocity(0, 0);
            puzzle.visible = true;
            //puzzle.display(playstate);
            // if(buttonArray.length !== 0)
            //       {
            //         for(i = 0; i < buttonArray.length; i++)
            //         {
            //           buttonArray[i].visible = true;
            //         }
            //       }
           // puzzle.display(playstate,puzzle.visible);
            //if(puzzle.visible)(button.show());

        }
    }
    //make player move to new attraction poing.
    function movePlayer()
    {
        player.attractionPoint(4, xpos, ypos);

        // console.log(`playstate = ${playstate}`);

    }
    //set x and y posing
    function setxy()
    {
        console.log(`playstate = ${playstate}`);
        xpos=nodesLocation[playstate][0];
        ypos=nodesLocation[playstate][1];

    }

  // this.mousePressed = function()
  // {
  //   //CHECKS ALL NODES FOR A CLICK
  //   for(i = 0; i < nodeArray.length; i++)
  //   {
  //     //CHECK IF CLICKED INSIDE OF A NODE
  //     if(nodeArray[i].clicked(mouseX, mouseY))
  //     {
  //       this.adjSearch(nodeArray[i], buttonArray);
  //       return;
  //     }
  //   }
  //
  //   //CHECKS IF CLICKED INSIDE A BUTTON
  //   for(i = 0; i < buttonArray.length; i++)
  //   {
  //     if(buttonArray[i].clicked(mouseX, mouseY))
  //     {
  //       if(buttonArray[i].selected)
  //       {
  //         buttonArray[i].selected = false;
  //       }
  //       else
  //       {
  //         buttonArray[i].selected = true;
  //       }
  //     }
  //    }
  //
  //
  //
  // }

  //MOVES THE PLAYER AND SETS POP_UP AND CLOSE BUTTON TO VISIBLE
  // this.adjSearch = function(targetNode, buttonArray)
  // {
  //
  //   //TRAVERSE THE ADJACENCY MATRIX AT THE
  //   //PLAYERS CURRENT NODE INDEX,
  //   //IF TARGET NODE IS ADJACENT, MOVE THE PLAYER
  //   let r = player.currentNode.number;
  //   let c = targetNode.number;
  //
  //   for(i = 1; i < adjMatrix[r].length; i++)
  //   {
  //     if(adjMatrix[r][i] == c)
  //     {
  //       player.move(targetNode);
  //       this.currentNode = targetNode;
  //       puzzle.setPosition(targetNode);
  //       puzzle.visible = true;
  //
  //       if(buttonArray.length !== 0)
  //       {
  //         for(i = 0; i < buttonArray.length; i++)
  //         {
  //           buttonArray[i].visible = true;
  //         }
  //       }
  //
  //       clear();
  //       return;
  //     }
  //   }
  // }

  //CREATES BUTTONS FOR QUESTIONS
  this.puzzleButtons = function(puzzle, world1Questions)
  {
    //GET CURRENT NODE NUMBER
    var nodeNumber = playstate;

    //GET NUMBEROF ANSWER OPTIONS FROM JSON
    var buttonNumber = world1Questions[playstate].optionNum;

    var buttonColumns;//holds puzzle divisions for buton placement
    var buttonArr = [];//array to hold button objects
    var strLengthArr = [];//holds string lengths to be compaired
    var maxLength;//holds the largest string length of an answer button

    //DIVIDE PUZZLE INTO COLUMNS FOR BUTTONS TO SIT IN
    buttonColumns = puzzle.width/8;

    //PLACE BUTTONS DEPENDING ON IF THERE ARE 0, 2 OR 4 ANSWER OPTIONS
    //MAKE AND STORE BUTTON OBJECTS INTO buttonArr[]
    switch(buttonNumber)
    {
      case 0:
            break;
      case 2:
            strLengthArr.push(world1Questions[playstate].option1.length);
            strLengthArr.push(world1Questions[playstate].option2.length);
            maxLength = max(strLengthArr);
            buttonArr.push(new Button(puzzle.x + buttonColumns*3, puzzle.y + puzzle.height/9*8, maxLength, world1Questions[nodeNumber].option1));
            buttonArr.push(new Button(puzzle.x + buttonColumns*5, puzzle.y + puzzle.height/9*8, maxLength, world1Questions[nodeNumber].option2));
            break;

      case 3:
            strLengthArr.push(world1Questions[playstate].option1.length);
            strLengthArr.push(world1Questions[playstate].option2.length);
            strLengthArr.push(world1Questions[playstate].option3.length);
            maxLength = max(strLengthArr);
            buttonArr.push(new Button(puzzle.x + buttonColumns*2, puzzle.y + puzzle.height/9*8, maxLength, world1Questions[nodeNumber].option1));
            buttonArr.push(new Button(puzzle.x + buttonColumns*4, puzzle.y + puzzle.height/9*8, maxLength, world1Questions[nodeNumber].option2));
            buttonArr.push(new Button(puzzle.x + buttonColumns*6, puzzle.y + puzzle.height/9*8, maxLength, world1Questions[nodeNumber].option3));
            break;

      case 4:
            strLengthArr.push(world1Questions[playstate].option1.length);
            strLengthArr.push(world1Questions[playstate].option2.length);
            strLengthArr.push(world1Questions[playstate].option3.length);
            strLengthArr.push(world1Questions[playstate].option4.length);
            maxLength = max(strLengthArr);
            buttonArr.push(new Button(puzzle.x + buttonColumns*1, puzzle.y + puzzle.height/9*8, maxLength, world1Questions[nodeNumber].option1));
            buttonArr.push(new Button(puzzle.x + buttonColumns*3, puzzle.y + puzzle.height/9*8, maxLength, world1Questions[nodeNumber].option2));
            buttonArr.push(new Button(puzzle.x + buttonColumns*5, puzzle.y + puzzle.height/9*8, maxLength, world1Questions[nodeNumber].option3));
            buttonArr.push(new Button(puzzle.x + buttonColumns*7, puzzle.y + puzzle.height/9*8, maxLength, world1Questions[nodeNumber].option4));
            break;
    }
    return buttonArr;

  }






}
