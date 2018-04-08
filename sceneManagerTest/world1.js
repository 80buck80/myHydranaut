var player;
//var map;
var xpos , ypos;
var playstate,questionState;
var a;
var i;
var imgLoc;


function World1()
{
    var nodesLocation = [
        [200,423,20],
        [200,423,21],
        [200,423,1],
        [250,330,2],
        [290,229,22],
        [290,229,3],
        [338,137,4],
        [599,155,5],
        [579,263,23],
        [579,263,6],
        [570,395,7],
        [905,375,24],
        [905,375,8],
        [860,225,9],
        [837,130,10],
        [960,125,11]
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


    var puzzle = new Puzzle(world1Questions);//gives the puzzle class the set of world questions
    var buttonArray = [];
    var ans = 0;
    console.log("init"+nodesLocation[playstate][2]);
    xpos=nodesLocation[playstate][0];
    ypos=nodesLocation[playstate][1];
    puzzle.initializeQuestion(nodesLocation[playstate][2]);
    //puzzle.initializeQuestion(nodesLocation[playstate+20][2]);//tells puzzle what question to display

    this.draw = function()
    {
        //DISPLAY BOARD
        image(this.sceneManager.worldMap1, 0, 0, width, height);
        if(playstate == 15 ){
            playstate=0;
            //puzzle.visible = true;
        }


        checkoverlap();

        mouseIsPressed=false;
        drawSprites();
        //console.log("playstate= "+playstate);
        puzzle.display(nodesLocation[playstate][2]);


    }

    this.mousePressed = function()
    {
      //CHECKS IF CLICKED INSIDE A BUTTON
      for(i = 0; i < puzzle.buttonArray.length; i++)
      {
          console.log("button array size is" +puzzle.buttonArray.length );
        if(puzzle.buttonArray[i].clicked(mouseX, mouseY))
        {
          puzzle.buttonArray[i].setSelected();

          //CHECK IF THE BUTTON CLICKED IS THE NEXT BUTTON
          //IF YES, REMOVE POP-UP AND MOVE PLAYER TO NEXT NODE
          if(i == puzzle.buttonArray.length - 1)
          {
            puzzle.visible = false;//remove the pop-up

            goToNextNode();//move player to next node

            puzzle.visible = true;//show next puzzle
              break;
          }
        }
      }




    }

    //checks to see if player has reached coordinates and set velocity to 0 so that it can stop moving.
    function checkoverlap() {
        if (player.overlapPoint(xpos, ypos))
        {
            console.log("checkoverlap = "+playstate);
            player.setVelocity(0, 0);
        }
    }
    //make player move to new attraction poing.
    function movePlayer()
    {
        console.log("xpos = "+xpos +"ypos = "+ypos);
        player.attractionPoint(4, xpos, ypos);

    }
    //set x and y posing
    function setxy()
    {
        console.log(" playstate = " + playstate+ "xpos = "+nodesLocation[playstate-1][0] + "ypos = "+ nodesLocation[playstate-1][1] );
        //console.log(`playstate = ${playstate}`);
        xpos=nodesLocation[playstate][0];
        ypos=nodesLocation[playstate][1];

    }

    function goToNextNode()
    {
      playstate++;
      setxy();
      movePlayer();
      puzzle.initializeQuestion(nodesLocation[playstate][2]);
    }
}
