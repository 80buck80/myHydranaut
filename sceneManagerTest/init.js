var gameWidth;
var gameHeight;
var bkImage;
var hydra;
var worldsMap;
var worldMap1;
var player1Piece;//temp player token
var nodeImageArr;

// var nodeJson;
// var nodeImage;
// var nodeSpriteSheet;


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



function preload()
{

    //load all images
    bkImage = loadImage('images/indexBG.jpg');
    hydra = loadImage('images/hydra.png');
    worldsMap = loadImage('images/worldsMap.png');
    worldMap1 = loadImage('images/full-world.png');
    player1Piece = loadImage('images/gamePiece.png');//load player piece (434X720)

    // nodeImageArr = [loadImage('images/topLeft.png'),
    //                 loadImage('images/topMiddle.png'),
    //                 loadImage('images/topRight.png'),
    //                 loadImage('images/middleLeft.png'),
    //                 loadImage('images/middleMiddle.png'),
    //                 loadImage('images/middleRight.png'),
    //                 loadImage('images/bottomLeft.png'),
    //                 loadImage('images/bottomMiddle.png'),
    //                 loadImage('images/bottomRight.png')];

    // nodeImage =loadImage('images/node-spritesheet.png');
    // nodeJson = loadJSON('images/nodes.json');
    // nodeSpriteSheet = loadSpriteSheet(nodeImage, nodeJson);


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
    //mgr.nodeArray = nodeImageArr;
    //mgr.nodeSpriteSheet = nodeSpriteSheet;


    //DONT KNOW WHAT THIS DOES
    mgr.wire();

    //SWITCH TO THE FRONT PAGE
    mgr.showScene(FrontPage);
}

function windowResized() {
  centerCanvas();
}
