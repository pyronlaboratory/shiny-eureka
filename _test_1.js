/**
 * @description Takes an array, a target value, and two indices as input. It returns
 * true if the target value is found within the range of the indices, false otherwise.
 * 
 * @param { array } arr - array that contains the searched element.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the left boundary of the range to search for
 * the target value `x` within the array `arr`.
 * 
 * @param { integer } end - 2nd index of the array where the target value (x) must
 * be located.
 * 
 * @returns { boolean } a boolean value indicating whether the specified element
 * exists in the given array.
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
 * @description Retrieves the application ID based on the provided parameter and logs
 * the result for pipelined processing.
 * 
 * @returns { integer } a unique identifier for the specified business application.
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
 * @description Takes an array of cells as input, loops through each row, and determines
 * if each cell is alive based on its neighbors' state. It then generates a new
 * generation by pushing a row of alive or dead cells to the output array.
 * 
 * @param { array } cells - 2D grid of cells, whose state (alive or dead) and neighbors
 * are used to generate the next generation of cells in the population.
 * 
 * @returns { array } an array of alive cells in the next generation.
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
