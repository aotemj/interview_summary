{
  function fun() {
    console.log(n);
    n = 456;
    console.log(n)
  }

  var n = 123;
  fun(n);
  console.log(n)
//   执行结果：
//  123
//  456
//  456
}

{
  function fun(n) {
    console.log(n);
    var n = 456;
    console.log(n);
  }

  var n = 123;
  fun(n);

//   执行结果：
//  123
//  456
}
console.log('/*******************8/')
{
  // async function f() {
  //   console.log(1);
  //   return 2;
  // }
  //
  // f().then(result => {
  //   console.log(result)
  // })
  // console.log(3)
//   执行结果
//  1
//  3
//  2
}

{
  function f2() {
    console.log(4)
  }

  async function f() {
    console.log(1)
    await f2();
    console.log(2)
  }

  f();
  console.log(3);
//  执行结果
//  1
//  4
//  2
//  3
}
