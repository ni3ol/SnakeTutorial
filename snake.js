var drawSnake = function(snakeToDraw) 
{
	//Defines the length and colour of snake
	var drawableSnake = { color: "yellow", pixels: snake };
	//Array/object drawn
	var drawableObjects = [drawableSnake];
	CHUNK.draw(drawableObjects);
}

var moveSnake = function(snake) 
{
  var oldSegment = snake[0];
  var newSegment = { top: oldSegment.top + 1, left: oldSegment.left };
  var newSnake = [newSegment];
  return newSnake;
}

var advanceGame = function() 
{
  snake = moveSnake(snake);
  drawSnake(snake);
}

//Represents snake. Creates length of snake using array/hash map
var snake = [{ top: 0, left: 0}];
CHUNK.executeNTimesPerSecond(advanceGame, 1);