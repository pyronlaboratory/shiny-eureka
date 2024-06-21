/**
 * @description Searches for an element `x` in an array `arr` between two indices
 * `start` and `end`. It returns `true` if `x` is found, otherwise it recursively
 * searches the left or right half of the range.
 * 
 * @param { array } arr - array whose elements are being searched for the specified
 * value `x`.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { number } start - index of the left side of the range to search for the
 * target value `x`.
 * 
 * @param { number } end - 2nd limit of the search range.
 * 
 * @returns { boolean } a boolean value indicating whether the element `x` is present
 * in the array `arr` between `start` and `end`.
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
 * @description Retrieves an application ID based on a given parameter and logs it
 * to the pipeline for tracking purposes.
 * 
 * @returns { integer } an integer representing the application ID.
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
 * @description Generates a new population by iterating through existing cells,
 * calculating the number of alive neighbors and replacing each cell with an alive
 * state if conditions are met.
 * 
 * @param { array } cells - 2D array of cells to be evolved through the generations,
 * with each cell being represented by an integer value between 0 and 1 that indicates
 * whether the cell is alive or dead.
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
