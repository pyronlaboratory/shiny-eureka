
/**
 * @description Searches an array for a specific element `x`. It returns `true` if
 * `x` is found in the array between `start` and `end`, inclusive, and `false` otherwise.
 * 
 * @param { array } arr - array to be searched for the target value `x`.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the left side of the range to search for the
 * specified value `x`.
 * 
 * @param { integer } end - 2nd index of the array that the function searches for the
 * specified value `x`.
 * 
 * @returns { boolean } a boolean value indicating whether the element `x` is present
 * in the array `arr` between indices `start` and `end`.
 */
const search = (arr, x, start, end) => {
  if (start > end) return false;
  let mid = Math.floor((start + end) / 2);
  if (arr[mid] === x) return true;
  if (arr[mid] > x) {
    return search(arr, x, start, mid - 1);
  } else {
    return search(arr, x, mid + 1, end);
  }
};
/**
 * @description Retrieves and returns an application ID based on a parameter passed
 * from a previous function call.
 * 
 * @returns { string } a unique identifier for the specified business application.
 */
const getApplicationID = () => {
  var appID = "";
  gs.log("appid: " + this.getParameter("sysparm_appName"), "pipeline");
  var grAppID = new GlideRecord("cmdb_ci_business_app");
  if (grAppID.get(this.getParameter("sysparm_appname"))) {
    appID = grAppID.number.toString();
    gs.log("appid: " + appID, "pipeline");
  }
 return appID;
}

/**
 * @description Takes an array of cells as input and generates a new generation of
 * cells based on the rules of the Conway's Game of Life. It iterates through each
 * cell, considers its neighbors, and determines if it is alive or dead in the next
 * generation. The output is a new array of cells with the same size as the input.
 * 
 * @param { array } cells - 2D array of cells, which is iterated over and processed
 * in the function to generate the next generation of cells.
 * 
 * @returns { array } an array of arrays representing the next generation of a cellular
 * automaton.
 */
function newGeneration(cells) {
  const nextGeneration = []
  for (let i = 0; i < cells.length; i++) {
    const nextGenerationRow = []
    for (let j = 0; j < cells[i].length; j++) {
      let neighbourCount = 0
      if (i > 0 && j > 0) neighbourCount += cells[i - 1][j - 1]
      if (i > 0) neighbourCount += cells[i - 1][j]
      if (i > 0 && j < cells[i].length - 1)
        neighbourCount += cells[i - 1][j + 1]
      if (j > 0) neighbourCount += cells[i][j - 1]
      if (j < cells[i].length - 1) neighbourCount += cells[i][j + 1]
      if (i < cells.length - 1 && j > 0) neighbourCount += cells[i + 1][j - 1]
      if (i < cells.length - 1) neighbourCount += cells[i + 1][j]
      if (i < cells.length - 1 && j < cells[i].length - 1)
        neighbourCount += cells[i + 1][j + 1]
      const alive = cells[i][j] === 1
      const cellIsAlive =
        (alive && neighbourCount >= 2 && neighbourCount <= 3) ||
        (!alive && neighbourCount === 3)
      nextGenerationRow.push(cellIsAlive ? 1 : 0)
    }
    nextGeneration.push(nextGenerationRow)
  }
  return nextGeneration
}
