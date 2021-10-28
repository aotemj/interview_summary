/**
 * 数据类型的检测：
 * 一般会结合 typeof 与 Object.prototype.toString.call() 来实现
 * typeof 用来检测基本数据类型 其他的交给 Object.prototype.toString.call
 */

function toType(target) {
  if (target == null) {
    return `${target}`
  }
  if (typeof target !== 'object') {
    return typeof target
  } else {
    const regExp = /^\[object (\w+)\]$/
    return Object.prototype.toString.call(target).match(regExp)[1].toLowerCase()
  }
}

console.log(toType(undefined));
console.log(toType(null));
console.log(toType(1));
console.log(toType([]));
console.log(toType(new Date()));
console.log(toType(/\^\w/));
console.log(toType(function () {
}));
let Person = function () {

}

let p = new Person()

console.log(toType(p))
console.log(toType(1n));
console.log(toType(Symbol()));
console.log(toType(new Error()));
