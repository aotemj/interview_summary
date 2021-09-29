/**
 * 手动实现一个 XMLHttpRequest hook
 */

// XMLHttpRequest
// onopen
// onload
// onerror
// onreadystatechange

class XhrHook {
  constructor(beforeHooks = {}, afterHooks = {}) {
    this.XHR = window.XMLHttpRequest;
    this.beforeHooks = beforeHooks;
    this.afterHooks = afterHooks;
    this.init();
  }

  init() {
    let _this = this
    window.XMLHttpRequest = function () {
      this._xhr = new _this.XHR();
      _this.overwrite(this)
    }
  }

  overwrite(ProxyXhr) {
    for (const key in ProxyXhr._xhr) {
      if (typeof ProxyXhr._xhr[key] == "function") {
        this.overWriteMethod(key, ProxyXhr)
      } else {
        this.overwriteAttribute(key, ProxyXhr)
      }
    }

  }

  overWriteMethod(key, ProxyXhr) {
    const beforeHooks = this.beforeHooks;
    const afterHooks = this.afterHooks;
    ProxyXhr._xhr[key] = function (...args) {
      // 拦截
      if (beforeHooks[key] && typeof beforeHooks[key] == 'function') {
        const res = ProxyXhr._xhr.call(ProxyXhr._xhr, args)
        if (res === false) return
      }
      const res = ProxyXhr._xhr.call(ProxyXhr._xhr, args)

      if (afterHooks[key]) {
        ProxyXhr._xhr.call(ProxyXhr._xhr, res)
      }

      return res
    }
  }

  overwriteAttribute(key, ProxyXhr) {
    Object.defineProperties(ProxyXhr._xhr[key], this.setPropertyDescriptor(key, ProxyXhr))
  }

  setPropertyDescriptor(key, ProxyXhr) {
    const beforeHooks = this.beforeHooks;
    const _this = this;
    let obj = Object.create(null)
    obj.set = function (val) {
      if (ProxyXhr._xhr[key].startsWith('on')) {
        ProxyXhr._xhr[`__${key}`] = val;
        return;
      }
      if (beforeHooks[key]) {
        ProxyXhr._xhr[`__${key}`] = beforeHooks[key] || ProxyXhr._xhr[key]
        val.call(ProxyXhr._xhr)
      }
    }

    obj.get = function () {
      return ProxyXhr._xhr(`__${key}`)
    }
  }
}


let xhr = new XhrHook({
  onopen: function () {

  }
})
