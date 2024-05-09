
/**
 * @description Searches for an element `x` in a given array `arr` within a specified
 * range `start` to `end`. It returns `true` if `x` is found, otherwise it recursively
 * calls itself until the end of the array is reached.
 * 
 * @param { array } arr - array whose elements are being searched for the specified
 * value `x`.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { number } start - index of the leftmost element in the array that should
 * be searched for the specified value `x`.
 * 
 * @param { number } end - 2nd index of the array to be searched, indicating the last
 * index at which the search should stop.
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
 * @description Retrieves the application ID from a parameter or a database based on
 * the provided name.
 * 
 * @returns { integer } a unique identifier for an application.
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
 * @description Takes an array of cells as input, where each cell represents the state
 * (alive or dead) of a cell in a grid. The function generates a new generation of
 * cells based on the current generation and neighboring cells' states.
 * 
 * @param { array } cells - 2D grid of cells to be simulated, and each row of the
 * grid contains the state of the cell (alive or dead) as a binary number.
 * 
 * @returns { array } an array of alive cells in the next generation, generated based
 * on the given cells.
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
