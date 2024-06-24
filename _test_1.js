
/**
 * @description Determines if a specific value `x` is present in an array `arr`. It
 * first checks if `start` is greater than `end`, then calculates the midpoint of the
 * range `start..end` and compares the value at that index to `x`. If it's equal, the
 * function returns `true`, otherwise it recursively calls itself with the updated range.
 * 
 * @param { array } arr - array to be searched for the target value `x`.
 * 
 * @param { integer } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the left side of the range to search for the
 * given value `x` within.
 * 
 * @param { integer } end - 2nd endpoint of the range within which the given target
 * value `x` is searched for in the array `arr`.
 * 
 * @returns { boolean } a boolean value indicating whether the specified element
 * exists within the given range of an array.
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
 * @description Retrieves the application ID from the given parameter or default value
 * based on the system parameter. It logs the app ID to the pipeline for tracking
 * purposes and returns the retrieved app ID.
 * 
 * @returns { integer } a string representing the ID of the specified application.
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
 * @description Generates a new generation of cells based on the current state of the
 * cells, using the neighbors of each cell to determine its fate (alive or dead). It
 * takes an array of cells as input and returns an array of alive or dead cells in
 * the next generation.
 * 
 * @param { array } cells - 2D grid of live and dead cells, which is used to calculate
 * the number of alive neighbors for each cell in the current generation.
 * 
 * @returns { array } an array of arrays representing the next generation of cells,
 * where each cell's state (alive or dead) is determined by its current state and the
 * number of alive neighbors it has.
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
