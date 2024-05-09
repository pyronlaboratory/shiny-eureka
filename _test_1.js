
/**
 * @description Determines whether a specific element `x` is present in an array `arr`
 * within a specified range `start` to `end`. It recursively searches for the element
 * by comparing its value with the middle element of the range and then recursively
 * searching on either side of it.
 * 
 * @param { array } arr - 2D array that contains the searched value.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the array where the search should start.
 * 
 * @param { integer } end - 2nd half of the array that the function searches for the
 * specified value `x`.
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
 * @description Retrieves and returns the application ID based on the given parameters.
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
 * @description Takes an array of cells as input, loops through each cell, and
 * calculates the probability of it being alive in the next generation based on its
 * current state and the states of its neighbors. It returns the next generation of
 * cells as an array of probabilities.
 * 
 * @param { array } cells - 2D array of cells that will be used to generate the next
 * generation.
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
