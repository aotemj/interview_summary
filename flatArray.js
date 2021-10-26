// make the nest Array flat
function flatArray(arr) {
  let length = arr.length;
  let res = []
  for (let i = 0; i < length; i++) {
    const item = arr[i]
    if (Array.isArray(item)) {
      res.push(...flatArray(item))
    } else {
      res.push(item)
    }
  }
  return res
}

// method2 use reduce
function flatArray2(arr) {
  return arr.reduce((res, prev) => {
    return res.concat(Array.isArray(prev) ? flatArray2(prev) : prev)
  }, [])
}

let arr = [1, [1, 2, 3, [4, 5, 6], 7, [8, [9]]]]

let newArr = flatArray2(arr)
console.log(newArr);
