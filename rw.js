import VM from "./src/vm"




var vm = VM.createApp({
  data() {
    return {}
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestory() {},
  destoryed() {},
  data() {return {}},
  methods: {},
  filter: {},
}).mount('#app');
console.log("vm", vm)
vm.render();

export default VM;