import React from 'react'
import ReactDOM from 'react-dom'

class ParentCom extends React.Component {
  parentRef = React.createRef()
  childRef = React.createRef()

  componentDidMount() {
    this.parentRef.current.addEventListener("click", () => {
      console.log("父元素原生捕获")
    }, true)
    this.parentRef.current.addEventListener("click", () => {
      console.log("父元素原生冒泡")
    })

    this.childRef.current.addEventListener("click", () => {
      console.log("子元素原生捕获")
    }, true)
    this.childRef.current.addEventListener("click", () => {
      console.log("子元素原生冒泡")
    })

    document.addEventListener("click", () => {
      console.log('document 捕获');
    }, true)
    document.addEventListener("click", () => {
      console.log('document 冒泡');
    })
  }

  parentBubble = () => {
    console.log('父元素React 事件冒泡');
  }
  childBubble = () => {
    console.log('子元素React 事件冒泡');
  }
  parentCapture = () => {
    console.log('父元素React 事件捕获');
  }
  childCapture = () => {
    console.log('子元素React 事件捕获');
  }

  render() {
    return (
      <div ref={this.parentRef} onClick={this.parentBubble} onClickCapture={this.parentCapture}>
        <p ref={this.childRef} onClick={this.childBubble} onClickCapture={this.childCapture}>事件执行顺序</p>
      </div>
    )
  }
}


ReactDOM.render(ParentCom, document.getElementById("root"))
