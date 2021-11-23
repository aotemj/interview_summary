const {toType} = require('../toType/toType')

const arrMethods = ['pop', 'push', 'shift', 'unshift', 'join', 'reverse', 'some', 'filter', 'every',
  'map', 'forEach', 'concat', 'slice', 'splice']

const arrPrototype = Array.prototype
const newArrPrototype = Object.create(arrPrototype)

function render(action, ...args) {
  console.log(`Action = ${action}, args = ${args.join(',')}`)
}

arrMethods.forEach(method => {
  newArrPrototype[method] = function () {
    arrPrototype[method].call(this, ...arguments)
    render(method, ...arguments)
  }
})

function reactive(obj) {
  if (Array.isArray(obj)) {
    obj.__proto__ = newArrPrototype
  }
}

const data = [1, 2, 3, 4];
reactive(data)
data.push(5) // Action = push, args = 5
data.splice(0, 2) // Action = splice, args = 0,2
