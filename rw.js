import vm from "./src/vm"

vm.createApp = function(scope) {
  return new vm(scope)
}


var t = vm.createApp({}).mount('#app');
console.log("rwvm", t)
export default vm;