
/**
 * @description Checks if a specific element `x` is present in an array `arr` between
 * two given indices `start` and `end`. It returns `true` if `x` is found, and `false`
 * otherwise.
 * 
 * @param { array } arr - array to be searched for the specified `x` value.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the left bound of the subarray to be searched
 * for the specified value `x`.
 * 
 * @param { integer } end - 2nd limit of the array to search, and it is used to
 * determine when the search should stop.
 * 
 * @returns { boolean } a boolean value indicating whether the specified element
 * exists in the array within the provided range.
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
 * @description Retrieves the application ID from a parameter or a database record
 * based on the given name and logs the result to the pipeline.
 * 
 * @returns { number } a string representing the application ID.
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
 * @description Takes an array of alive cells as input and returns a new generation
 * of alive cells, calculated based on the neighbors of each cell.
 * 
 * @param { array } cells - 2D array of living cells, which is used to generate the
 * next generation of cells through a process of iterative calculation and logic.
 * 
 * @returns { array } an array of alive cells in the next generation, determined by
 * the neighborhood counts and cell state.
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
