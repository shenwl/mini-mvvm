import observe from './observe';
import Observer from './observer';

export default class Vue {
  constructor(options) {
    this.init(options);
    observe(this.$data);
    this.compile();
  }

  init(options) {
    const {el, data} = options;
    this.$el = document.querySelector(el);
    this.$data = data;
  }

  compile() {
    this.traverse(this.$el);
  }

  traverse(node) {
    if (node.nodeType === 1) {
      node.childNodes.forEach(childNode => {
        this.traverse(childNode);
      });
    } else if (node.nodeType === 3) {
      this.renderText(node);
    }
  }

  renderText(node) {
    const reg = /{{(.+?)}}/g;
    let match;
    while (match = reg.exec(node.nodeValue)) {
      let raw = match[0];
      let key = match[1].trim();
      node.nodeValue = node.nodeValue.replace(raw, this.$data[key]);
      new Observer(this, key, (val, oldVal) => {
        node.nodeValue = node.nodeValue.replace(oldVal, val);
      });
    }
  }
}
