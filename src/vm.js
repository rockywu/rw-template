import {isDirective, isElementNode, isTextNode, isEventDirective, node2fragment} from './utils'
import VDOM, {createElement} from './vdom'
const textRegex = /\{\{(.*)\}\}/gi
/**
 * $vm 借鉴Vue实现
 * {
 *  beforeCreate() {},
 *  created() {},
 *  beforeMount() {},
 *  mounted() {},
 *  beforeUpdate() {},
 *  updated() {},
 *  beforeDestory() {},
 *  destoryed() {},
 *  data() {return {}},
 *  methods: {},
 *  filter: {}
 * }
 * @param {*} scope 
 */
function vm(scope) {
  this.$el = null;
  this.$vm = scope || {};
  this.$vdom = null;
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
    return VDOM(nodeName, props, Array.from(fragment.childNodes).map(node => {
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
