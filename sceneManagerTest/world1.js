var player,firstplayer;
//var map;
var xpos , ypos;
var playstate;
var a;
var i;
var imgLoc;
var dR,dB,dG,puzzle,ans,start;


function World1()
{
<<<<<<< HEAD
  //MAKE NODES AND PLACE THEM (X, Y, RADIUS, NODE NUMBER)
  var node0 = new Node(200, 435, 75, 0);
  var node1 = new Node(238, 360, 50, 1);
  var node2 = new Node(283, 257, 50, 2);
  var node3 = new Node(330, 167, 50, 3);
  var node4 = new Node(588, 165, 50, 4);
  var node5 = new Node(581, 258, 50, 5);
  var node6 = new Node(569, 387, 50, 6);
  var node7 = new Node(896, 387, 50, 7);
  var node8 = new Node(862, 257, 50, 8);
  var node9 = new Node(839, 165, 50, 9);
  var node10 = new Node(952, 139, 75, 10);
  var nodeArray = [node0, node1, node2,
                   node3, node4, node5,
                   node6, node7, node8,
                   node9, node10];



  var adjMatrix = [
    [0, 1],
    [1, 0, 2],
    [2, 1, 3],
    [3, 2, 4],
    [4, 3, 5],
    [5, 4, 6],
    [6, 5, 7],
    [7, 6, 8],
    [8, 7, 9],
    [9, 8, 10],
    [10, 9]
  ];

  var player = new Player(node0, player1Piece);
  var puzzle = new Puzzle(world1Questions);//gives the puzzle class the set of world questions
  //var closeButton = new Button(puzzle.x + puzzle.width/2, puzzle.y + puzzle.height/9*8, "close");
  var buttonArray = [];


  this.draw = function()
  {
    //DISPLAY BOARD
    image(this.sceneManager.worldMap1, 0, 0, width, height);

    //PLACE NODES
    for(i = 0; i < nodeArray.length; i++)
=======
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

    var puzzle = new Puzzle(world1Questions);//gives the puzzle class the set of world questions
    var buttonArray = [];
    var ans = 0;
    var xpos=nodesLocation[playstate][0];
    var ypos=nodesLocation[playstate][1];

    puzzle.initializeQuestion(3);//tells puzzle what question to display

    this.draw = function()
>>>>>>> 4221bc599c87190c438581d398bbb5ed4691d9c8
    {
        //DISPLAY BOARD
        image(this.sceneManager.worldMap1, 0, 0, width, height);
        if(playstate == 11 ){
            playstate=0;
            //puzzle.visible = true;
        }


        if(dR.mouseIsOver && mouseIsPressed){
        //if(dR.onMousePressed){
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

        checkoverlap();

        mouseIsPressed=false;
        drawSprites();

        puzzle.display(playstate);


    }

    this.mousePressed = function()
    {
      //CHECKS IF CLICKED INSIDE A BUTTON
      for(i = 0; i < puzzle.buttonArray.length; i++)
      {
        if(puzzle.buttonArray[i].clicked(mouseX, mouseY))
        {
          puzzle.buttonArray[i].setSelected();
        }
      }



    }

    //checks to see if player has reached coordinates and set velocity to 0 so that it can stop moving.
    function checkoverlap() {
        if (player.overlapPoint(xpos, ypos))
        {


            player.setVelocity(0, 0);

            //puzzle.display(playstate);



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

    function goToNext()
    {
      playstate++;
      setxy();
      movePlayer();
      puzzle.initializeQuestion(playstate);
    }






}
