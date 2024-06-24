/**
 * @description Performs a binary search for an element `x` in an array `arr` within
 * a given range `start` to `end`. It returns `true` if `x` is found, and `false` otherwise.
 * 
 * @param { array } arr - array whose elements are being searched for the given `x`
 * value.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the left boundary of the subarray to search within.
 * 
 * @param { number } end - 2nd index of the array where the target value `x` is
 * located, and it is used to determine the range of values to search within the array.
 * 
 * @returns { boolean } a boolean value indicating whether the specified element is
 * present in the array between the starting and ending indices.
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
 * @description Retrieves an application ID from a CI business application database
 * based on its name and logs the result to the pipeline log.
 * 
 * @returns { string } an application ID based on the input parameters.
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
 * @description Takes an array of cells as input, loops through each row of cells,
 * and calculates the number of neighbors for each cell in that row. Based on these
 * calculations, it assigns a value of 1 or 0 to each cell in the next generation.
 * 
 * @param { array } cells - 2D array of cells to be simulated and evolved over time
 * through the new generation process defined by the function.
 * 
 * @returns { array } an array of arrays, where each inner array represents the state
 * of a cell in the next generation.
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
