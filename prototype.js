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

