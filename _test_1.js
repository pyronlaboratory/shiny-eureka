
/**
 * @description Takes an array and a target value `x`, as well as the starting and
 * ending indices `start` and `end`. It recursively searches for the value in the
 * given range. If found, it returns true, otherwise it returns false.
 * 
 * @param { array } arr - array to be searched for the specified `x`.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the leftmost element that must be greater than
 * or equal to the target value `x`.
 * 
 * @param { integer } end - 2nd half of the array being searched for the given value
 * `x`.
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
 * @description Retrieves and returns the application ID based on the input parameters.
 * It logs the retrieved value to the pipeline for further processing.
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
 * @description Takes an array of cells as input, loops through each row of cells,
 * and updates the state of each cell based on its neighbors' states. It then returns
 * the next generation of cells.
 * 
 * @param { array } cells - 2D grid of cells, with each cell value represented by a
 * number between 0 and 1, which is used to generate the next generation of cells
 * through a simple probabilistic algorithm.
 * 
 * @returns { array } a new generation of cells, where each cell is represented as a
 * binary number indicating whether it is alive or dead.
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
