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

 * @description Checks if an element exists in a given array by determining its index
 * in the array based on two provided conditions: the starting and ending indices of
 * the array, and the searched element value.
 * 
 * @param { array } arr - array whose elements are being searched for the given `x`.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the leftmost element to be included in the
 * search result.
 * 
 * @param { number } end - 2nd limit of the range over which the algorithm searches
 * for the target value.
 * 
 * @returns { boolean } a boolean value indicating whether the target element is found
 * within the provided range of indices.
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
 * @description Retrieves the application ID based on the input parameter `sysparm_appName`.
 * If the app name is found in the CI business application, it returns the app ID as
 * a number.
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
 * @description Takes an array of cells as input and returns a new generation of
 * cells, where each cell is marked alive or dead based on its neighbors' state and
 * the local neighborhood rules.
 * 
 * @param { array } cells - 2D array of cells, where each cell can be in one of two
 * states (alive or dead), and the function generates the next generation of cells
 * based on the current state of the cells in the input array.
 * 
 * @returns { array } an array of alive cells in the next generation.

/**
 * @description Generates a new generation of cells based on their neighbors' states
 * and alive status, using a set of rules to determine if a cell is alive or not in
 * the next generation.
 * 
 * @param { array } cells - 2D grid of cells to be simulated, with each cell value
 * representing whether it is alive or dead.
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
