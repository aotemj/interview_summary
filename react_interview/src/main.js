// import React from 'react'
// import ReactDOM from "react-dom";

// const virtualDOM = (
//   <div>A
//     <div>B1</div>
//     <div>B2</div>
//   </div>
// )

// ReactDOM.render(virtualDOM, document.getElementById("root"))

//定义JSX
let style = {
  color: 'green',
  border: '1px solid red',
  margin: '5px'
}

let A = {
  type: 'div',
  key: "A",
  props: {
    style,
    children: [
      {
        type: 'div', key: 'B1', props: {
          style, children: [
            // {
            //   type: 'div',
            //   key: 'C1', props: {
            //     children: []
            //   }
            // }
          ]
        }
      },
      {type: 'div', key: 'B2', props: {style, children: []}}
    ]
  }
}

let workInProgress;

const Placement = 'Placement';
const TAG_ROOT = 'TAG_ROOT'; // Fiber 根节点
const TAG_HOST = "TAG_HOST";// 原生DOM节点

let root = document.getElementById("root")

// Fiber 是一个普通的JS对象
let rootFiber = {
  tag: TAG_ROOT, // Fiber 的类型
  key: 'ROOT', // 唯一标签
  stateNode: root, // Fiber对应的真实DOM节点
  props: {children: [A]}
}

function workLoop() {
  while (workInProgress) { // 如果有任务就执行
    workInProgress = performUnitOfWork(workInProgress); // 执行完成之后会返回下一个任务
  }
  // console.log(rootFiber)
  commitRoot(rootFiber)
}

function performUnitOfWork(workInProgress) {
  console.log('performUnitOfWork', workInProgress.key)
  beginWork(workInProgress)
  if (workInProgress.child) {
    return workInProgress.child
  }
  while (workInProgress) {
    completeUnitOfWork(workInProgress) // 完成执行单元
    if (workInProgress.sibling) {
      return workInProgress.sibling
    }

    workInProgress = workInProgress.return
  }
}

function completeUnitOfWork(workInProgress) {
  console.log('completeUnitOfWork', workInProgress.key)
  let stateNode;
  switch (workInProgress.tag) {
    case TAG_HOST:
      stateNode = createStateNode(workInProgress);
      break;
  }
  // 完成后开始构建Effect链表
  makeEffectList(workInProgress)
}

function commitRoot(rootFiber) {
  console.log(rootFiber);
  let currentEffect = rootFiber.firstEffect
  while (currentEffect) {
    let flag = currentEffect.flag;
    switch (flag) {
      case Placement:
        commitPlacement(currentEffect)
    }
    currentEffect = currentEffect.nextEffect
  }
}

function commitPlacement(currentEffect) {
  let parent = currentEffect.return.stateNode;
  parent.appendChild(currentEffect.stateNode)
}

function makeEffectList(completeWork) {
  console.log(completeWork.key);
  let returnFiber = completeWork.return;
  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = completeWork.firstEffect;
    }
    if (completeWork.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = completeWork.lastEffect
      }
      returnFiber.lastEffect = completeWork.lastEffect
    }
    if (completeWork.flag) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = completeWork
      } else {
        returnFiber.firstEffect = completeWork
      }
      returnFiber.lastEffect = completeWork
    }
  }
}

function createStateNode(fiber) {
  const stateNode = document.createElement(fiber.type)
  fiber.stateNode = stateNode
  return fiber.stateNode
}

// 根据当前的Fiber 和虚拟 DOM 构建Fiber 树
function beginWork(workInProgress) {
  console.log('beginWork', workInProgress?.key)
  const nextChildren = workInProgress?.props?.children || []
  return reconcileChildren(workInProgress, nextChildren)
}

// 调和调度 children
function reconcileChildren(returnFiber, nextChildren) {
  const length = nextChildren.length;
  let firstChildFiber, previousChildNewFiber;
  for (let i = 0; i < length; i++) {
    let newFiber = createFiber(nextChildren[i])
    newFiber.return = returnFiber
    newFiber.flag = Placement;
    if (!firstChildFiber) {
      firstChildFiber = newFiber
    } else {
      previousChildNewFiber.sibling = newFiber
    }

    previousChildNewFiber = newFiber
  }
  returnFiber.child = firstChildFiber
  return firstChildFiber
}

function createFiber(element) {
  const {type, key, props} = element
  return {
    tag: TAG_HOST, // 原生DOM节点
    type, // 具体div p span
    key, // 唯一标识
    props, // 属性对象
  }
}

// 正在执行的工作单元
workInProgress = rootFiber
workLoop()
