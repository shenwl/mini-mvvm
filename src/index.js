import Vue from './libs/vue';


const vm = new Vue({
  el: '#root',
  data: {
    name: 'Allen',
    age: 2
  }
});

setInterval(() => {
  vm.$data.age++;
}, 1000);

