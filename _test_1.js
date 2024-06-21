/**
 * @description Searches for an element `x` in an array `arr` within a specified range
 * `start` to `end`. It returns `true` if `x` is found, otherwise it recursively calls
 * itself with the updated range.
 * 
 * @param { array } arr - array whose elements are being searched for the specified
 * value `x`.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { number } start - index of the left edge of the subarray to search within.
 * 
 * @param { number } end - 2nd index of the array for which we want to find the
 * specified element.
 * 
 * @returns { boolean } a boolean indicating whether the value `x` is present in the
 * array between `start` and `end`.
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
 * @description Retrieves an application ID based on a given parameter and logs the
 * result for debugging purposes.
 * 
 * @returns { string } a string representing the application ID.
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
 * @description Takes an array of cell states as input and returns a new generation
 * of cell states based on a simple evolution rule. The rule is applied to each cell
 * by iterating over its neighbors, counting the number of alive neighbors, and setting
 * the cell's state to 1 if it has at least two or three alive neighbors, otherwise
 * it remains in the current state.
 * 
 * @param { array } cells - 2D grid of living and dead cells that will be evolved in
 * the next generation.
 * 
 * @returns { array } a new generation of cells, with each cell represented as a
 * binary number indicating whether it is alive or dead.
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
