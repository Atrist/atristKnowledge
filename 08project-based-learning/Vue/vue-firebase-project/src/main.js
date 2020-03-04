import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase';

Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: "AIzaSyAKZc4Zc6QjNSd8wnZnGeCS-SBkXPj0UOM",
  authDomain: "atristvuefirebase.firebaseapp.com",
  databaseURL: "https://atristvuefirebase.firebaseio.com",
  projectId: "atristvuefirebase",
  storageBucket: "atristvuefirebase.appspot.com",
  messagingSenderId: "996783481619",
  appId: "1:996783481619:web:414f5b30d5ab602314b0e6",
  measurementId: "G-TD8545K8DD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

