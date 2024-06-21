
/**
 * @description Searches an array for a specific value `x`. It returns true if `x`
 * is found at any index between `start` and `end`, otherwise it recursively searches
 * the left or right half of the range based on the current midpoint.
 * 
 * @param { array } arr - array to be searched for the specified value `x`.
 * 
 * @param { integer } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the leftmost element in the array that should
 * be searched for the specified value `x`.
 * 
 * @param { number } end - 2nd limit of the range for which the array elements are
 * searched for the specified value `x`.
 * 
 * @returns { boolean } a boolean value indicating whether the specified element
 * exists in the given array within the provided range.
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
 * @description Retrieves the application ID based on the given parameter "sysparm_appname"
 * or falls back to using a GlideRecord query to retrieve the app ID from the
 * cmdb_ci_business_app table.
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
 * @description Generates a new generation of cells based on their neighbors' alive
 * status and the current generation's cell value. It creates an array of alive cells,
 * where each element is either 1 (alive) or 0 (dead).
 * 
 * @param { array } cells - 2D array of cells, where each cell is either 0 (dead) or
 * 1 (alive), and it is used to generate the next generation of cells through a process
 * of probability-based reproduction.
 * 
 * @returns { array } an array of arrays representing the next generation of cells,
 * where each inner array represents a cell and contains a value indicating whether
 * the cell is alive or not.
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
