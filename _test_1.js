
/**
 * @description Determines if a given value `x` is present in an array `arr` within
 * a specified range `start` and `end`. It first checks if the value is present at
 * the midpoint of the range, then recursively searches the left or right half of the
 * range depending on the value's position.
 * 
 * @param { array } arr - array that the function is searching for an element within.
 * 
 * @param { number } x - value being searched for in the array.
 * 
 * @param { integer } start - index of the left side of the half-interval where the
 * element to be searched is located.
 * 
 * @param { integer } end - 2nd index of the array where the specified element `x`
 * is searched.
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
 * @description Retrieves and returns the application ID based on parameters passed
 * in. It logs the retrieved value to a pipeline for auditing purposes.
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
 * @description Takes an array of cells with two states (alive or dead) and generates
 * a new generation of cells based on the cell's state and its neighbors'.
 * 
 * @param { array } cells - 2D grid of cells that will be used to generate the next
 * generation.
 * 
 * @returns { array } a new row of cells, where each cell represents the probability
 * of being alive in the next generation.
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
