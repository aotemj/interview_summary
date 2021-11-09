//输入一个正数N,输出所有和为N 的联系正数序列
// 15: [[1,2,3,4,5],[4,5,6],[7,8]]
function createArr(n) {
  let results = []
  for (let i = 0; i < n; i++) {
    let index = i + 1
    let sum = 0
    let arr = []
    while (sum < n && index < n) {
      sum += index;
      arr.push(index)
      index++;
      if (sum === n) {
        results.push(arr)
      }
    }
  }
  return results
}

console.log(createArr(15));
console.log(createArr(6));
console.log(createArr(7));
console.log(createArr(9));
