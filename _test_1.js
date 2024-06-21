
/**
 * @description Checks if a specified value `x` exists within an array `arr` between
 * two given indices `start` and `end`. It recursively calls itself if the value is
 * not found within the middle index, or returns true if it is found.
 * 
 * @param { array } arr - 1D array to be searched for the given value `x`.
 * 
 * @param { number } x - searched value in the array.
 * 
 * @param { integer } start - index of the leftmost element that is to be searched
 * from in the array.
 * 
 * @param { number } end - 2nd point of the range of indices for the array being searched.
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
 * @description Retrieves an application ID based on a parameter passed in the URL.
 * If the parameter is present, it uses the value to create a GlideRecord object and
 * return the app ID as a number. Otherwise, it logs an error message and returns an
 * empty string.
 * 
 * @returns { string } a string representing the ID of the designated application.
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
 * @description Takes an array of cell values as input, generates a new generation
 * of cells by iterating over each row, and calculates the alive state of each cell
 * based on its neighbors' alive state and the total neighbor count. It then pushes
 * the alive state of each cell in the next generation into an array.
 * 
 * @param { array } cells - 2D array of cells, where each cell can be either alive
 * or dead, and is used to generate the next generation of cells through a process
 * of iterative calculation and assignment of alive or dead status based on neighboring
 * cells.
 * 
 * @returns { array } an array of booleans representing the state of each cell in the
 * next generation.
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
