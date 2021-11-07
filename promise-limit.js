/**
 * 方式一
 * 实现并发调用，最大并发数
 * @param urls 需要调用的url 信息
 * @param handler 处理函数
 * @param poolLimit 最大并发数
 */
function limitLoad(urls, handler, poolLimit) {
  const copyUrls = Array.from(urls)

  const executingPromises = copyUrls.splice(0, poolLimit).map(item => {
    return handler(item)
  })

  let p = Promise.race(executingPromises)
  for (const copyUrl of copyUrls) {
    p = p.then((index) => {
      executingPromises[index] = handler(copyUrl).then(() => {
        return index
      })
      return Promise.race(executingPromises)
    })
  }
}

const urls = [
  {
    info: 'xxx1',
    time: 3000,
    index: 0
  },
  {
    info: 'xxx2',
    time: 2000,
    index: 1
  }, {
    info: 'xxx3',
    time: 3000,
    index: 2
  },
  {
    info: 'xxx4',
    time: 2000,
    index: 3
  }, {
    info: 'xxx5',
    time: 3000,
    index: 4
  },
  {
    info: 'xxx6',
    time: 2000,
    index: 5
  }, {
    info: 'xxx7',
    time: 3000,
    index: 6
  },
  {
    info: 'xxx8',
    time: 2000,
    index: 7
  }, {
    info: 'xxx9',
    time: 3000,
    index: 8
  },
  {
    info: 'xxx10',
    time: 2000,
    index: 9
  }, {
    info: 'xxx11',
    time: 3000,
    index: 10
  },
  {
    info: 'xxx12',
    time: 2000,
    index: 11
  }, {
    info: 'xxx13',
    time: 3000,
    index: 12
  },
  {
    info: 'xxx14',
    time: 2000,
    index: 13
  }, {
    info: 'xxx15',
    time: 3000,
    index: 14
  },
  {
    info: 'xxx16',
    time: 2000,
    index: 15
  }, {
    info: 'xxx17',
    time: 3000,
    index: 16
  },
  {
    info: 'xxx18',
    time: 2000,
    index: 17
  }, {
    info: 'xxx19',
    time: 3000,
    index: 18
  },
  {
    info: 'xxx20',
    time: 2000,
    index: 19
  }, {
    info: 'xxx21',
    time: 3000,
    index: 20
  },
  {
    info: 'xxx22',
    time: 2000,
    index: 21
  },
]

function loadImg(url) {
  if (!url) return
  return new Promise((resolve, reject) => {
    console.log("---" + url.info + " start")
    setTimeout(() => {
      console.log(url.info + " ok!!!")
      resolve(url.index)
    }, url.time)
  })
}

limitLoad(urls, loadImg, 3)
