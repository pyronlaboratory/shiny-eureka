
/**
 * @description Takes an array, a target value, and two indices as input. It checks
 * if the target value is present in the array by comparing it to the middle element
 * of the array, and recursively searches for the value in the remaining parts of the
 * array if it is not found at the middle index.
 * 
 * @param { array } arr - array that is searched for the specified `x`.
 * 
 * @param { integer } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the left edge of the range of values to search
 * within the array.
 * 
 * @param { integer } end - 2nd index of the array that the function should search
 * for the specified value `x`.
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
 * @description Retrieves and returns the application ID based on given parameters.
 * 
 * @returns { string } a string representing the application ID.
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
 * @description Takes an array of cell states as input and generates the next generation
 * of cells by iterating over each row, counting the number of alive neighbors, and
 * setting the state of each cell based on its current state and the number of alive
 * neighbors it has.
 * 
 * @param { array } cells - 2D array of cells to be iterated over and modified in the
 * new generation.
 * 
 * @returns { array } a new generation of cells, where each cell's state (alive or
 * dead) is determined based on its neighbors and the number of alive neighbors.
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
