import {isTextNode, isElementNode, isDirective, isEventDirective} from './utils'
import {parseHTML} from './parser/html-parser'
import {parseText} from './parser/text-parser'
import {parseFilters} from './parser/filter-parser'
Object.assign(window, {
  parseHTML,
  parseText,
  parseFilters
})

/**
 * 文本元素j
 * @param {*} fragment 
 */
function NodeText(fragment) {
  this.value = fragment.nodeValue;
}

/**
 * 节点元素
 * @param {*} fragment 
 */
function NodeElm(fragment) {

}

/**
 * 将node节点，解析为虚拟节点对象
 * @param {*} fragment 
 */
export function complier(fragment) {
  if(isTextNode(fragment)) {
    return new NodeText(fragment);
  }
  //非文本类型元素
  let props = {};
  Array.from(fragment.attributes || []).forEach(function(attr) {
    props[attr.name] = attr.value;
  });
  let nodeName = ("" + fragment.nodeName).replace(/^#/, "");
  return VDom(nodeName, props, Array.from(fragment.childNodes).map(node => {
    return complier(node);
  }))




}

/**
 * 解析器，将节点解析为可以序列号的虚拟dom
 * @param {*} fragment 
 * @returns 
 */
export function Dom(fragment) {
  if(isTextNode(fragment)) {
    return fragment.nodeValue;
  }
  if(!(this instanceof Dom)) {
    return new Dom(fragment);
  }
  //标记
  this.tag = '';
  //属性
  this.props = '';
  //子元素
  this.children = [];
  //是否需要更新
  this.canUpdate = false;
  return this._init(fragment);
}

Dom.prototype = {
  constructor: Dom,
  /**
   * 
   * @param {*} fragment element 元素
   */
  _init(fragment) {
    //非文本类型元素
    let props = {};
    Array.from(fragment.attributes || []).forEach(function(attr) {
      props[attr.name] = attr.value;
    });
    this.tag = ("" + fragment.nodeName).replace(/^#/, "");
    this.props = props;
    this.children = Array.from(fragment.childNodes).map(node => {
      return Dom(node);
    })
  }
}

//可以获取{{}}中的内容 /\{\{((?:.|\r?\n)+?)\}\}/g
/**
 * 创建虚拟节点
 * @param {*} tag 
 * @param {*} props 
 * @param {*} children 
 */
export function VDom(tag, props, children) {
  if(!(this instanceof VDom)) {
    return new VDom(tag, props, children)
  }
  this.tag = tag;
  this.props = props || {};
  this.children = children || [];
  let count = 0;
  this.children.forEach(vdom => {
    if(vdom instanceof VDom) {
      count += vdom.count;
    }
    count++;
  });
  this.count = count;
}

VDom.prototype = {
  constructor: VDom,
  render() {
    return createElement(this);
  }
}





function setProps(element, props) {
  for(let key in props) {
    element.setAttribute(key, props[key])
  }
}

/**
 * 将虚拟节点渲染为真实DOM节点
 * @param {VDom} vdom 
 */
 export function createElement(vdom) {
  if(vdom instanceof VDom) {
    const {tag, props, children} = vdom;
    let element = null;
    if(tag === "document-fragment") {
      element = document.createDocumentFragment();
    } else {
      element = document.createElement(tag);
    }
    console.log("props", props)
    setProps(element, props);
    //创建子元素
    children.map(createElement).forEach(element.appendChild.bind(element));
    return element;
  } else {
    return document.createTextNode(vdom);
  }
}

/**
 * 执行解析内容
 * @param {*} parseValue 
 * @param {*} scope 
 * @returns 
 */
export function evalParse(parseValue, scope) {
  let keys = Object.keys(scope);
  let values = Object.keys(keys).map(i => {
    let key = keys[i];
    if(typeof scope[key] === 'function') {
      return scope[key].bind(scope)
    } else {
      return scope[key];
    }
  });
  keys.push("return " + parseValue);
  return new Function(...keys).apply(null, values)
}
