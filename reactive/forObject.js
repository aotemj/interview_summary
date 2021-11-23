const {toType} = require('../toType/toType')

const render = (key, val) => {
  console.log(`SET key=${key} val=${val}`)
}


const data = {
  a: 1,
  b: 2,
  c: {
    c1: {
      af: 999,
    },
    c2: 4
  }
}
// const defineReactive = (obj, key, val) => {
//   Object.defineProperty(obj, key, {
//     get() {
//       return val;
//     },
//     set(newVal) {
//       if (newVal === val) return;
//       val = newVal;
//       render(key, val)
//     }
//   })
// }

function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      return val
    },
    set(newVal) {
      if (val === newVal) return
      val = newVal;
      render(key, val)
    },
  })
}

function forObject(obj) {
  if (toType(obj) === 'object') {
    for (const key in obj) {
      const val = obj[key]
      if (toType(val) === 'object') {
        forObject(val)
      } else {
        defineReactive(obj, key, val)
      }
    }
  }
}

forObject(data)

data.a = 5 // SET key = a  val = 5;
data.b = 7 // SET key = b val = 7;
data.c.c2 = 4 //
data.c.c1.af = 121 // SET key = af v al = 121
// console.table(data);
