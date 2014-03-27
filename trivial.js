function solution2(A) {
  var visited = [1]
      ,x = 0
      ,y = 0
      ,moves = 0
      ,up = function() {y += 1;}
      ,right = function() {x += 1;}
      ,down = function() {y -= 1;}
      ,left = function() {x -= 1;}
      ,moveFunctions = [left, up, right, down];


  for (var m = 0, j = A.length; m < j; m += 1) {
    moveFunctions.push(moveFunctions.shift());
    if (isGoodMove(A[m], moveFunctions[0]) === false) {
      return [moves, visited];
    }
  }

  function isGoodMove(distance, moveFunction) {
    var xidx, yidx, pairidx;
    moves += 1;
    for (var i = 1; i <= distance; i += 1) {
      moveFunction();
      getPairIndex();

      if (visited[pairidx] === 1) {return false;}
      visited[pairidx] = 1;
    }

    function getPairIndex() {
      xidx = (x >= 0 ? 2 * x : -2 * x - 1);
      yidx = (y >= 0 ? 2 * y : -2 * y - 1);
      pairidx = (501 * xidx) + yidx;
    }

    return true;
  }

  return 0;
}

