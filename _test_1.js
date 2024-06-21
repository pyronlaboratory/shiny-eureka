/**
 * @description Checks if a given value `x` is present in an array `arr` within a
 * given range `start` and `end`. It returns `true` if `x` is found, or `false` otherwise.
 * 
 * @param { array } arr - array that contains the values to be searched for the
 * specified `x` value.
 * 
 * @param { integer } x - value being searched for in the array.
 * 
 * @param { number } start - index of the leftmost element in the array that should
 * be searched for the specified value `x`.
 * 
 * @param { number } end - 2nd index of the array where the target element `x` is located.
 * 
 * @returns { boolean } a boolean value indicating whether the provided element is
 * present in the array within the specified range.
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
 * @description Retrieves the application ID based on the input parameter "sysparm_appName"
 * or "sysparm_appID". If the input is not provided, it returns an empty string.
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
 * @description Takes an array of cells as input, loops through each row, and calculates
 * the number of alive neighbors for each cell. Based on these calculations, it assigns
 * a value to each cell in the next generation.
 * 
 * @param { array } cells - 2D array of cells that will be used to generate the next
 * generation.
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
