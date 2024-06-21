/**
 * @description Checks if an element exists within a sorted array between two indices
 * `start` and `end`. It does so by finding the middle index `mid`, checking if the
 * element is present at that index, and recursively searching before or after the
 * middle index if necessary.
 * 
 * @param { array } arr - array to be searched for the specified `x` value.
 * 
 * @param { integer } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the leftmost element in the array that should
 * be searched for the specified value `x`.
 * 
 * @param { integer } end - 2nd index of the array where the target value `x` is located.
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
 * @description Retrieves an application ID based on a parameter passed in. If the
 * parameter is present and contains a valid value, it returns the corresponding
 * application ID as a number string.
 * 
 * @returns { string } an integer representing the application ID.
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
 * @description Takes an array of cells as input and returns a new generation of
 * cells, where each cell is marked alive or dead based on its neighbors' state and
 * the local neighborhood rules.
 * 
 * @param { array } cells - 2D array of cells, where each cell can be in one of two
 * states (alive or dead), and the function generates the next generation of cells
 * based on the current state of the cells in the input array.
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
