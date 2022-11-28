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
      
      $(document).on('click','#newpass_click',function(){
        const email = $('#regmail').val();
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
             var seconds =3;
            $('#back').html("");
            var msg = '<div id="note">';
            msg += '<div id="text">已發送電子郵件，請查收<br>將為您轉跳登入頁</div></div>';
            $('#back').append(msg);
            $('#back').show();
          setInterval(function () {
            seconds--;

            if (seconds == 0) {
              $("#mess").hide();
              window.location.href='/';
              //window.location.href='/reg_manager'+'?mail='+re_mail;
            }
          }, 1000);

            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            $('#back').html("");
            var msg = '<div id="note">';
            msg += '<div id="text">電子郵件錯誤！請重新確認<br><button>確定</button></div></div>';
            $('#back').append(msg);
            $('#back').show();
        
        });
        $('body').click((e) => {
            if (['back','note','text'].indexOf(e.target.id) > -1) {
                console.log("....")
                return false;
            }
            $('#back').hide();
        })
        
    })
   
});