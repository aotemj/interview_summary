/**
 * remove duplication in array
 */

let arr = [1, 1, 1, 2, 3, 3, 4, 45, 5, 4, 2, 5, 5, 5, 3, 2]
// 方法1： new Set
{
  let newArr = [...new Set(arr)]
  console.log(newArr);
}

// 方法2： hash
{
  let map = new Map(), newArr = []
  for (const item of arr) {
    if (!map.has(item)) {
      map.set(item, 1)
      newArr.push(item)
    }
  }
  console.log(newArr);
}
