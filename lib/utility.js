/**
 * 深拷贝
 * @return {[type]} [description]
 */
export function deepClone(data) {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return Object.assign({}, data);
  }
}

/**
 * 更新state
 */
export function updateState(state, field) {
  if (!field) {
    return Object.assign({}, state);
  }

  let obj = {};
  obj[field] = deepClone(state[field]);

  return Object.assign({}, state, obj);
}

/**
 * map数组
 */
export function map(arr, funcMethod) {
  if (!arr) return "";
  else if (arr instanceof Array) {
    return arr.map(funcMethod);
  } else {
    return "";
  }
}

/**
 * 安全执行
 * @param {Object} obj
 * @param {String} fucName 方法名
 * @param {Function} funcMethod 方法
 */
export function safeExcute(obj, fucName, funcMethod) {
  if (!obj) {
    return "";
  } else if (obj[fucName]) {
    return obj[fucName](funcMethod);
  } else {
    return "";
  }
}


/**
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @param Number atleast 至少多长时间触发一次
 * @return Function 延迟执行的方法
 */
export function throttle(fn, delay, atleast) {
  var timer = null;
  var previous = null;

  return function () {
    var now = +new Date();

    if (!previous)
      previous = now;

    if (now - previous > atleast) {
      fn();
      // 重置上一次开始时间为本次结束时间
      previous = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn();
      }, delay);
    }
  };
}


/**
 * 去除掉url中的参数
 * @param key
 * @return {string}
 */
export function removeParamInLink(key) {
  const search = location.search;
  let newSearch = "";
  if (search) {
    const result = [];
    const parts = search.trim().replace(/^[?#&]/, "").split("&");
    parts.forEach((item) => {
      const info = item.split("=");
      if (info[0] !== key) {
        result.push(item);
      }
    });
    if (result.length > 0) {
      newSearch = "?" + result.join("&");
    }
  }
  return location.href.split("?")[0] + newSearch;
}

export function parseNumber(num, fixedNum) {
  num = parseFloat(num);
  if (isNaN(num)) {
    return 0.0;
  }

  if (fixedNum) {
    num = parseFloat(num.toFixed(fixedNum));
  }

  return num;
}

/**
 * 解析对象/数组的属性字符串
 *
 * @param Object/Array obj 对象/数组
 * @param String path 属性字符串，使用点号分割
 *
 * @return Any 属性值，不存在或者参数错误返回undefined
 */
export function parseProperty(obj, path) {
  const type = Object.prototype.toString.call(obj);
  if (
    (type === "[object Object]" || type === "[object Array]") &&
    typeof path === "string"
  ) {
    return path.split(".").reduce((prev, curr) => {
      return !!prev && prev.hasOwnProperty(curr) ? prev[curr] : void 0;
    }, obj);
  } else {
    return void 0;
  }
}