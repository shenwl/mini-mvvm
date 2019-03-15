import observe from './observe';
import Compile from './compile'

export default class Vue {
  constructor(options) {
    this.init(options);
    observe(this.$data);
    new Compile(this);
  }

  init(options) {
    const {el, data, methods} = options;
    this.$el = document.querySelector(el);
    this.$data = data;
    this.$methods = methods;
  }
}
