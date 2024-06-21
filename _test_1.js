
/**
 * @description Determines whether a specific element exists within an array between
 * two given indices. It recursively searches for the element by comparing it to the
 * middle index and then recursively searching on either side if necessary.
 * 
 * @param { array } arr - array that the function searches for the specified value `x`.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the left side of the range to search for the
 * target element.
 * 
 * @param { number } end - 2nd index of the array where the specified value `x` is
 * searched from left to right.
 * 
 * @returns { boolean } a boolean value indicating whether the target value `x` is
 * present in the given array between `start` and `end`, inclusive.
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
 * @description Retrieves the application ID from a parameter or a database based on
 * the provided `sysparm_appName`. If the app ID is found in the database, it returns
 * the value; otherwise, it returns an empty string.
 * 
 * @returns { integer } a unique identifier for the specified application.
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
 * @description Generates a new generation of a grid by iterating through each cell
 * and updating its state based on neighboring cells' states, following the rules of
 * the Conway's Game of Life.
 * 
 * @param { array } cells - 2D grid of cells that will be simulated and evolved through
 * the generation process defined by the function.
 * 
 * @returns { array } a new row of alive cells in a two-dimensional grid, based on
 * the input cells and their neighbors.
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
