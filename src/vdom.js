/**
 * 创建虚拟节点
 * @param {*} tag 
 * @param {*} props 
 * @param {*} children 
 */
export default function VDom(tag, props, children) {
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
    setProps(element, props);
    //创建子元素
    children.map(createElement).forEach(element.appendChild.bind(element));
    return element;
  } else {
    return document.createTextNode(vdom);
  }
}