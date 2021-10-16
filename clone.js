function shallowCopy(obj) {
  let target = {}
  for (const key in obj) {
    if (obj.hasOwnProperty) {
      target[key] = obj[key]
    }
  }
  return target
}


function deepClone(obj) {
  let target = {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] == 'object') {
        target[key] = deepClone(obj[key])
      } else {
        target[key] = obj[key]
      }
    }
  }

  return target
}

let obj = {
  a: 1,
  b: {
    a: 1,
    b: 2,
    c: {a: 1, b: 2}
  }
}

let cloneObj = deepClone(obj)
cloneObj.a = 'a'
cloneObj.b.a = 'b'
cloneObj.b.c.a = 2
console.log(obj);
console.log(cloneObj);



