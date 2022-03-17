$(document).ready(function() {
    $('#click').on('click', function() {
        $.ajax({
            url: '/newstore_mess',
            type: 'GET',
            data:{}
          })
          .done(function(data) {
            $(location).attr("href","newstore_mess")

          })
          .fail(function() {
            console.log('失敗');
          });
          /*
        if($('input[name=name_zh]').val().length<5){
        alert('請輸入正確');
        }
        if(($('input[name=user]').val().length==0) || ($('input[name=pass]').val().length==0) ||($('input[name=pass2]').val().length==0)){
        alert('請填滿資料');
        }
        */
       
     });
});