let observableStore = new Map()


function makeObservable(target) {
  let handlerName = Symbol('handler');
  observableStore.set(handlerName, [])
  target.observe = function (handler) {
    observableStore.get(handlerName).push(handler)
  }
  const handler = {
    get(target, property, receiver) {
      console.log(receiver);
      observableStore.get(handlerName).forEach(item => {
        item('GET', property, target[property])
      })
      return target[property]
    },
    set(target, property, value, receiver) {
      target[property] = value
      observableStore.get(handlerName).forEach(item => {
        item('SET', property, value)
      })
    },
    deleteProperty(target, propertyKey) {
      delete target[propertyKey]
      observableStore.get(handlerName).forEach(item => {
        item('DELETE', propertyKey)
      })
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
