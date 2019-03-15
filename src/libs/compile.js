import Observer from "./observer";

export default class Compile {
  constructor(vm) {
    this.vm = vm;
    this.node = vm.$el;
    this.compile();
  }

  compile() {
    this.traverse(this.node);
  }

  bindEventHandler(node, attr) {
    const eventType = attr.name.substr(5);
    const methodName = attr.value;
    node.addEventListener(eventType, this.vm.$methods[methodName]);
  }

  bindModel(node, attr) {
    const key = attr.value;
    node.value = this.vm.$data[key];
    console.log(this.vm.$data, key)
    console.log(this.vm)
    new Observer(this.vm, key, (newVal) => {
      node.value = newVal;
    });

    node.oninput = e => {
      console.log(this.vm.$data);
      this.vm.$data[key] = e.target.value;
    };
  }

  isModelDirective(attrName) {
    return attrName === 'v-model';
  }

  isEventDirective(attrName) {
    return attrName.indexOf('v-on') === 0;
  }

  // 处理指令
  compileNode(node) {
    let attrs = Array.from(node.attributes);
    attrs.forEach(attr => {
      //attr 是个对象，attr.name 是属性的名字如 v-model， attr.value 是对应的值
      if (this.isModelDirective(attr.name)) {
        this.bindModel(node, attr);
      }
      if (this.isEventDirective(attr.name)) {
        this.bindEventHandler(node, attr);
      }
    });
  }

  compileText(node) {
    const reg = /{{(.+?)}}/g;
    let match;
    while (match = reg.exec(node.nodeValue)) {
      let raw = match[0];
      let key = match[1].trim();
      node.nodeValue = node.nodeValue.replace(raw, this.vm.$data[key]);
      new Observer(this.vm, key, (val, oldVal) => {
        node.nodeValue = node.nodeValue.replace(oldVal, val);
      });
    }
  }

  traverse(node) {
    if (node.nodeType === 1) {
      this.compileNode(node);
      node.childNodes.forEach(childNode => {
        this.traverse(childNode);
      });
    } else if (node.nodeType === 3) {
      this.compileText(node);
    }
  }
}
