$(document).ready(function() {

  //document.cookie = 'cookie3=home=1;path=/';

  //var cookieAry = document.cookie.split(';');
  //document.cookie = 'ttt=; expires=Thu, 01 Jan 1970 00:00:00 GMT';

  //console.log(document.cookie)

  introJs().setOptions({
    steps: [
      {
        intro:'歡迎使用'
      },
      {element: document.querySelector('.right_ra'),
        intro: "請登入"},
      {element: document.querySelector('.left_ra'),
        intro: "點此切換註冊"},
      {element: document.querySelector('a'),
        intro: "忘記密碼請點此"}
    ],
    nextLabel:'下一步>>',
    prevLabel:'<<上一步',
    skipLabel:'跳過',
    doneLabel: '我知道了'
  }).start();
  var reg_m=Boolean;
  var reg_pass=Boolean;
  var reg_c_pass=Boolean;
  var password=String;
  /*
  const firebaseConfig = {
  databaseURL:"https://pyton.firebaseio.com",
  apiKey: "AIzaSyDU4SMG9hpVMear3YN1aPtV8ABFuu2yHjM",
  authDomain: "python-f1901.firebaseapp.com",
  projectId: "python-f1901",
  storageBucket: "python-f1901.appspot.com",
  messagingSenderId: "985398112505",
  appId: "1:985398112505:web:2b3a195194fcbfc38a3228",
  measurementId: "G-R9185X2PHH"
}
*/
  
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


    $('input[name=send]').click(function(){
      
      $('#preloader').show();
      if ($(this).val()=="登入"){
        
      /*
      $.ajax({
        url:'/check_login',
        type:'POST',
        data:{
          "mail":$('#login_mail').val(),
          "pass":$('#login_pass').val()
        }
      })
      .done(function(data){
        if (data=="OK"){
          $(location).attr("href","index");
        }
        $('#pass_fr').html('<span>帳號密碼錯誤請重新輸入</span');
        return false;
      })
      .fail(function(data){

      })
    */
      
      var mail=$('#login_mail').val();
      var pass=$('#login_pass').val();
      firebase.auth().signInWithEmailAndPassword(mail, pass)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            
            window.location.href='/login_test'+'?mail='+mail;

        })
        .catch((error) => {
          $('#preloader').hide();
            var errorCode = error.code;
            var errorMessage = error.message;
            $('#pass_fr').html('<span class="red">帳號密碼錯誤請重新輸入</span>');
            return false;
        });
      
      return false;
    }



    if (reg_m&reg_pass&reg_c_pass){
      
      var re_mail=$('#reg_mail').val();
      var re_pass=$('#reg_pass').val();

      firebase.auth().createUserWithEmailAndPassword(re_mail,re_pass)
      .then((userCredential) => {
        console.log("註冊")
        //firebase.auth().currentUser.sendEmailVerification();

        firebase.auth().signInWithEmailAndPassword(re_mail, re_pass)
        .then((userCredential) => {
          $('#preloader').hide();
          var seconds = 5;
          $('#mess').html("");
          $('#mess').append("<div id='mess_title'>註冊成功</div><div id='mess_text'>將在<span id='count'></span>秒後為您轉跳主頁</div>");
          $('#mess').show();
          $('#count').html(seconds);
          setInterval(function () {
            seconds--;
            $("#count").html(seconds);
            if (seconds == 0) {
              $("#mess").hide();
              window.location.href='/reg_manager'+'?mail='+re_mail;
            }
          }, 1000);
          return false;
        })
        .catch((error) => {

        })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("失敗");
        // ..
      });
      
      
      return false;
    }else{
      console.log(reg_m)
      console.log(reg_pass)
      console.log(reg_c_pass)
      $('#preloader').show();
      setInterval(function () {
        $('#preloader').hide();
        $('#checktip_fr').html('<span class="red">請確認資料是否正確</span>');
      },3000);
      
      return false;
    }

    });
    
    $('.click').click(function() {
        if ($(this).text()==="管理者註冊"){
        $(this).addClass('open');
        $(this).removeClass('no');
          $("div").prev(".click").removeClass('open');
          $("div").prev(".click").addClass('no');
          $("#register").css("display","block");
          $("#login").css("display","none");
        }else{
          $(this).addClass('open');
          $(this).removeClass('no');
          $("div").next(".click").removeClass('open');
          $("div").next(".click").addClass('no');
          $("#register").css("display","none");
          $("#login").css("display","block");
        }
    });
    $('#login_mail').on('keyup',function(){
      if($(this).val().indexOf("@")==-1){
        $('#mail_fr').html('<span class="red">帳號請輸入mail</span');
      }
      else if($(this).val().split('@')[1]==""){
        $('#mail_fr').html("");
        $('#mail_fr').html('<span class="red">請在@後輸入完整資料</span');
        
      }
      else{
        $('#mail_fr').html("");
      }
    });

    $('#login_mail').on('blur',function(){
      if(($(this).val().indexOf("@")!=-1) & ($(this).val().split('@')[1]!="")){
        $('#mail_fr').html("");
        $.ajax({
          url: '/manager_check',
          type: 'POST',
          data:{
            "mail":$(this).val()
          }
        })
        .done(function(data){
          if(data=="NO"){
            $('#mail_fr').html('<span class="red">帳號不存在</span>');
          }
        })
        .fail(function(data){
  
        })
      }
      
    });

    $("#reg_mail").on('blur',function(){
      var reg_mail=$(this).val();
      if (reg_mail.indexOf('@')==-1){
        $('#reg_mail_fr').html("");
        $('#reg_mail_fr').html('<span class="red">帳號請輸入mail</span');
        reg_m=false;
        return false;
      }
      if(reg_mail.split('@')[1]==""){
        $('#reg_mail_fr').html("");
        $('#reg_mail_fr').html('<span class="red">請在@後輸入完整資料</span');
        reg_m=false;
        return false;
      }
      $.ajax({
        url:'/reg_mail',
        type:'POST',
        data:{
          'r_mail':reg_mail
        }
      })
      .done(function(data){
        if(data=="OK"){
          $('#reg_mail_fr').html("");
          reg_m=true;
          return false;
        }
        $('#reg_mail_fr').html("");
        $('#reg_mail_fr').html('<span class="red">帳號已被註冊</span');
        reg_m=false;
      })
      .fail(function(data){

      })
    })

    $('#reg_pass').on('blur',function(){
      if($(this).val().length==0){
        $('#reg_pass_fr').html("");
        $('#reg_pass_fr').html('<span class="red">密碼不可為空</span');
        reg_pass=false;
        return false;
      }
      if($(this).val().length<6){
        $('#reg_pass_fr').html("");
        $('#reg_pass_fr').html('<span class="red">密碼最少為6字元</span');
        reg_pass=false;
        return false;
      }
      $('#reg_pass_fr').html("");
      password=$(this).val();
      reg_pass=true;
    })
    $('#pass_con').on('blur',function(){
      if($(this).val()!=password){
        $('#checkpass_fr').html("");
        $('#checkpass_fr').html('<span class="red">請重新確認密碼</span');
        reg_c_pass=false;
        return false;
      }
      $('#checkpass_fr').html("");
      reg_c_pass=true;
      console.log(reg_c_pass)
    })
    $('#pass_con').on('input',function(){
      if($(this).val()!=password){
        $('#checkpass_fr').html("");
        $('#checkpass_fr').html('<span class="red">請重新確認密碼</span');
        reg_c_pass=false;
        return false;
      }
      $('#checkpass_fr').html("");
      reg_c_pass=true;
      console.log(reg_c_pass)
    })
  });