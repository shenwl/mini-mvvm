import Subject from './subject';
import helper from './helper';

const observe = (data) => {
  if (!data || typeof data !== 'object') return;

  for (let key in data) {
    let val = data[key];
    let subject = new Subject();
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        console.log(`key-name: ${key}: val`);
        if (helper.currentObserver) {
          console.log('currentObserver added');
          helper.currentObserver.subscribeTo(subject);
        }
        return val;
      },
      set: function (newVal) {
        val = newVal;
        console.log('notify val:', newVal);
        subject.notify();
      }
    });
    if (typeof val === 'object') {
      observe(val);
    }
  }
};

export default observe;
