
/**
 * @description Searches an array for a given value `x`. It returns true if the value
 * is found at a specific position within the range specified, otherwise it recursively
 * searches the left and right parts of the range.
 * 
 * @param { array } arr - array whose elements are being searched for the specified
 * value `x`.
 * 
 * @param { integer } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the leftmost element in the array that should
 * be searched for the target value `x`.
 * 
 * @param { number } end - 2nd index of the array where the value `x` is searched.
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
 * @description Retrieves the application ID based on the given parameters and logs
 * the result in the pipeline log.
 * 
 * @returns { integer } a unique identifier for the given application.
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
 * @description Generates a new generation of a cellular automata system based on the
 * current state of the cells. It iterates through each cell, calculates its neighbors'
 * states, and updates the cell's state based on the neighbors' states and a set of
 * rules. The resulting next generation is returned in an array of booleans representing
 * the alive/dead state of each cell.
 * 
 * @param { array } cells - 2D grid of cells, where each cell can be in one of two
 * states (alive or dead), and the function uses this grid to generate a new generation
 * of cells.
 * 
 * @returns { array } an array of alive cells in the next generation, determined by
 * cellular automaton rules.
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
