
/**
 * @description Determines if a given value `x` is present in an array `arr` within
 * a specified range `start` to `end`. It returns `true` if the value exists, otherwise
 * it recursively searches for the value in half of the remaining range.
 * 
 * @param { array } arr - array to be searched for the specified value `x`.
 * 
 * @param { integer } x - value being searched for in the array.
 * 
 * @param { number } start - index of the left-hand side of the halfway point of the
 * array being searched.
 * 
 * @param { number } end - 2nd index of the array that the function searches for the
 * given `x`.
 * 
 * @returns { boolean } a boolean value indicating whether the target element is found
 * within the given range.
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
 * @returns { string } a unique identifier for a business application.
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
 * @description Takes an array of cell values as input, loops through each row of
 * cells, and calculates the number of alive neighbors for each cell. Based on the
 * count of alive neighbors and the initial value of the cell, it returns a new
 * generation of cells.
 * 
 * @param { array } cells - 2D array of cells to be generated into the next generation.
 * 
 * @returns { array } a two-dimensional array representing the next generation of
 * cells, with each cell value indicating whether it is alive or dead.
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
