/**
 * sizeOf
 * 计算一个对象所占用的字节大小
 */

let testObj = {
  a: 111,
  b: 'ccc',
  2222: false
}

function calculate(object) {
  const type = typeof object;
  switch (type) {
    case 'string':
      return object.length * 2;
    case 'number':
      return 8;
    case 'boolean':
      return 4;
    case 'object':
      if (Array.isArray(object)) {
        return object.map(calculate).reduce((res, curr) => res + curr)
      } else {
        return sizeOfObject(object)
      }
  }
}

function sizeOfObject(object) {
  if (object == null) {
    return 0;
  }
  const seen = new WeakSet();
  const keys = Object.keys(object)
  const keysLength = keys.length;
  let bytes = 0
  for (let i = 0; i < keysLength; i++) {
    if (typeof object[keys[i]] == 'object' && object[keys[i] !== null]) {
      if (seen.has(object[keys[i]])) {
        continue;
      }
      seen.add(object[keys[i]])
    }

    bytes += calculate(keys[i])
    bytes += calculate(object[keys[i]])
  }
  return bytes
}

console.log(calculate(testObj));


