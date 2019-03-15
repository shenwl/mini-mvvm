export default class Compile {
  constructor(vm) {
    this.vm = vm;
    this.node = vm.$el;
    this.compile();
  }

  compile() {
    this.traverse(this.node)
  }

  traverse(node) {

  }
}
