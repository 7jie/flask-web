$(document).ready(function() {
    function getsearch(){
        var text=$('#search').val()
        console.log($('#search').val())
        $.ajax({
          url: '/search',
          type: 'POST',
          data:{
          'text':$('#search').val(),
          'name_class':'recipe'}
        }).done(function(data) {
          if (!$.isEmptyObject(data)){
            $('#data_list').empty();
            $.each(data,function(aa,bb){
              $('#data_list').append("<li><div class='recipe_list'><div class='left'><span name='food_name'>"+aa+"</span></div><div class='right'><div class='left_rev'><a href='revise_food?a="+bb+"&b="+$('#store_name').val()+"&c="+$('#diet_name').val()+"'class='rev'>修改</a></div><div class='right_del'><a href='#' class='del'>刪除</a></div></div></div></li>");
        
            })
    
        }else{
            $('#data_list').empty();
            $('#data_list').append("<div>查無資料，請重新輸入關鍵字</div>");
        }
    
    
        }).fail(function() {
         
        });
      }

      $('#searchbutton').on('click',function(){
            alert("ji");
            getsearch();
       
      });
});