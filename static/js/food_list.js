$(document).ready(function() {
    get_data();
  

    $('#searchbutton').on('click',function(){
      var text=$('#search').val()
      console.log($('#search').val())
      $.ajax({
        url: '/search',
        type: 'POST',
        data:{'name': $('#store_name').val(),
        'diet': $('#diet_name').val(),
        'text':text=$('#search').val()}
      }).done(function(data) {
        if (!$.isEmptyObject(data)){
          $('#ttt').empty();
          $.each(data,function(aa,bb){
            $('#ttt').append("<p><span name='food_name'>"+aa+"</span><a href='revise_food?a="+bb+"&b="+$('#store_name').val()+"&c="+$('#diet_name').val()+"'class='rev'>修改</a>&nbsp<a href='#' class='del'>刪除</a></p>");
      
          })

      }else{
          $('#ttt').empty();
          $('#ttt').append("<p>查無資料，請重新輸入關鍵字</p>");
      }


      }).fail(function() {
       
      });
    });
    $('#store_name').on('change', function() {

        
        get_data()
      });

      
      $('#diet_name').on('change', function() {

        
        get_data();
          
      });


      function get_data(){
        $.ajax({
            url: '/food_store',
            type: 'POST',
            dataType: "json",
            data: {'name': $('#store_name').val(),
                    'diet': $('#diet_name').val()}
          })
          .done(function(data) {
            $('#ttt').empty();
            if (!$.isEmptyObject(data)){
                $.each(data,function(aa,bb){
                  $('#ttt').append("<p><span name='food_name'>"+aa+"</span><a href='revise_food?a="+bb+"&b="+$('#store_name').val()+"&c="+$('#diet_name').val()+"'class='rev'>修改</a>&nbsp<a href='#' class='del'>刪除</a></p>");
            
                })
                
            }else{
                $('#ttt').empty();
                $('#ttt').append("<p>查無資料，請重新選擇店家或飲食類別</p>");
            }
            
          })
          .fail(function() {
    
          });
      };
      
      $(document).on('click', '.del', function() {
        console.log("hi");
        $('#back').html("");
        var msg = '<div id="note">';
        msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2>刪除資料</h2>';
        msg +='<p>是否刪除'+$(this).prev().prev().text()+'?</p>';
        msg += '<button>確認刪除</button>&nbsp<button>取消</button>';
        msg += '</div></div>'
        console.log($(this).prev().prev().text());
        $('#back').append(msg);
        $('#back').show();
        
        $('body').click(function(e){
          
            $('#back').hide();

        })
        return false;
      });
})