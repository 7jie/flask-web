$(document).ready(function() { //確保網頁載入完畢才執行程式
  var phone_bool=false
  var ph_num=Number
  var userid=String
  var cd_bool=false
  var acc_bool=false
  var pass_bool=false
  var ver_bool=false
  var year_bool=false
  var hei_bool=false
  var wei_bool=false
  var user
  introJs().setOptions({
    steps: [
      {element: document.querySelector('input[name="account"]'),
        intro: "請輸入帳號"},
      {element: document.querySelector('input[name="password"]'),
        intro: "請輸入密碼"},
      {element: document.querySelector('input[name="phone"]'),
        intro: "請輸入個人手機號碼"},
      {element: document.querySelector('#button_1'),
        intro: "填寫完手機號碼即可點擊發送驗證碼"},
      {element: document.querySelector('#input_1'),
        intro: "請輸入收到的驗證碼"},
      {element: document.querySelector('#next'),
        intro: "完成以上步驟，請點選即可完成新增帳號"}
    ],
    
    hidePrev: true,
    hideNext: true,  
    nextLabel:'下一步>>',
    prevLabel:'<<上一步',
    skipLabel:'跳過',
    doneLabel: '我知道了'
  }).start();
  var firebaseConfig = {
    apiKey: "AIzaSyAk2Sp6_oP4o1Q1_wOtgOlIKpdaVemoqEI",
    authDomain: "topic-3b33d.firebaseapp.com",
    databaseURL: "https://topic-3b33d-default-rtdb.firebaseio.com",
    projectId: "topic-3b33d",
    storageBucket: "topic-3b33d.appspot.com",
    messagingSenderId: "536031508017",
    appId: "1:536031508017:web:f51954c5819d6923b98710",
    measurementId: "G-20ZX53K4QD"
  };

  /* 初始化 */
  firebase.initializeApp(firebaseConfig);
  firebase.auth().languageCode = 'it';

  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('button_1', {
    'size': 'invisible',
    'callback': function(response) {
      
    }
  });

  const phoneInputField = document.querySelector("#phone");
  
  const phoneInput = window.intlTelInput(phoneInputField, {
    preferredCountries:["tw"],
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });
  

    
    $('#phone').on('input',function(){
      process(event)
      
      if (phone_bool){
        $('#button_1').attr("disabled",false);
        $('#input_1').attr("disabled",false);
      }else{
        $('#button_1').attr("disabled",true);
        $('#input_1').attr("disabled",true);
      }

    })
    $('#phone').on('blur',function(){
      process(event)
      
      if (phone_bool){
        $('#button_1').attr("disabled",false);
        $('#input_1').attr("disabled",false);
      }else{
        $('#button_1').attr("disabled",true);
        $('#input_1').attr("disabled",true);
      }

    })

    function process(event) {
      event.preventDefault();
     
      ph_num = phoneInput.getNumber();
      
     
      if (phoneInput.isValidNumber()) {
        $('.alert-info').hide()
        phone_bool=true

      } else {
        phone_bool=false
        $('.alert-info').show()
        $('#info').html('無效的電話號碼')
        
      }
     }
     $('#input_1').on('blur',function(){
      
      var code =$(this).val();
			/* 檢查驗證碼 */
      if (cd_bool){
        confirmationResult.confirm(code).then(function (result) {
          /* 驗證成功 */
          user = result.user;
          userid=user.uid
          ver_bool=true
          ch_all()
          
          $('.ver_block').hide()
        }).catch(function (error) {
          /* 驗證失敗 */
          $('.ver_block').show()
          $('#ver_info').html('驗證碼錯誤')
          console.log(error);
        });
      }
			
     })
     
    $('#button_1').on('click',function(){

        var appVerifier = window.recaptchaVerifier;
  
        firebase.auth().signInWithPhoneNumber(ph_num, appVerifier).then(function (confirmationResult) {
          /* 發送成功 */
          window.confirmationResult = confirmationResult;
        }).catch(function (error) {
          /* 發送失敗 */
          console.log(error);
          /* 重置驗證 */
          grecaptcha.reset(window.recaptchaWidgetId);
        });
      cd_bool=true

      seconds=60
      $('#button_1').attr("disabled",true);
      
      var count=setInterval(function () {
        $('#button_1').html("發送驗證碼："+seconds+"秒後")
        seconds--;
        if (seconds <= 0) {
          $('#button_1').attr("disabled",false);
          $('#button_1').html("發送驗證碼")
          clearInterval(count)
        }

      },1000);
     
      
      
      return false

    })
  function ch_all(){
    if(ver_bool & acc_bool & pass_bool){
      $('#next').attr("disabled",false);
    }else{
      $('#next').attr("disabled",true);
    }
  }

  $('#next').on('click',function(){
    $('#step').hide()
    $('#step2').show()
    
    user.updateEmail($('input[name=account]').val()+"@xxx.com").then(() => {
      // Update successful
      // ...

    }).catch((error) => {
      // An error occurred
      // ...

    });
    user.updatePassword($('input[name=password]').val()).then(() => {
      // Update successful.
    }).catch((error) => {
      // An error ocurred
      // ...
    });
    $.ajax({
      url:'/new_acc',
      type:'POST',
      data:{
        'uid':userid,
        'acc':$('input[name=account]').val()+"@xxx.com",
        'pass':$('input[name=password]').val(),
        'num':ph_num
      }
    })
    .done(function(data){
      $("h1").html('輸入個人資料')
    introJs().setOptions({
      steps: [
        {element: document.querySelector('input[name="birth_year"]'),
          intro: "請輸入生日年分"},
        {element: document.querySelector('select[name="sex"]'),
          intro: "請選擇性別"},
        {element: document.querySelector('input[name="height"]'),
          intro: "請輸入身高"},
        {element: document.querySelector('input[name="weight"]'),
          intro: "請輸入體重"},
        {element: document.querySelector('.filterFood'),
          intro: "若有想避免的食物請勾選"},
        {element: document.querySelector('#click'),
          intro: "完成以上步驟，點選即完成個人資料輸入"}
      ],
      
      hidePrev: true,
      hideNext: true,  
      nextLabel:'下一步>>',
      prevLabel:'<<上一步',
      skipLabel:'跳過',
      doneLabel: '我知道了'
    }).start();
    })
    
    return false
    })
    


  function checkacc(){
  
    var acc=$('input[name=account]').val()
    if(acc.length==0){
      return "*請輸入帳號"
    }
    else if(acc.length<8 | acc.length>20){
      return "*帳號請輸入8-20碼"
    }else{
      return "*必填"
    }
  }
  function ch_acc(){
    $('#account').html(checkacc())
    if ($('#account').text()!="*必填"){
      acc_bool=false
    }else{
      acc_bool=true
    }
  }

  $('input[name=account]').on('input',function(){
    ch_acc()
    ch_all()
  })
  $('input[name=account]').on('blur',function(){
    ch_acc()
    ch_all()
  })


  function checkpass(){
    var pass=$('input[name=password]').val()
    if(pass.length==0){
      return "*請輸入密碼"
    }
    else if(pass.length<8 | pass.length>20){
      return "*密碼請輸入8-20碼"
    }else{
      return "*必填"
    }
  }

  function ch_pass(){
    $('#password').html(checkpass())
    if ($('#password').text()!="*必填"){
      pass_bool=false
    }else{
      pass_bool=true
    }
  }
  $('input[name=password]').on('input',function(){
    ch_pass()
    ch_all()
  })
  $('input[name=password]').on('blur',function(){
    ch_pass()
    ch_all()
  })
  function ch_all2(){
    if (wei_bool& hei_bool & year_bool){
      $('#click').attr("disabled",false);
    }else{
      $('#click').attr("disabled",true);
    }
  }
  function checkyear(){
    var year=$('input[name="birth_year"]').val()
    if (year.length==0){
      return "*請輸入出生年"
    }else if(year<1902 | year>2021){
      return "*請輸入1902-2021之間"
    }else{
      return "*必填"
    }
  }
  function ch_year(){
    var year_t=checkyear()
    $('#birth_year').html(year_t)
    if (year_t!="*必填"){
      year_bool=false
    }else{
      year_bool=true
    }
  }
  $('input[name="birth_year"]').on('input',function(){
    ch_year()
    ch_all2()
  })
  $('input[name="birth_year"]').on('blur',function(){
    ch_year()
    ch_all2()
  })
  function checkheight(){
    var hei=$('input[name="height"]').val()
    
    if (hei<50 | hei>300){
      return "*請輸入50-300之間"
    }else{
      return "*必填"
    }
  }
  function ch_hei(){
    var hei_t=checkheight()
    $('#height').html(hei_t)
    if(hei_t!="*必填"){
      hei_bool=false
    }else{
      hei_bool=true
    }
  }
  $('input[name="height"]').on('input',function(){
    ch_hei()

    ch_all2()
  })
  $('input[name="height"]').on('blur',function(){
    ch_hei()
    
    ch_all2()
  })
  
  
  function checkweight(){
    var wei=$('input[name="weight"]').val()
    if (wei<10 | wei>300){
      return "*請輸入10-700之間"
    }else{
      return "*必填"
    }
  }
  function ch_wei(){
    var wei_t=checkweight()
    $('#weight').html(wei_t)
    if(wei_t!="*必填"){
      wei_bool=false
    }else{
      wei_bool=true
    }
  }
  $('input[name="weight"]').on('input',function(){
    ch_wei()
    ch_all2()
  })
  $('input[name="weight"]').on('blur',function(){
    ch_wei()
    ch_all2()
  })
  $('#click').on('click', function() {
    $('#preloader').show()
    $('form').append('<input name="uid" value="'+uid+'">')//userid
    
  });


       
  });