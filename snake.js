var drawSnake = function(snakeToDraw) 
{
	//Defines the length and colour of snake
	var drawableSnake = { color: "yellow", pixels: snake };
	//Array/object drawn
	var drawableObjects = [drawableSnake];
	CHUNK.draw(drawableObjects);
}

var moveSegment = function(segment) 
{
  if (segment.direction === "down") {
    return { top: segment.top + 1, left: segment.left }
  } else if (segment.direction === "up") {
    return { top: segment.top - 1, left: segment.left }
  } else if (segment.direction === "right") {
    return { top: segment.top, left: segment.left + 1 }
  } else if (segment.direction === "left") {
    return { top: segment.top, left: segment.left - 1 }
  }
  return segment;
}

var moveSnake = function(snake) 
{
  var oldSegment = snake[0];
  var newSegment = moveSegment(oldSegment);
  newSegment.direction = oldSegment.direction;
  var newSnake = [newSegment];
  return newSnake;
}

var advanceGame = function() 
{
  snake = moveSnake(snake);
  if (CHUNK.detectCollisionBetween(snake, CHUNK.gameBoundaries())) {
    CHUNK.endGame();
    CHUNK.flashMessage("Whoops! you hit a wall!");
  }
  drawSnake(snake);
}

var changeDirection = function(direction) 
{
  snake[0].direction = direction;
}

//Represents snake. Creates length of snake using array/hash map
var snake = [{ top: 0, left: 0, direction: "down"}];
CHUNK.executeNTimesPerSecond(advanceGame, 1);
CHUNK.onArrowKey(changeDirection);