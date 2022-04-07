// 实现对象的 Map 函数类似 Array.prototype.map

Object.prototype.map = function (item) {
  console.log(item, this);
  const originObj = this;
  if (typeof item !== 'function') {
    throw TypeError('当前map 类型不匹配')
  }

  let newObj = {}
  for (let [k, v] of Object.entries(originObj)) {
    console.log(k, v);
    newObj[k] = item(v);
  }

  return newObj
}

let obj = {
  a: 1,
  b: 2,
  c: function () {
    console.log('c')
  }
}

let newObj = obj.map(item => {
  return item * 2
})

console.log(obj, newObj);
