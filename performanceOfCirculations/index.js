// 循环性能总结
// 第一梯队：every 0.x ms
// 第二梯队：for、while 5.x ms
// 第三梯队：forEach、some、reduce 120.x ms
// 第四梯队：for of 146.x ms
// 第五梯队：map 243.x ms
// 第六梯队：for in  2.3 s

function timeEstimate(fn, label) {
  console.time(label)
  fn()
  console.timeEnd(label)
}

let arr = new Array(9999999).fill({a: 1, b: 2, test: 'hello'})

timeEstimate(function () {
  for (let i = 0; i < arr.length; i++) {
  }
}, 'for') // 5.xxx ms
timeEstimate(function () {
  let i = 0
  while (i < arr.length) {
    i++
  }
}, 'while') // 5.xxx ms

timeEstimate(function () {
  arr.forEach(item => {
  })
}, 'forEach') // browser: 93.xxx ms  node: 124.xxx ms

timeEstimate(function () {
  arr.map(item => {
  })
}, 'map') // browser: 198.xxx ms  node: 124.xxx ms

timeEstimate(function () {
  arr.some(item => {
  })
}, 'some') // browser: 105.xxx ms  node: 125.xxx ms

timeEstimate(function () {
  arr.every(item => item === 0)
}, 'every') // browser: 0.058.xxx ms  node: 0.106.xxx ms

timeEstimate(function () {
    arr.reduce(item => {
    })
  },
  'reduce'
) // browser: 101.xxx ms  node: 129.xxx ms
timeEstimate(function () {
    for (const arrKey in arr) {

    }
  },
  'for in'
) // browser: 2.3 s  node: 2.3 s
timeEstimate(function () {
    for (const arrElement of arr) {

    }
  },
  'for of'
) // browser: 137 ms  node: 146 ms

