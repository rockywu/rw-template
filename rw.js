import VM from "./src/index"
var vm = VM.createApp({
  data() {
    return {
      a: 1,
      b: 2
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestory() {},
  destoryed() {},
  methods: {
    getName() {
      return {
        a: this.a,
        b: this.b
      }
    }
  },
  filter: {
    filter1() {
      return {
        aa: 11,
        b: this.a + this.b
      }
    }
  },
}).mount('#app');
console.log("vm", vm)
vm.render();
window.vm = vm;

export default VM;