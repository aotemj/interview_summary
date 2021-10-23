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
      this.status = MyPromise.FULFILLED
      this.value = value
      setTimeout(() => {
        this.callbacks.forEach(({onFulfilled}) => {
          try {
            onFulfilled(value)
          } catch (e) {
            this.reject(e)
          }
        })
      })
    }
  }

  reject(value) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED
      this.value = value
      setTimeout(() => {
        this.callbacks.forEach(({onRejected}) => {
          try {
            onRejected(value)
          } catch (e) {
            onRejected(e)
          }
        })
      })
    }
  }

  unify(instance, result, resolve, reject) {
    if (instance === result) {
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
      onFulfilled = () => this.value
    }
    if (typeof onRejected !== 'function') {
      onRejected = () => this.value
    }

    const newPromise = new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: () => {
            this.unify(newPromise, onFulfilled(this.value), resolve, reject)
          },
          onRejected: () => {
            this.unify(newPromise, onRejected(this.value), resolve, reject)
          },
        })
      } else if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
          this.unify(newPromise, onFulfilled(this.value), resolve, reject)
        })
      } else {
        setTimeout(() => {
          this.unify(newPromise, onRejected(this.value), resolve, reject)
        })
      }
    })
    return newPromise
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
    const length = promises.length
    let values = []


    return new MyPromise((resolve, reject) => {
      function checkFulfilled(res) {
        values.push(res)
        if (values.length === length) {
          resolve(values)
        }
      }

      promises.forEach((promise) => {
        console.log(promise);
        if (promise instanceof MyPromise) {
          promise.then(res => {
            checkFulfilled(res)
          }, reason => {
            reject(reason)
          })
        } else {
          checkFulfilled(promise)
        }
      })
    })
  }
}
