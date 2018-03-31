


function World1()
{
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
  var puzzle = new Puzzle(world1Questions);
  var closeButton = new Button(puzzle.x + puzzle.width/2, puzzle.y + puzzle.height/9*8, "close");

  this.draw = function()
  {
    //DISPLAY BOARD
    image(this.sceneManager.worldMap1, 0, 0, width, height);

    //PLACE NODES
    for(i = 0; i < nodeArray.length; i++)
    {
      nodeArray[i].display();
    }

    //DISPLAY PLAYER
    player.display();

    //DISPLAY POP-UP
    puzzle.display(player.currentNode);

    //DISPLAY BUTTON
    closeButton.display();

  }

  this.mousePressed = function()
  {
    //CHECKS ALL NODES FOR A CLICK
    for(i = 0; i < nodeArray.length; i++)
    {
      //CHECK IF CLICKED INSIDE OF A NODE
      if(nodeArray[i].clicked(mouseX, mouseY))
      {
        this.adjSearch(nodeArray[i]);
        return;
      }
    }

    //CHECK IF CLOSE BUTTON IN PUZZLE IS CLICKED
    if(closeButton.clicked(mouseX, mouseY))
    {
      puzzle.dismiss();
      closeButton.dismiss();
    }
  }

  //MOVES THE PLAYER AND SETS POP_UP AND CLOSE BUTTON TO VISIBLE
  this.adjSearch = function(targetNode)
  {

    //TRAVERSE THE ADJACENCY MATRIX AT THE
    //PLAYERS CURRENT NODE INDEX,
    //IF TARGET NODE IS ADJACENT, MOVE THE PLAYER
    let r = player.currentNode.number;
    let c = targetNode.number;

    for(i = 1; i < adjMatrix[r].length; i++)
    {
      if(adjMatrix[r][i] == c)
      {
        player.move(targetNode);
        this.currentNode = targetNode;
        puzzle.setPosition(targetNode);
        puzzle.visible = true;
        closeButton.visible = true;
        clear();
        return;
      }
    }
  }





}
