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
