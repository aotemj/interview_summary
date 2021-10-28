// Object.defineProperty 的注意事项：
// 存取描述符和数据描述符
// 存取描述符可拥有的键值：
//  configurable
//  enumerable
//  get
//  set
// 数据描述符可拥有的键值：
//  configurable
//  enumerable
//  value
//  writable

{
  const person = {
    name: 'lydia'
  }

  Object.defineProperty(person, 'age', {value: 21})

  console.log(person)
  person.age = 22
  console.log(person.age)
  console.log(Object.keys(person))

// console.log(newPerson)
// console.log(Object.keys(newPerson))

}

{
  Object.prototype.objCustom = function () {
  };
  Array.prototype.arrCustom = function () {
  };

  let iterable = [3, 5, 7];
  iterable.foo = 'hello';

  for (let i in iterable) {
    console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
  }

  for (let i in iterable) {
    if (iterable.hasOwnProperty(i)) {
      console.log(i); // logs 0, 1, 2, "foo"
    }
  }

  for (let i of iterable) {
    console.log(i); // logs 3, 5, 7
  }
}

{
  let arr = [10, 20, 30]
  arr[Symbol.iterator] = function () {
    let self = this;
    let index = 0;
    return {
      next() {
        if (index === self.length) {
          return {
            done: true,
            value: undefined,
          }
        }
        return {
          done: false,
          value: self[index++]
        }
      }
    }
  }
  for (const number of arr) {
    console.log(number);
  }
}

{
  let obj = {
    0: 100,
    1: 200,
    2: 300,
    length: 3
  }

  obj[Symbol.iterator] = function () {
    let self = this;
    let index = 0
    return {
      next() {
        if (index === self.length) {
          return {
            done: true,
            value: undefined
          }
        }
        return {
          done: false,
          value: self[index++]
        }
      }
    }
  }

  for (const objElement of obj) {
    console.log(objElement);
  }
}
