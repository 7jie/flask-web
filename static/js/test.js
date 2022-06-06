$(document).ready(function() {

    $('input[name=send]').click(function(){
      if($(this).val()=="登入"){
        console.log($('#login_mail').val());
      }
      console.log($(this).val());
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
      return false;
    });
    $('.click').click(function() {
        if ($(this).text()==="管理者註冊"){
        $(this).addClass('open');
          $("p").prev(".click").removeClass('open');
          $("#register").css("display","block");
          $("#login").css("display","none");
        }else{
          $(this).addClass('open');
          $("p").next(".click").removeClass('open');
          $("#register").css("display","none");
          $("#login").css("display","block");
        }
    });
    $('#login_mail').on('keyup',function(){
      if($(this).val().indexOf("@")==-1){
        $('#mail_fr').html('<img id="warn" src="static/img/warn.png"><span>帳號請輸入mail</span');
      }else{
        $('#mail_fr').html("");
      }
    });
    $('#login_mail').on('blur',function(){
      if($(this).val().indexOf("@")==-1){
        
        $('#mail_fr').html('<img id="warn" src="static/img/warn.png"><span>帳號請輸入mail</span');
      }else{
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
            $('#mail_fr').html('<img id="warn" src="static/img/warn2.png"><span>帳號不存在</span>');
          }
        })
        .fail(function(data){
  
        })
      }
    });
  });