function shallowCopy(obj) {
  let target = {}
  for (const key in obj) {
    target[key] = obj[key]
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

function deepClone2(obj, hash = new WeakMap()) {
  if (obj === null) {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj)
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }
  if (obj instanceof Error) {
    return new Error(obj.message)
  }

  if (typeof obj !== 'object') {
    return obj
  }

  if (hash.has(obj)) {
    return hash.get(obj)
  }

  hash.set(obj, obj)

  let newObj = Object.create(null)
  const keys = Reflect.ownKeys(obj)
  for (const key of keys) {
    const val = obj[key]
    if (typeof val === 'object') {
      newObj[key] = deepClone2(val, hash)
    } else {
      newObj[key] = val
    }
  }

  return newObj
}

let obj = {
  a: 1,
  b: {
    a: 1,
    b: 2,
    c: {a: 1, b: 2}
  }
}


let cloneObj = deepClone2(obj)
cloneObj.a = 'a'
cloneObj.b.a = 'b'
cloneObj.b.c.a = 2
console.log(obj);
console.log(cloneObj);



