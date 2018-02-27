import Vue from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'

let vm = new Vue({
  el: '#app',
  render: h => h(App)
})