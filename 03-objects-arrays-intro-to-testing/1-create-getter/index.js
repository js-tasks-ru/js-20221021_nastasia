/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  if (path === '' || typeof (path) !== 'string') {
    return;
  }

  const pathArr = path.split('.');

  return function getter(obj) {
    let result = obj;
    for (let pathId of pathArr) {
      if (typeof (result) === 'undefined' || typeof (pathId) === 'undefined') {
        break;
      }
      result = result[pathId];
    }
    return result;
  };
}
