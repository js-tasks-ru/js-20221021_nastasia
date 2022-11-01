/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let cpyArr;
  if (param == 'asc') {
    cpyArr = [...arr].sort((a, b)=>generalLocaleString(a, b));
  }
  if (param == 'desc') {
    cpyArr = [...arr].sort((a, b)=>generalLocaleString(b, a));
  }
  return cpyArr;
}

/**
  * Отдельная функция для localeCompare
  */
function generalLocaleString(a, b) {
  return a.localeCompare(b, ['ru', 'en'], {caseFirst: 'upper'});
}
