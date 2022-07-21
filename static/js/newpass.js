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
      
        $('#newpass_click').on('click',function(){
        const email = $('#regmail').val();
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("已發送電子郵件，請查收");
            window.location.href='/';
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("電子郵件錯誤！請確認");
            
            // ..
        });

    })
});