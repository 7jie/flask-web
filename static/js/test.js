$(document).ready(function() {
    $('.click').click(function() {
        if ($(this).text()==="註冊"){
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

});