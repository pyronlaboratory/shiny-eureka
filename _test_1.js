/**
 * @description Checks if an element `x` is present in an array `arr`. It first
 * calculates the middle index `mid` of the array, then checks if the element at the
 * middle index is equal to `x`. If it is, the function returns `true`. If not, it
 * recursively calls itself with the starting and ending indices modified accordingly.
 * 
 * @param { array } arr - array whose elements are being searched for the target value
 * `x`.
 * 
 * @param { integer } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the array where the search should begin.
 * 
 * @param { integer } end - 2nd boundary of the array to be searched for the specified
 * value `x`.
 * 
 * @returns { boolean } a boolean indicating whether the value `x` is present in the
 * array between `start` and `end`.
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
 * @description Retrieves and returns the application ID based on a parameter passed
 * from the pipeline.
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
 * @description Generates a new population of cells by iterating over existing cells,
 * calculating the number of alive neighbors and setting the state of each cell based
 * on those calculations.
 * 
 * @param { array } cells - 2D grid of living and dead cells, which is used to calculate
 * the next generation of cells through a process of cell division, migration, and
 * death based on the neighboring cells' states.
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
