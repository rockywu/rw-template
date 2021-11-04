import {node2fragment, _CreateFunction} from './utils'
import {parse} from './_parser/index'
let dom = document.getElementById('app');
let html = dom.outerHTML;
console.log('html', html.trim())
console.log(parse(html))
// let ast = htmlParser(html.trim());
// console.log('ast', ast)
// node2fragment(document.getElementById('app'))
// var a = Object.create(null)
// console.log(a)


// //将ast转变为dom节点

// function renderAst(ast, obj, exts) { 
//   exts = exts || {}
//   let extsKeys = Object.keys(exts).map(key => key);
//   let extsValues = Object.values(exts);
//   let el;
//   if(ast.type === 2) {
//     //文本直接渲染
//     if(ast.parse) {
//       let val;
//       if(extsKeys.length == 2) {
//         val = _CreateFunction(["return " + ast.parse.expression]).apply(obj, extsValues)
//       } else {
//         val = new Function("return " + ast.parse.expression).call(obj)
//       }
//       console.log("aaaa", val)
//       el = document.createTextNode(val)
//     } else {
//       el = document.createTextNode(ast.text)
//     }
//   } else {
//     let vfor = null;
//     vfor = ast.attrs.find(attr => {
//       return attr.name == 'v-for' && attr.parse && attr.parse.for ? true : false
//     })
//     //节点类型进行创建
//     function renderOne(extsOne) {
//       var elOne = document.createElement(ast.tag);
//       // let vfor = null;
//       ast.attrs.map(attr => {
//         if(!(attr.parse && attr.parse.for))  {
//           elOne.setAttribute(attr.name, attr.value)
//         }
//       })
//       ast.children.map(child => {
//         let tmps = renderAst(child, obj, extsOne)
//         if(!(tmps instanceof Array)) {
//           tmps = [tmps];
//         }
//         tmps.map(tmp => {
//           elOne.appendChild(tmp)
//         })
//       })
//       return elOne;
//     }
//     if(vfor) {
//       console.log("vfor.parse", vfor.parse, exts, extsKeys.length)
//       let vforParse = vfor.parse;
//       let forData = new Function("return " + vfor.parse.for).call(extsKeys.length > 0 ? exts : obj);
//       // tmpExts[]
//       el = Object.keys(forData).map(key => {
//         let val = forData[key];
//         let tmpExts = {
//           [vforParse.alias]: val,
//           [vforParse.iterator1 || 'index']: key
//         };
//         return renderOne(Object.assign(tmpExts, exts))
//       })
//     } else {
//       return renderOne(exts)
//     }
//   }
//   return el;
// }

// let obj = {
//   age: "我的年龄",
//   info: "我的信息",
//   name: "我的名字",
//   list: {
//     a: "a1", b: "b2",
//   },
//   list2: {
//     a: ["a1", "a2"],
//     b: ["b1", "b2"],
//   },
//   filters: {
//     format(value, ...args) {
//       console.log('format', value, args)
//       return value;
//     }
//   },
//   __rf(name) {
//     if(typeof this.filters[name] === 'function') {
//       return this.filters[name].bind(this)
//     } else {
//       throw new Error('filter ' + name  + " is no exist")
//     }
//   },
//   __rt(value) {
//     return value;
//   },
// };
// function replaceNode(oldNode, newNode) {
//   oldNode.parentNode.replaceChild(newNode, oldNode)
// }
// replaceNode(dom, renderAst(ast, obj))


