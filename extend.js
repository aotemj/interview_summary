// {
//   function fun() {
//     console.log(n);
//     n = 456;
//     console.log(n)
//   }
//
//   var n = 123;
//   fun(n);
//   console.log(n)
// //   执行结果：
// //  123
// //  456
// //  456
// }
//
// {
//   function fun(n) {
//     console.log(n);
//     var n = 456;
//     console.log(n);
//   }
//
//   var n = 123;
//   fun(n);
//
// //   执行结果：
// //  123
// //  456
// }
// console.log('/*******************8/')
// {
//   // async function f() {
//   //   console.log(1);
//   //   return 2;
//   // }
//   //
//   // f().then(result => {
//   //   console.log(result)
//   // })
//   // console.log(3)
// //   执行结果
// //  1
// //  3
// //  2
// }
//
// {
//   function f2() {
//     console.log(4)
//   }
//
//   async function f() {
//     console.log(1)
//     await f2();
//     console.log(2)
//   }
//
//   f();
//   console.log(3);
// //  执行结果
// //  1
// //  4
// //  2
// //  3
// }

console.log('/*******************8/')

{
  function fn(a, c) {
    console.log(a)
    var a = 123
    console.log(a)
    console.log(c)

    function a() {
    }

    if (false) {
      var d = 678
    }
    console.log(d);
    console.log(b);
    var b = function () {
    }
    console.log(b);

    function c() {
    }

    console.log(c)
  }

  fn(1, 2)
}

{
  var name = 222
  var a = {
    name: 111,
    say: function () {
      console.log(this.name)
    }
  }
  var fun = a.say
  fun()
  a.say()
  var b = {
    name: 333,
    say: function (fun) {
      fun()
    }
  }
  b.say(a.say)
  b.say = a.say
  b.say()
}
{
  var x = 11;
  var obj = {
    x: 22,
    say: () => {
      console.log(this.x)
    }
  }
  obj.say()
}
