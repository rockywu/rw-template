/**
 * 判断是否为标签节点
 * @param {*} node 
 * @returns 
 */
export function isElementNode(node) {
  return node.nodeType == 1; //元素节点
}

/**
 * 判断是否是文本节点
 * @param {*} node 
 * @returns 
 */
export function isTextNode(node) {
  return node.nodeType == 3; //元素节点
}

/**
 * 判断是否是指令
 * @param {*} attr 
 * @returns 
 */
export function isDirective(attr) {
  return ("" + attr).startsWith('v-');
}

/**
 * 判断是否为事件指令
 * @param {*} dir 
 * @returns 
 */
export function isEventDirective(dir) {
  return ("" + dir).startsWith('@');
}