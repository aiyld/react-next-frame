/**String Extension**/
String.format = function() {
  if (arguments.length == 0) return null;

  var str = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    var re = new RegExp("\\{" + (i - 1) + "\\}", "gm");
    str = str.replace(re, arguments[i]);
  }
  return str;
}; // String.format("I Love {0}, and You Love {1}", "You","Me")

String.prototype.fill = function(length, target, addEnd) {
  var str = this.toString();

  if (str.length > length || target == null || target.toString().length == 0)
    return this;

  for (var i = str.length; i < length; i++) {
    if (addEnd) {
      str = str + target;
    } else {
      str = target + str;
    }
  }
  return str;
};

// 加减天数
Date.prototype.addDays = function(d) {
  this.setDate(this.getDate() + d);
};

// 加减星期
Date.prototype.addWeeks = function(w) {
  this.addDays(w * 7);
};

// 加减月份
Date.prototype.addMonths = function(m) {
  var d = this.getDate();
  this.setMonth(this.getMonth() + m);

  if (this.getDate() < d) this.setDate(0);
};

// 加减年份
Date.prototype.addYears = function(y) {
  var m = this.getMonth();
  this.setFullYear(this.getFullYear() + y);

  if (m < this.getMonth()) {
    this.setDate(0);
  }
};

// 时间日期格式化
Date.prototype.format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );

  return fmt;
};

module.exports = {
  /**
   * Get params from Url
   */
  getParamsFromUrl: function(url) {
    var result = {},
      paramsStr = url;
    if (!url) {
      url = decodeURI(location.href);

      if (url.length >= 0 && url[url.length - 1] == "#") {
        url = url.substring(0, url.length - 1);
      }
      paramsStr = url.split("?")[1];
    }

    if (paramsStr != null) {
      var paramArray = paramsStr.split("&");

      for (var i = 0; i < paramArray.length; i++) {
        var paramTarget = paramArray[i].split("=");

        result[paramTarget[0]] = paramTarget[1];
      }
    }

    return result;
  },

  /**
   * Check if current view is mobile view.
   */
  checkMobile: function() {
    return location.href.indexOf("viewsMobile/") > 0;
  }
};
