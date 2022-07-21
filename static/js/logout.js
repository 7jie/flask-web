$(document).ready(function(){
    const firebaseConfig = {
        apiKey: "AIzaSyAk2Sp6_oP4o1Q1_wOtgOlIKpdaVemoqEI",
        authDomain: "topic-3b33d.firebaseapp.com",
        databaseURL: "https://topic-3b33d-default-rtdb.firebaseio.com",
        projectId: "topic-3b33d",
        storageBucket: "topic-3b33d.appspot.com",
        messagingSenderId: "536031508017",
        appId: "1:536031508017:web:f51954c5819d6923b98710",
        measurementId: "G-20ZX53K4QD"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    
      firebase.auth().signOut().then(function() {
        //alert('您被逐出紫禁城了');
        var user = firebase.auth().currentUser;
        console.log(user)
      })
      $('#click_home').on('click',function(){
        window.location.href='/';
      })
      
      
    });