$(document).ready(function() {

    get_data();
  function getsearch(){
    var text=$('#search').val()
    console.log($('#search').val())
    $.ajax({
      url: '/search',
      type: 'POST',
      data:{'name': $('#store_name').val(),
      'diet': $('#diet_name').val(),
      'text':text=$('#search').val(),
      'name_class':'food'}
    }).done(function(data) {
      if (!$.isEmptyObject(data)){
        $('#data_list').empty();
        $.each(data,function(aa,bb){
          $('#data_list').append("<li><div class='food_list'><div class='left'><span name='food_name'>"+aa+"</span></div><div class='right'><div class='left_rev'><a href='revise_food?a="+bb+"&b="+$('#store_name').val()+"&c="+$('#diet_name').val()+"'class='rev'>修改</a></div><div class='right_del'><a href='#' class='del'>刪除</a></div></div></div></li>");
    
        })

    }else{
        $('#data_list').empty();
        $('#data_list').append("<div id='search_no'><span>查無資料，請重新選擇店家或飲食類別</span></div>");
    }


    }).fail(function() {
     
    });
  }

    $('#searchbutton').on('click',function(){
      getsearch();
     
    });
    $('#search').on('keyup',function(e){
      if (e.which==13){
        getsearch();
      }
      
    })
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
            $('#data_list').empty();
            if (!$.isEmptyObject(data)){
                $.each(data,function(aa,bb){
                  $('#data_list').append("<li><div class='food_list'><div class='left'><span name='food_name'>"+aa+"</span></div><div class='right'><div class='left_rev'><a href='revise_food?a="+bb+"&b="+$('#store_name').val()+"&c="+$('#diet_name').val()+"'class='rev'>修改</a></div><div class='right_del'><a href='#' class='del' data-val='"+bb+"'>刪除</a></div></div></div></li>");
            
                })
                
            }else{
                $('#data_list').empty();
                $('#data_list').append("<div id='search_no'><span>查無資料，請重新選擇店家或飲食類別</span></div>");
            }
            
          })
          .fail(function() {
    
          });
      };
      
      $(document).on('click', '.del', function() {
        var name=$(this).data('val')
        var n_size=$(this).parent().parent().parent().children(':first-child').text()
        $('#back').html("");
        var msg = '<div id="note">';
        msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="tip_bold">刪除資料</h2>';
        msg +='<p id="tip_text">是否刪除'+n_size+'?</p>';
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
            $('#back').hide()
            $.ajax({
              url:'/del_food',
              type:'POST',
              data:{
                'name':$('#store_name').val(),
                'diet':$('#diet_name').val(),
                'key':name,
                'n_size':n_size
              }
            }
            )
            .done(function(data){
              $('#preloader').hide()
              $('#back').html("");
              var msg = '<div id="note">';
              msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="tip_bold">刪除資料</h2>';
              msg +='<p id="tip_text">已刪除'+n_size+'</p>';
              msg += '</div></div>'
              $('#back').append(msg);
              $('#back').show();
              $('body').click((e) => {
                if (['back','note','title','text'].indexOf(e.target.id) > -1) {
                  return false;
                }
                get_data()
                })
              console.log("u")
            })
          })

          $('#back').hide();

        })

        return false;
      })
})