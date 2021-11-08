/**
 * remove duplication in array
 */

// 方法1： new Set
{
  let arr = [1, 1, 1, 2, 3, 3, 4, 45, 5, 4, 2, 5, 5, 5, 3, 2]
  let newArr = [...new Set(arr)]
  console.log(newArr);
}

//
