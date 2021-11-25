const vnode = {
  tag: 'DIV',
  attrs: {
    id: 'app'
  },
  children: [
    {
      tag: 'SPAN',
      children: [{
        tag: 'A',
        children: []
      }]
    },
    {
      tag: "SPAN",
      children: [{
        tag: 'A',
        children: []
      },
        {
          tag: 'A',
          children: []
        }
      ]
    }
  ]
}


function setAttributes(DOM, vnode) {
  const {attrs} = vnode
  for (const key in attrs) {
    DOM.setAttribute(key, attrs[key])
  }
  return DOM
}

function createElement(vnode) {
  const {tag} = vnode
  return document.createElement(tag.toLowerCase())
}

function renderChildren(DOM, vnode) {
  const {children} = vnode
  const length = children.length
  let DOMList = []
  if (length) {
    for (let i = 0; i < length; i++) {
      let itemDOM = render(children[i])
      DOMList.push(itemDOM)
    }
    DOMList.forEach(item => {
      DOM.appendChild(item)
    })
  }
}

function render(vnode) {
  if (typeof vnode === 'object') {
    let DOM = createElement(vnode)
    setAttributes(DOM, vnode)
    renderChildren(DOM, vnode)
    return DOM
  }
}

let DOM = render(vnode);
document.body.appendChild(DOM)
