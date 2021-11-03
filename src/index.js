import {node2fragment} from './utils'
import {htmlParser} from './parser/index'

let dom = document.getElementById('app');
let html = dom.outerHTML;
let ast = htmlParser(html);
node2fragment(document.getElementById('app'))


//将ast转变为dom节点

function renderAst(ast, obj, exts) { 
  exts = exts || {}
  let el;
  if(ast.type === 2) {
    //文本直接渲染
    if(ast.parse) {
      let keys = Object.keys(exts).map(key => key);
      let values = Object.values(exts);
      let val;
      console.log("keys", keys, values)
      if(keys.length == 2) {
        val = new Function(keys[0], keys[1], "return " + ast.parse.expression).apply(obj, values)
      } else {
        val = new Function("return " + ast.parse.expression).call(obj)
      }
      console.log("aaaa", val)
      el = document.createTextNode(val)
    } else {
      el = document.createTextNode(ast.text)
    }
  } else {
    let vfor = null;
    vfor = ast.attrs.find(attr => {
      return attr.name == 'v-for' && attr.parse && attr.parse.for ? true : false
    })
    //节点类型进行创建
    function renderOne(exts) {
      var elOne = document.createElement(ast.tag);
      // let vfor = null;
      ast.attrs.map(attr => {
        if(!(attr.parse && attr.parse.for))  {
          elOne.setAttribute(attr.name, attr.value)
        }
      })
      ast.children.map(child => {
        let tmps = renderAst(child, obj, exts)
        if(!(tmps instanceof Array)) {
          tmps = [tmps];
        }
        tmps.map(tmp => {
          elOne.appendChild(tmp)
        })
      })
      return elOne;
    }
    if(vfor) {
      console.log("vfor.parse", vfor.parse)
      let vforParse = vfor.parse;
      let forData = new Function("return " + vfor.parse.for).call(obj);
      // tmpExts[]
      el = Object.keys(forData).map(key => {
        let val = forData[key];
        let tmpExts = {
          [vforParse.alias]: val,
          [vforParse.iterator1 || 'index']: key
        };
        return renderOne(tmpExts)
      })
    } else {
      return renderOne()
    }
  }
  return el;
}

let obj = {
  age: "我的年龄",
  info: "我的信息",
  name: "我的名字",
  list: {
    a: "a1",
    b: "b2",
    c: "c3",
    d: "d4"
  },
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
  },
};
function replaceNode(oldNode, newNode) {
  oldNode.parentNode.replaceChild(newNode, oldNode)
}
replaceNode(dom, renderAst(ast, obj))


