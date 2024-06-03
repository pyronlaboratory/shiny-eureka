/**
 * @description Performs a binary search for an element `x` within a range `start`
 * and `end`. It checks if the element is located at the middle index `mid`, compares
 * it with `x`, and recursively calls itself if necessary.
 * 
 * @param { array } arr - array to be searched for the specified `x` value.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the left half of the array to search from.
 * 
 * @param { integer } end - 2nd index of the array that the function searches for the
 * given value `x`.
 * 
 * @returns { boolean } a boolean value indicating whether the target element is
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
 * It logs the app ID in the pipeline for auditing purposes.
 * 
 * @returns { string } a unique identifier for an application.
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
 * @description Generates a new population of cells based on the current population,
 * considering cell neighbors and their counts for each cell. It returns the next
 * generation of cells as an array of alive or dead statuses.
 * 
 * @param { array } cells - 2D grid of cells, where each cell can be alive or dead,
 * and is used to generate the next generation of cells through a process of probability
 * calculation based on the number of living neighbors.
 * 
 * @returns { array } an array of arrays representing the next generation of cells,
 * where each cell is alive or dead based on its neighbors and the number of alive neighbors.
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
