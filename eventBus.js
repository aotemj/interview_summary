/**
 * event-bus
 * event.on
 * event.emit
 * event.off
 * event.once
 */

class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(eventName, event) {
    if (this.events[eventName]) {
      this.events[eventName].push(event)
    } else {
      this.events[eventName] = [event]
    }
    return this;
  }

  emit(eventName, ...args) {
    const _this = this
    if (this.events[eventName]) {
      this.events[eventName].forEach(item => {
        item.call(_this, ...args)
      })
      return this
    } else {
      throw new Error('当前没有方法可供调用')
    }
  }

  once(eventName, event) {
    const _this = this
    const func = function (...args) {
      _this.off(eventName, func)
      event.call(this, ...args)
    }

    this.on(eventName, func)
  }

  off(eventName, event) {
    if (event) {
      this.events[eventName] = this.events[eventName].filter(item => item !== event)
    } else {
      this.events[eventName] = null;
    }
    return this;
  }
}


const add = (a, b) => console.log(a + b)
const log = (...args) => console.log(...args)
const event = new EventEmitter()

event.on('add', add)
event.on('log', log)
event.emit('add', 1, 2) // 3
event.emit('log', 'hi') // hi
event.off('add')

event.emit('add', 1, 2) // Error: 当前没有方法可供调用;
event.once('once', add)
event.emit('once', 1, 2)// 3
event.emit('once', 1, 2)
