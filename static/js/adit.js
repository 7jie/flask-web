$(document).ready(function() {
    $('.userfood_title').on('click',function(){
      var info=$(this).next();
      if(info.hasClass("nview")){
        info.slideDown()
        info.attr('class','view')
      }else{
        
        info.attr('class','nview')
        info.slideUp()
        
      }
      
      
    })


    $('.audit_ok').on('click',function(){
      
      var d=new Array();
      $(':checkbox:checked').map(function(){
        var data={}
        data[$(this).data('uid')]=$(this).data('num')
        d.push(data)
      })

      $.ajax({
        url:'/getadit_re',
        type:"POST",
        data:{"d":JSON.stringify(d)},
      })
      .done(function(data){

      })
      .fail(function(){

      })
      
    })

 });