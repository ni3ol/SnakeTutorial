//Draws apple and snake to screen
var draw = function(snakeToDraw, apple) 
{
  var drawableSnake = { color: "green", pixels: snakeToDraw };
  var drawableApple = { color: "red", pixels: [apple] };
  var drawableObjects = [drawableSnake, drawableApple];
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

var segmentFurtherForwardThan = function(index, snake) 
{
  if (snake[index - 1] === undefined) {
    return snake[index];
  } else {
    return snake[index - 1];
  }
}

var moveSnake = function(snake) 
{
  return snake.map(function(oldSegment, segmentIndex) {
    var newSegment = moveSegment(oldSegment);
    newSegment.direction = segmentFurtherForwardThan(segmentIndex, snake).direction;
    return newSegment;
  });
}

var advanceGame = function() 
{
  snake = moveSnake(snake);
  if (CHUNK.detectCollisionBetween(snake, CHUNK.gameBoundaries())) {
    CHUNK.endGame();
    CHUNK.flashMessage("Whoops! you hit a wall!");
  }
  draw(snake, apple);
}

var changeDirection = function(direction) 
{
  snake[0].direction = direction;
}

var apple = { top: 8, left: 10 };
//Represents snake. Creates length of snake using array/hash map
var snake = [{ top: 1, left: 0, direction: "down" }, { top: 0, left: 0, direction: "down" }];
CHUNK.executeNTimesPerSecond(advanceGame, 1);
CHUNK.onArrowKey(changeDirection);