/* Turtle travels distance moves[i] and then rotates 90deg.
 * Turtle dies if it touches a previously traveled point.
 *
 * SOLUTION:
 * As long as turtle keeps traveling longer distances it survives.
 * If it travels a shorter distance than its second last distance
 * then it is doomed.  It must then keep traveling shorter and shorter 
 * distances until death.
 * 
 * The limit for the shorter distance is the distance traveled two moves ago.
 *
 * There is a special case during the transition from longer to shorter moves.
 * Just for the next move, the allowable distance might need to be shortened.
 */

"use strict";
function solution1(moves) {
  var penultimateMoveTests = ['collision', mustBeLonger, mustBeShorter]
     ,currentTest
     ,drawLine
     ,currentMoveDistance
     ,penultimateMoveDistance
     ,previousMoveDistances;

  enableNextTest();
  drawLine = setupDrawing();
  setupInitialDistances();

  for (var i = 0, j = moves.length; i < j; i += 1) {
    makeMove();
    drawLine(currentMoveDistance);

    if (failed(currentTest(currentMoveDistance, penultimateMoveDistance))) {
      enableNextTest();
      if (currentTest === 'collision') {
        return [i + 1, previousMoveDistances];
      } else {
        handleTransition();
      }
    } 
  }

  function handleTransition() {
    var gapDistance = penultimateMoveDistance - previousMoveDistances[0];
    if (currentMoveDistance >= (gapDistance)) {
      shortenNextAllowableDistance();
    }

    function shortenNextAllowableDistance() {
      previousMoveDistances[3] = previousMoveDistances[3] - previousMoveDistances[1];
    }
  }

  function makeMove() {
    currentMoveDistance = moves[i];
    previousMoveDistances.shift();
    previousMoveDistances.push(currentMoveDistance);
    penultimateMoveDistance = previousMoveDistances[2];
  }

  function setupInitialDistances() {
    currentMoveDistance = 0;
    penultimateMoveDistance = 0;
    previousMoveDistances = [0, 0, 0, 0, 0];
  }

  function mustBeLonger(currentMoveDistance, penultimateMove) {
    return (currentMoveDistance > penultimateMove);
  }

  function mustBeShorter(currentMoveDistance, penultimateMove) {
    return (currentMoveDistance < penultimateMove);
  }

  function failed(testResult) {
    return (testResult === false);
  }

  function enableNextTest() {
    penultimateMoveTests.push(penultimateMoveTests.shift());
    currentTest = penultimateMoveTests[0];
  }

  function setupDrawing() {
    var lineFunctions = [left, up, right, down]
       ,canvas = document.getElementById('canvas')
       ,prevX
       ,prevY
       ,ctx = canvas.getContext('2d');
    
    canvas.width=document.body.clientWidth - 10;
    canvas.height=document.body.scrollHeight - 10;
    prevX = canvas.width / 2;
    prevY = canvas.height / 2;
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);

    function up(amt) {
      prevY = prevY - amt;
      ctx.lineTo(prevX, prevY);
    }
    function down(amt) {
      prevY = prevY + amt;
      ctx.lineTo(prevX, prevY);
    }
    function left(amt) {
      prevX = prevX - amt;
      ctx.lineTo(prevX, prevY);
    }
    function right(amt) {
      prevX = prevX + amt;
      ctx.lineTo(prevX, prevY);
    }

    return function(amt) {
      ctx.moveTo(prevX, prevY);
      lineFunctions.push(lineFunctions.shift());
      lineFunctions[0](amt);
      ctx.stroke();
    };
  }

  return 0;
}
