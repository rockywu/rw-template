/**
 * 解析器
 */
import {parseFilters} from './filter-parser'
import {parseText} from './text-parser'
import {HTMLtoAST} from './html-parser'
export const bindRE = /^:|^\.|^v-bind:/
export const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/
export const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/
const stripParensRE = /^\(|\)$/g

export function parseFor (exp){
  const inMatch = exp.match(forAliasRE)
  if (!inMatch) return
  const res = {}
  res.for = inMatch[2].trim()
  const alias = inMatch[1].trim().replace(stripParensRE, '')
  const iteratorMatch = alias.match(forIteratorRE)
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim()
    res.iterator1 = iteratorMatch[1].trim()
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim()
    }
  } else {
    res.alias = alias
  }
  return res
}

/**
 * 解析v-if v-else-if v-else
 * @param {*} el 
 */
// export function processIf (el) {
//   const exp = getAndRemoveAttr(el, 'v-if')
//   if (exp) {
//     el.if = exp
//     addIfCondition(el, {
//       exp: exp,
//       block: el
//     })
//   } else {
//     if (getAndRemoveAttr(el, 'v-else') != null) {
//       el.else = true
//     }
//     const elseif = getAndRemoveAttr(el, 'v-else-if')
//     if (elseif) {
//       el.elseif = elseif
//     }
//   }
// }

export
/**
 * 进行ast基本语法解析
 * v-for v-if v-elif v-else 
 * @param {*} ast 
 * @returns 
 */
function formatAst(ast) {
  if(ast.type === 2) {
    //文本ast
    ast.parse = parseText(ast.text);
  } else {
    ast.children = ast.children.map(one => {
      return formatAst(one)
    })
    ast.attrs = ast.attrs.map(attr => {
      if(attr.name == "v-for") {
        //v-for语句
        attr.parse = parseFor(attr.value);
        console.log("v-for", attr.parse)
      } else if(bindRE.test(attr.name)) {
        //需要解析
        attr.parse = parseFilters(attr.value)
      } else {
        attr.parse = void 0;
      }
      return attr;
    })
  }
  return ast;
}
/**
 * html解析
 */
export function htmlParser(html) {
  let ast = HTMLtoAST(html)
  //解析获取属性或内容解析
  return formatAst(ast)
}