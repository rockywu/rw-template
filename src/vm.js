import {isDirective, isElementNode, isTextNode, isEventDirective, node2fragment} from './utils'
import VDom, {createElement} from './vdom'
import VScope from './vscope'
const textRegex = /\{\{(.*)\}\}/gi

function vm(options) {
  this.$el = null;
  this.$vdom = null;
  this.$vm = new VScope(options || {})
}

vm.prototype = {
  constructor: vm,
  mount(el) {
    this.$el = isElementNode(el) ? el : document.querySelector ? document.querySelector(el) : document.getElementById(el.replace(/^#/, ''));
    let fragment = node2fragment(this.$el);
    this.$vdom = this.compile(fragment);
    return this;
  },

  /**
   * 编译文档碎片转为虚拟节点
   * @param {*} fragment 
   */
  compile(fragment) {
    if(isTextNode(fragment)) {
      return fragment.nodeValue;
    }
    //非文本类型元素
    let props = {};
    Array.from(fragment.attributes || []).forEach(function(attr) {
      props[attr.name] = attr.value;
    });
    let nodeName = ("" + fragment.nodeName).replace(/^#/, "");
    return VDom(nodeName, props, Array.from(fragment.childNodes).map(node => {
      return this.compile(node);
    }))
  },
  render() {
    this.$el.appendChild(createElement(this.$vdom))
  }
}

vm.createApp = function(scope) {
  return new vm(scope)
}

export default vm;
