
/**
 * @description Searches for a specific element `x` in an array `arr` between `start`
 * and `end`, returning `true` if found and `false` otherwise.
 * 
 * @param { array } arr - 1D array whose elements are searched for the specified value
 * `x`.
 * 
 * @param { number } x - searched element in the array.
 * 
 * @param { integer } start - index of the first element to be searched in the array.
 * 
 * @param { integer } end - 2nd point where the value of `x` is searched for in the
 * array.
 * 
 * @returns { boolean } a boolean value indicating whether the specified element is
 * present in the array between the start and end indices.
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
 * @description Retrieves and returns the application ID based on a provided parameter
 * or a default value.
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
 * @description Generates a new generation of cells based on their current state and
 * the states of their neighbors, using the rules of the Conway's Game of Life.
 * 
 * @param { array } cells - 2D grid of cells, with each cell value represented by a
 * number between 0 and 1, which is used to calculate the next generation of cells
 * through a neighborhood-based algorithm.
 * 
 * @returns { array } a new generation of cells, represented as a 2D array of booleans
 * indicating whether each cell is alive or not.
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
