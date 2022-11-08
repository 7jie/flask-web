$(document).ready(function() {
  var search_bool=false
    function getsearch(){
        var text=$('#search').val()
        //console.log($('#search').val())
        $.ajax({
          url: 'search',
          type: 'POST',
          data:{
          'text':$('#search').val(),
          'name_class':'recipe'}
        }).done(function(data) {
          if (!$.isEmptyObject(data)){
            $('#data_list').empty();
            $.each(data,function(aa,bb){
              console.log(bb);
              $('#data_list').append("<li><div class='recipe_list'><div class='left'><span name='food_name'>"+aa+"</span></div><div class='right'><div class='left_rev'><a href='rev_recipe?key="+bb+"'class='rev'>修改</a></div><div class='right_del'><a href='#' class='del_recipe' data-val='"+bb+"'>刪除</a></div></div></div></li>");
        
            })
    
        }else{
            $('#data_list').empty();
            $('#data_list').append("<div id='nodata'>查無資料，請重新輸入關鍵字</div>");
        }
    
    
        }).fail(function() {
         
        });
      }
      $(document).on('click','.del_recipe',function(){
        var recipe=$(this).parent().parent().parent().children(':first-child').text()
        var name=$(this).data('val')
        $('#back').html("");
        var msg = '<div id="note">';
        msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="tip_bold">刪除資料</h2>';
        msg +='<p id="tip_text">是否刪除'+recipe+'?</p>';
        msg += '<button id="affirm">確認刪除</button><button>取消</button>';
        msg += '</div></div>'
        $('#back').append(msg);
        $('#back').show();

        $('body').click((e) => {
          if (['back','note','title','text','tip_text','tip_bold'].indexOf(e.target.id) > -1) {
            return false;
          }
          
          $(document).on('click','#affirm',function(){
            $('#preloader').show()
            $('#back').hide();
            $.ajax({
              url:'/del_recipe',
              type:'POST',
              data:{
                'key':name
              }

            })
            .done(function(data){
              $('#preloader').hide()
              $('#back').html("");
              var msg = '<div id="note">';
              msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="tip_bold">刪除資料</h2>';
              msg +='<p id="tip_text">已刪除'+recipe+'</p>';
              msg += '</div></div>'
              $('#back').append(msg);
              $('#back').show();
              $('body').click((e) => {
                if (['back','note','title','text'].indexOf(e.target.id) > -1) {
                  return false;
                }
                if (search_bool)
                  getsearch()
                else
                  location.reload(true)
                })
            })
          })
          $('#back').hide();
          })
          
      })

      $('#searchbutton').on('click',function(){
        search_bool=true
        getsearch();
       
      });
});