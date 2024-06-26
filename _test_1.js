
/**
 * @description Checks if an element `x` is present in an array `arr` between `start`
 * and `end` inclusive. It does so by dividing the range into two sub-ranges and
 * recursively searching for `x` in each of them until it finds a match or determines
 * that `x` is not present in the given range.
 * 
 * @param { array } arr - array to be searched for the specified value `x`.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { number } start - index of the leftmost element in the array that should
 * be included in the search.
 * 
 * @param { number } end - 2nd limit of the range of values searched for the given
 * target value `x`.
 * 
 * @returns { boolean } a boolean value indicating whether the target element is
 * present in the array.
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
 * @description Retrieves the application ID based on provided parameters and logs
 * the result to the pipeline log.
 * 
 * @returns { integer } a unique identifier for a business application.
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
 * @description Takes an array of cell states as input and generates a new generation
 * of cell states by iterating over each cell, considering its neighbors' states, and
 * updating its own state based on a set of rules.
 * 
 * @param { array } cells - 2D array of cells to be evolved through the simulation,
 * with each cell representing the state of a living or dead cell in the grid.
 * 
 * @returns { array } an array of arrays, where each inner array represents a generation
 * of cells and contains a 0 or 1 representing whether the cell is alive.
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
