// application of reduce
{
  // 计算数组中每个元素出现的次数
  let arr = [1, 2, 1, 3, 1, 2, 3, 4]

  let obj = arr.reduce((prev, curr) => {
    if (prev[curr]) {
      prev[curr] += 1
    } else {
      prev[curr] = 1
    }
    return prev
  }, {})

  console.log(obj);
}

{
  // 数组去重
  let arr = [1, 2, 1, 3, 1, 2, 3, 4]

  let newArr = arr.reduce((prev, curr) => {
    if (prev.indexOf(curr) === -1) {
      prev.push(curr)
    }
    return prev
  }, [])

  console.log(newArr);
}

{
//  将多维数组转化为1维数组
  let arr = [[1, 2, [1, 2, [1, 2, 3]]], [2, 3], [4, 5]];

  function flatByReduce(arr) {
    return arr.reduce((prev, curr) => {
      return prev.concat(Array.isArray(curr) ? flatByReduce(curr) : curr)
    }, [])
  }

  console.log(flatByReduce(arr));
}
