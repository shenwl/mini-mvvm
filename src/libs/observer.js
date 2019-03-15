import helper from "./helper";
import Subject from "./subject";

export default class Observer {
  constructor(vm, key, callback) {
    if (typeof callback !== 'function') {
      throw new Error('callback must be a function');
    }
    this.vm = vm;
    this.key = key;
    this.callback = callback;
    this.subjects = [];
    this.value = this.getValue();

    this.subscribeTo = this.subscribeTo.bind(this);
  }

  update() {
    let oldVal = this.value;
    let value = this.getValue();
    if (value !== oldVal) {
      this.value = value;
      this.callback.bind(this.vm)(value, oldVal);
    }
  }

  getValue() {
    helper.currentObserver = this;
    let value = this.vm.$data[this.key];
    helper.currentObserver = null;
    return value;
  }

  subscribeTo(subject) {
    if (!(subject instanceof Subject)) {
      return console.warn('must subscribe to a Subject instance');
    }
    if(this.subjects.includes(subject)) return;
    this.subjects.push(subject);
    subject.addObserver(this);
  }
}
