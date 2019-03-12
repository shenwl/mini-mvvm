import Subject from './subject';

export default class Observer {
  constructor(name, update) {
    if(typeof update !== 'function') {
      throw new Error('update must be a function');
    }
    this.name = name;
    this.update = update;
    this.subscribeTo = this.subscribeTo.bind(this);
  }

  subscribeTo(subject) {
    if(!(subject instanceof Subject)) {
      return console.warn('must subscribe to a Subject instance');
    }
    subject.addObserver(this);
  }
}
