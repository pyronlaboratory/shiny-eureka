
/**
 * @description Determines if a specific value `x` is present within an array `arr`.
 * It does so by first checking if `x` is equal to the middle element of the array,
 * then recursively searching for `x` in the left and right halves of the array if
 * it is not found in the middle.
 * 
 * @param { array } arr - array that is being searched for the specified value `x`.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the left edge of the subarray to search within.
 * 
 * @param { integer } end - 2nd point in the array to search from after the start point.
 * 
 * @returns { boolean } a boolean indicating whether the value `x` is present in the
 * array between `start` and `end`, inclusive.
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
 * @description Retrieves the application ID based on a given parameter and logs it
 * to the pipeline log for debugging purposes.
 * 
 * @returns { integer } a unique identifier for the given business application.
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
 * cells based on the neighbors of each cell, using a set of rules to determine if a
 * cell is alive or dead in the next generation.
 * 
 * @param { array } cells - 2D array of cells, which is used to generate the next
 * generation of cells by iterating over each cell and updating its state based on
 * its neighbors.
 * 
 * @returns { array } an array of booleans representing the alive cells in the next
 * generation.
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
