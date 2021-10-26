function debounce(fn, delay) {
  let timer = null
  return function () {
    clearTimeout(timer)
    let args = arguments
    timer = setTimeout(() => {
      fn.apply(this, args)
      clearTimeout(timer)
    }, delay)
  }
}



