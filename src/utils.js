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

/**
 * 捕获去除节点信息
 * @param {*} el 
 * @returns 
 */
export function node2fragment(el) {
  // 创建文档碎片
  let fragment = document.createDocumentFragment();
  let child;
  // 循环取出根节点中的节点并放入文档碎片中
  while (child = el.firstChild) {
    fragment.appendChild(child);
  }
  return fragment;
}
