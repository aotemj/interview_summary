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

  then(onFulfilled = value => value, onRejected = value => value) {
    return new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.PENDING) {
        this.callbacks.push({
          onFulfilled,
          onRejected,
        })
      } else if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            const res = onFulfilled(this.value)
            // console.log(res);
            if (res instanceof MyPromise) {
              res.then((res) => {
                resolve(res)
              })
            } else {
              resolve(res)
            }
          } catch (e) {
            reject(e)
          }

        })
      } else {
        setTimeout(() => {
          try {
            const res = onRejected(this.value)
            reject(res)
          } catch (e) {
            reject(e)
          }
        })
      }
    })
  }
}
