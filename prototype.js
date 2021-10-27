// 原型链继承
// 缺点：
// 1. 子类实例属性没有实现深拷贝，改变会引起其他实例的属性改变
// 2. 没有实现super 功能，无法对父类进行传参
{
  function Parent(name) {
    this.name = [name]
  }

  Parent.prototype.getName = function () {
    return this.name;
  }

  function Child() {

  }

  // 原型链继承
  Child.prototype = new Parent();
  Child.prototype.constructor = Child;

  let child1 = new Child("name1") // 无法实现对子类传参
  let child2 = new Child("name2")

  child1.name[0] = ["new Name"]
  console.log(child1.name);
  console.log(child2.name)
  console.log('=================== 原型链继承结束 ===================')
}
// 构造函数继承
// 在子类的构造函数中执行父类的构造函数，并绑定子类的this
// 缺点：无法继承父类 prototype 上的方法和属性
{
  function Parent(name) {
    this.name = [name]
  }

  Parent.prototype.getName = function () {
    return this.name;
  }

  Parent.prototype.gender = 'male'

  function Child() {
    Parent.call(this, ...arguments)
  }

  let child1 = new Child("name1")
  let child2 = new Child("name2")

  child1.name[0] = ["new Name"]
  console.log(child1.name);
  console.log(child2.name);
  // console.log(child1.getName()); // child1.getName is not a function 无法继承父类 prototype 上的方法和属性
  console.log(child1.gender); // undefined 无法继承父类 prototype 上的方法和属性
  console.log('=================== 构造函数继承结束 ===================')
}

// 组合式继承
// 使用原型继承和构造函数继承结合的方式实现
// 缺点：每次继承的实现都必须依赖一个新的父类的实例
{
  function Parent(name) {
    this.name = [name]
  }

  Parent.prototype.getName = function () {
    return this.name
  }
  Parent.prototype.gender = 'gender'

  function Child() {
    Parent.call(this, ...arguments)
  }

  Child.prototype = new Parent() // 每次继承的实现都必须依赖一个新的父类的实例
  Child.prototype.constructor = Child;


  let child1 = new Child("name1")
  let child2 = new Child("name2")

  child1.name = "new Name"

  console.log(child1.name);
  console.log(child2.name);
  console.log(child1.getName());
  console.log(child1.gender);
  console.log('=================== 组合式继承结束 ===================')
}
// 寄生式组合继承
{
  function Parent(name) {
    this.name = [name]
  }

  Parent.prototype.getName = function () {
    return this.name
  }
  Parent.prototype.gender = 'gender'

  function Child() {
    Parent.call(this, ...arguments)
  }

  Child.prototype = Parent.prototype
  Child.prototype.constructor = Child;


  let child1 = new Child("name1")
  let child2 = new Child("name2")

  child1.name = "new Name"

  console.log(child1.name);
  console.log(child2.name);
  console.log(child1.getName());
  console.log(child1.gender);
}
