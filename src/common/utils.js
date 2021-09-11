// 防抖动函数:一个需要频繁触发的函数，在规定时间内只让最后一次生效，前面不生效。
export function debounce(fn, delay = 100) {
  // 记录上一次的延时器
  let timer = null;
  return function (...arg) {
    // 清除上一延时器
    if (timer) clearTimeout(timer);
    // 重新设置新的延时器
    timer = setTimeout(function () {
      fn.apply(this, arg);
    }, delay);
  };
};

// 节流函数:一个函数执行一次后，只有大于设定的时间周期才会执行第二次。
export function throttle(fn, delay) {
  // 记录上一次触发的时间
  var lasttime = 0;
  // 通过闭包的方式使用lasttime变量，每次都是上次的时间
  return function () {
    var nowtime = Date.now();
    if (nowtime - lasttime > delay) {
      // 修正this函数问题
      fn.call(this);
      // 同步时间
      lasttime = nowtime;
    }
  };
};

/**
 * 格式化函数 ， 给日期格式化
 * date为 new Date()对象， fmt为 'yyyy-MM-dd'的格式
 */
export function formatDate(date, fmt) {
  //获取年份
  if (/(y+)/.test(fmt)) {
    let dateY = date.getFullYear() + "";
    //RegExp.$1 在判断中出现过，且是括号括起来的，所以 RegExp.$1 就是 "yyyy"
    fmt = fmt.replace(RegExp.$1, dateY.substr(4 - RegExp.$1.length));
  }

  //获取其他
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}