function add(x, y) {
  return x + y
}

function curryingAdd(x) {
  return function (y) {
    return x + y
  }
}

// add(1, 2)
// curryingAdd(1)(2)

// 参数复用
{
  function check(reg, txt) {
    return reg.test(txt)
  }

  let reg1 = /\d+/g
  let reg2 = /[a-z]+/g
  console.log(check(reg1, 'test'));
  console.log(check(reg2, 'test'));

  function curryingCheck(reg) {
    return function (txt) {
      return reg.test(txt)
    }
  }

  let hasNumber = curryingCheck(reg1)
  let hasLatter = curryingCheck(reg2)
}

{
  var on = function (element, event, handler) {
    if (document.addEventListener) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    } else {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
  var on = (function () {
      if (document.addEventListener) {
        return function (element, event, handler) {
          if (element && event && handler) {
            element.addEventListener(event, handler, false)
          }
        }
      } else {
        return function (element, event, handler) {
          if (element && event && handler) {
            element.attachEvent('on' + event, handler)
          }
        }
      }
    }
  )()

  var on = function (isSupport, element, event, handler) {
    isSupport = isSupport || document.addEventListener;
    if (isSupport) {
      return element.addEventListener(event, handler, false)
    } else {
      return element.attachEvent('on' + event, handler)
    }
  }
}

{
  var currying = function () {
    var args = Array.prototype.slice.call(arguments, 1)
    return function () {
      var newArgs = args.concat(Array.prototype.slice.call(arguments))
      return fn.apply(this, newArgs)
    }
  }
}
