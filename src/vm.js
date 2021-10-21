import {isDirective, isElementNode, isTextNode, isEventDirective} from './utils'
import VDOM, {createElement} from './vdom'
const textRegex = /\{\{(.*)\}\}/gi
class vm {

  constructor(scope) {
    this.$el = null;
    this.$scope = scope;
    this.$vm = null;
    this.$fragment = null;
  }

  initFragment(el) {
    this.$fragment = this.node2fragment(el);
  }

  // 将根节点转移至文档碎片
  node2fragment(el) {
    // 创建文档碎片
    let fragment = document.createDocumentFragment();
    let child;
    // 循环取出根节点中的节点并放入文档碎片中
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  }

  /**
   * 挂载节点
   * @param {*} el 
   * @returns 
   */
  mount(el) {
    this.$el = isElementNode(el) ? el : document.querySelector ? document.querySelector(el) : document.getElementById(el.replace(/^#/, ''));
    this.initFragment(this.$el);
    return this;
  }


  /**
   * 
   * 编译文档碎片
   */
  compile(fragment) {
    let childNodes = fragment.childNodes;
    //转为数组进行遍历
    Array.from(childNodes).forEach(node => {
      if(isElementNode(node)) {
        this.compileElement(node);
      } else if(isTextNode(node)) {
        let texts = node.textContent.match(textRegex)
        if(texts && texts.length) {
          this.compileText(node, texts);
        }
      }
      if(node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    })
  }

  /**
   * 编译Text内容
   * @param {*} node 
   * @param {*} exps 
   */
  compileText(node, exps) {

  }

  /**
   * 编译Element元素
   */
  compileElement(node) {

  }
}

export default vm