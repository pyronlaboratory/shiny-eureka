
/**
 * @description Evaluates if a specific element `x` is present in an array `arr`
 * within a given range `start` to `end`. It recursively searches for the element by
 * comparing it with the middle index of the range and then recursively searching
 * left or right depending on the result.
 * 
 * @param { array } arr - array to be searched for the specified value `x`.
 * 
 * @param { integer } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the leftmost element in the array that must
 * be greater than or equal to the target element `x`.
 * 
 * @param { integer } end - 2nd index of the array that the function searches for the
 * specified value `x`.
 * 
 * @returns { boolean } a boolean value indicating whether the specified element
 * exists in the array.
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
 * @description Retrieves an application ID based on a provided parameter and stores
 * it in the `appID` variable for further use.
 * 
 * @returns { integer } an application ID value.
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
 * @description Generates a new generation of cells by iterating over the current
 * generation, keeping track of live neighbors and alive cells, and assigning an
 * integer value to each cell based on these considerations.
 * 
 * @param { array } cells - 2D array of cells to be generated into the next generation,
 * where each cell is represented by a number between 0 and 1 that indicates its state
 * (alive or dead).
 * 
 * @returns { array } an array of booleans representing the alive or dead state of
 * each cell in the next generation.
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
