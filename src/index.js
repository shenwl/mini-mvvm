import observe from './libs/observe';
import Observer from './libs/observer';
import Subject from './libs/subject';

const subject1 = new Subject();

const observer1 = new Observer('hunger', () => {
  console.log('hunger update')
});

observer1.subscribeTo(subject1)

subject1.notify();
