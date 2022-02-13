function _has(prop: any, obj: any) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function _isObject(x: any) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

const mergeDeepWithKey = function(fn: Function, lObj: any, rObj: any) {
  return mergeWithKey(
    function(k: any, lVal: any, rVal: any) {
      if (_isObject(lVal) && _isObject(rVal)) {
        return mergeDeepWithKey(fn, lVal, rVal);
      }
      return fn(k, lVal, rVal);
    },
    lObj,
    rObj
  );
};

const mergeWithKey = function(fn: Function, l: any, r: any) {
  var result: any = {};
  var k;
  l = l || {};
  r = r || {};

  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if (_has(k, r) && !_has(k, result)) {
      result[k] = r[k];
    }
  }

  return result;
};

const mergeDeepRight = (lObj: any, rObj: any) =>
  mergeDeepWithKey((...args: any[]) => args[2], lObj, rObj);

export default mergeDeepRight;
