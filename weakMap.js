{
  const wm1 = new WeakMap(),
    wm2 = new WeakMap(),
    wm3 = new WeakMap();
  const o1 = {},
    o2 = function () {
    };
// o3 = window;

  wm1.set(o1, 37)
  wm1.set(o2, 'azerty')
  wm2.set(o1, o2)

// wm2.set(null, undefined)

  wm2.set(wm1, wm2)

  console.log(wm1.get(o2));

  console.log(wm2.get(o2));
}

// 带有 clear 功能的 weakMap
class ClearableWeakMap {
  constructor(init) {
    this.weakMap = new WeakMap(init);
  }

  get(key) {
    return this.weakMap.get(key)
  }

  set(key, val) {
    this.weakMap.set(key, val)
    return this
  }

  delete(key) {
    return this.weakMap.delete(key)
  }

  has(k) {
    return this.weakMap.get(k)
  }

  clear() {
    this.weakMap = new WeakMap();
  }
}

let cwm = new ClearableWeakMap();
let o5 = {}
cwm.set(o5, 'test')

console.log(cwm.get(o5));

cwm.clear()
console.log(cwm.get(o5));

