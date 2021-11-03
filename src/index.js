import {node2fragment} from './utils'
import {htmlParser} from './parser/index'

let dom = document.getElementById('app');
let ast = htmlParser(dom.outerHTML);
node2fragment(document.getElementById('app'))


//将ast转变为dom节点

function renderAst(ast, obj) { 
  let el;
  if(ast.type === 2) {
    //文本直接渲染
    if(ast.parse) {
      let val = new Function("return " + ast.parse.expression).call(obj)
      el = document.createTextNode(val)
    } else {
      el = document.createTextNode(ast.text)
    }
  } else {
    //节点类型进行创建
    el = document.createElement(ast.tag);
    ast.children = ast.children.map(child => {
      el.appendChild(renderAst(child, obj))
    })
  }
  return el;
}

let el = renderAst(ast, {
  age: "我的年龄",
  info: "我的信息",
  name: "我的名字",
  filters: {
    format(value, ...args) {
      console.log('format', value, args)
      return value;
    }

  },
  __rf(name) {
    if(typeof this.filters[name] === 'function') {
      return this.filters[name].bind(this)
    } else {
      throw new Error('filter ' + name  + " is no exist")
    }
  },
  __rt(value) {
    return value;
  }
})

function replaceNode(oldNode, newNode) {
  console.log("newNode", newNode)
  oldNode.parentNode.replaceChild(newNode, oldNode)
}
replaceNode(dom, el)

