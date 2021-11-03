/**
 * 解析器
 */
import {parseFilters} from './filter-parser'
import {parseText} from './text-parser'
import {HTMLtoAST} from './html-parser'
export const bindRE = /^:|^\.|^v-bind:/

function formatAst(ast) {
  if(ast.type === 2) {
    //文本ast
    ast.parse = parseText(ast.text);
  } else {
    ast.children = ast.children.map(one => {
      return formatAst(one)
    })
    ast.attrs = ast.attrs.map(attr => {
      if(bindRE.test(attr.name)) {
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