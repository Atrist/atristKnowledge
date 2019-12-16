import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase';

Vue.config.productionTip = false

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

