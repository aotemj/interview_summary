let observableStore = new Map()

function makeObservable(target) {
  let handlerName = Symbol('handler')
  observableStore.set(handlerName, [])
  target.observe = function (handler) {
    observableStore.get(handlerName).push(handler)
  }

  const handler = {
    get(target, property, receiver) {
      let success = Reflect.get(target, property, receiver)
      if (success) {
        observableStore.get(handlerName).forEach(item => {
          item('GET', property, target[property])
        })
        return target[property]
      }
    },
    set(target, property, value, receiver) {
      let success = Reflect.set(target, property, value, receiver);
      if (success) {
        observableStore.get(handlerName).forEach(item => {
          item('SET', property, value)
        })
      }
    },
    deleteProperty(target, p) {
      let success = Reflect.deleteProperty(target, p)
      if (success) {
        observableStore.get(handlerName).forEach(item => {
          item('DELETE', p, target[p])
        })
      }
    }
  }
  let p = new Proxy(target, handler)
  return p
}

let user = {};

user = makeObservable(user);

user.observe((action, key, value) => {
  console.log(`${action} key=${key} value =${value || ''}`);
})

user.name = "John"; // SET key = name value = John
console.log(user.name); // GET key = name value = John // John
delete user.name; // DELETE key = name value =

console.log(user.name);
