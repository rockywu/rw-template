/**
 * 创建虚拟节点
 * @param {*} tag 
 * @param {*} props 
 * @param {*} children 
 */
export default function VDOM(tag, props, children) {
  if(!(this instanceof VDOM)) {
    return new VDOM(tag, props, children)
  }
  this.tag = tag;
  this.props = props || {};
  this.children = children || [];
  let count = 0;
  this.children.forEach(vdom => {
    if(vdom instanceof VDOM) {
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
 * 创建虚拟节点
 * @param {VDOM} vdom 
 */
 export function createElement(vdom) {
  if(vdom instanceof VDOM) {
    const {tag, props, children} = vdom;
    let element = document.createElement(tag);
    setProps(element, props);
    //创建子元素
    children.map(createElement).forEach(element.appendChild.bind(element));
    return element;
  } else {
    return document.createTextNode(vdom);
  }
}