
/**
 * @description Takes an array, a target value `x`, and two indices `start` and `end`.
 * It returns `true` if the target value is found in the array between `start` and
 * `end`, otherwise it recursively searches the left or right half of the array.
 * 
 * @param { array } arr - 2D array that contains the elements to be searched for the
 * given `x` value.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the left half of the array to search from, and
 * it must be greater than or equal to the index of the right half.
 * 
 * @param { integer } end - 2nd half of the array that should be searched for the
 * given `x` value.
 * 
 * @returns { boolean } a boolean value indicating whether the specified element `x`
 * exists within the given array range.
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
 * @description Retrieves and returns the application ID based on the provided parameters.
 * 
 * @returns { string } a unique identifier for an application.
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
 * @description Generates a new population by iterating over the current generation's
 * rows, calculating the number of alive neighbors and setting the corresponding cell
 * to alive or dead based on certain conditions.
 * 
 * @param { array } cells - 2D grid of living and dead cells to be simulated, with
 * each cell located at a position (i, j) in the grid.
 * 
 * @returns { array } a new generation of cells, represented as an array of alive or
 * dead cells.
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
