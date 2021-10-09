function checkWebp() {
  try {
    // 检测当前浏览器是否可以支持webp 格式图片
    document.createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:/image/webp') !== 0
  } catch (e) {
    return false
  }
}
