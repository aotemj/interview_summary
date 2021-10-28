//满足 leftHand.__proto__ == rightHand.prototype
// 如果不满足，则向leftHand 的原型链上级查找：  leftHand.__proto__.__proto__
function customInstanceOf(leftHand, rightHand) {
  let classFuncPrototype = rightHand.prototype
  let proto = Object.getPrototypeOf(leftHand) // example.__proto__
  while (true) {
    if (classFuncPrototype === proto) {
      return true
    }
    if (proto === null) {
      return false
    }
    proto = Object.getPrototypeOf(proto)
  }
}

let a = 1;
// console.log(a instanceof Number)
// console.log('' instanceof String)
// console.log({} instanceof Object)
// console.log([] instanceof Object)
console.log(customInstanceOf(a, Number));
console.log(customInstanceOf({}, Object));
console.log(customInstanceOf([], RegExp));
console.log(customInstanceOf([], Array));
