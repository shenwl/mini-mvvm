import Vue from './libs/vue';


const vm = new Vue({
  el: '#root',
  data: {
    name: 'Allen',
    age: 25
  },
  methods: {
    handlePrint() {
      console.log(this.$data.name);
      console.log('-----print-----');
    }
  }
});


