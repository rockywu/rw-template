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
function VScope(options) {
  this.$options = options || {};
  let methods = options.methods || {};
  let filters = options.filters || {};
  this.$data = options.data.bind(this)();
  Object.assign(this, this.$data)
  //初始化函数
  this.$methods = {};
  this.$filters = {};
  //初始化函数
  for(let key in methods) {
    this.$methods[key] = methods[key].bind(this);
  }
  //初始化过滤器
  for(let key in filters) {
    this.$filters[key] = filters[key].bind(this);
  }
}

function funcRun(scope, key) {
  if(scope.$options && key && typeof scope.$options[key] === 'function') {
    scope.$options[key].call(scope);
  }
}

VScope.prototype = {
  constructor: VScope,
  _lifecycle(key) {
    let options = this.$options;
    if(key && typeof options[key] === 'function') {
      options[key].call(this);
    }
  },
  setData(data) {
    Object.assign(this.$data, data)
    Object.assign(this, this.$data);
  },
  beforeCreate() {
    this._lifecycle('beforeCreate')
  },
  created() {
    this._lifecycle('created')
  },
  beforeMount() {
    this._lifecycle('beforeMount')
  },
  mounted() {
    this._lifecycle('mounted')
  },
  beforeUpdate() {
    this._lifecycle('beforeUpdate')
  },
  updated() {
    this._lifecycle('updated')
  },
  beforeDestory() {
    this._lifecycle('beforeDestory')
  },
  destoryed() {
    this._lifecycle('destoryed')
  },
}

export default VScope;