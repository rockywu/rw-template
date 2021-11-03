/**
 * 在这里生命指令行为
 * 指令前缀v-
 */
function Directive() {

}

Directive.prototype = {
  constructor: Directive,
  /**
   * 绑定规则,创建指令
   * @param {*} name 
   * @param {*} binding //绑定指令行为
   * @param {*} unbundling  //解绑指令行为
   */
  create(name, binding, unbundling) {
    this._directives[name] = callback;
  }
}

const D = new Directive();

D.create("v-if", function(EL) {});
D.create("v-elseif", function() {});
D.create('v-else', function() {});
export default D;
