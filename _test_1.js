
/**
 * @description Determines whether a given element `x` is present in an array `arr`
 * within a specified range `start` to `end`. It recursively searches for the element
 * by checking if it is the midpoint of the range, and then recursively checks the
 * range on either side of the midpoint if it is not found there.
 * 
 * @param { array } arr - array whose elements are being searched for the specified
 * `x`.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { number } start - index of the left half of the array to search in.
 * 
 * @param { number } end - 2nd index of the array where the given value `x` is to be
 * searched for.
 * 
 * @returns { boolean } a boolean value indicating whether the specified element is
 * present in the array.
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
 * @description Retrieves the application ID based on the system parameter `sysparm_appName`
 * or `sysparm_appid`. If the parameter is not provided, it returns an empty string.
 * 
 * @returns { string } a unique identifier for the specified application.
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
 * @description Generates a new generation of cells based on the current generation,
 * considering the alive state and neighbor counts of each cell.
 * 
 * @param { array } cells - 2D grid of cells, where each cell can be alive or dead,
 * and is used to generate the next generation of cells through a process of reproduction
 * and death based on the neighbors of each cell.
 * 
 * @returns { array } an array of alive cells in the next generation, determined by
 * the cell's current state and its neighbors.
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
