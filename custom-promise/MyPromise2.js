class MyPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'

  constructor(exector) {
    this.status = MyPromise.PENDING
    this.value = ''
    this.callbacks = []

    exector(this.resolve.bind(this), this.reject.bind(this))
  }

  resolve(value) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;

      setTimeout(() => {
        this.callbacks.forEach(({onFulfilled}) => {
          onFulfilled(value)
        })
      })
    }
  }

  reject(value) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.value = value;
      setTimeout(() => {
        this.callbacks.forEach(({onRejected}) => {
          onRejected(value)
        })
      })
    }
  }

  unify(promise, result, resolve, reject) {
    if (promise === result) {
      throw new TypeError("Chaining cycle detected for promise")
    }
    try {
      if (result instanceof MyPromise) {
        result.then(resolve, reject)
      } else {
        resolve(result)
      }
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = () => {
        return this.value
      }
    }
    if (typeof onRejected !== 'function') {
      onRejected = () => {
        return this.value
      }
    }

    let promise = new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: (value) => {
            this.unify(promise, onFulfilled(value), resolve, reject)
          },
          onRejected: (value) => {
            this.unify(promise, onRejected(value), resolve, reject)
          }
        })
      } else if (this.status === MyPromise.FULFILLED) {
        setTimeout((value) => {
          this.unify(promise, onFulfilled(value), resolve, reject)
        })
      } else {
        setTimeout((value) => {
          this.unify(promise, onRejected(value), resolve, reject)
        })
      }
    })
    return promise
  }

  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }

  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value)
    })
  }

  static all(promises) {
    let results = []
    const length = promises.length
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        if (promise instanceof MyPromise) {
          promise.then(res => {
            results.push(res)
            if (results.length === length) {
              resolve(results)
            }
          }, (reason) => {
            reject(reason)
          })
        } else {
          resolve(promise)
        }
      })
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(res => {
          resolve(res)
        }, (reason) => {
          reject(reason)
        })
      })
    })
  }

  static allSettled(promises) {
    let results = []
    const length = promises.length
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then((res) => {
          results.push({status: 'fulfilled', value: res})
          if (length === results.length) {
            resolve(results)
          }
        }, (reason) => {
          results.push({status: 'rejected', value: reason})
          if (length === results.length) {
            resolve(results)
          }
        })
      })
    })
  }
}
