$(document).ready(function() { //確保網頁載入完畢才執行程式
  //這段沒用
  $('#click').on('click,', function(){
    $.ajax({
      URL:'fd_code',
      type: 'get',
      data: {
        "code":$('#sea_code').val()
      }
    })

    .done(function(data){
      if(!$.isemptyobject(data)){
        $('#search_result').empty();
        $.each(data,function(x,y){
          $('#search_result').append("<th>"+y['BarCode']+"</tr>")
          $('#code_list').hide()
        })
      }
    })
  })
  

  $('#sea_code').on('click', function() {
    // location.reload(true) //重整頁面
    var search = $('#search_code').val()
    console.log(search);
    $.ajax({
        url:"/search",
        type:"POST",
        data:{
          'text':$('#search_code').val(),
          'name_class':'code'
        }
    })
    .done(function(data){
      if (!$.isEmptyObject(data)){
        $('#codedata').empty();
        $.each(data,function(aa,bb){
          console.log(aa)
          console.log(bb)
          if(bb['BarCode']!="" && bb['BarCode']!="nan"){
            $('#codedata').append('<li><div id="code_back"><div id="code_num">'+bb["BarCode"]+'</div><div id="codet_con"><div id="code_text">'+bb['chinese']+'</div></div><div id="rev_del"><a href="/fix_code?key='+aa+'">修改</a><a href="#" class="del" data-val='+aa+">刪除</a></div></div></li>")
          
          }else{
            $('#codedata').append('<li><div id="code_back"><div id="code_num">店內條碼'+'</div><div id="codet_con"><div id="code_text">'+bb['chinese']+'</div></div><div id="rev_del"><a href="/fix_code?key='+aa+'">修改</a><a href="#" class="del" data-val='+aa+">刪除</a></div></div></li>")
          }
          //$('#codedata').append("<li><div class='recipe_list'><div class='left'><span name='food_name'>"+aa+"</span></div><div class='right'><div class='left_rev'><a href='rev_recipe?key="+bb+"'class='rev'>修改</a></div><div class='right_del'><a href='#' class='del'>刪除</a></div></div></div></li>");
    
        })

    }else{
        $('#codedata').empty();
        $('#codedata').append("<div>查無資料，請重新輸入關鍵字</div>");
    }

    })
  });

  $(document).on('click', '.del', function() {


    var key=$(this).data('val')
    var name=$(this).parent().parent().find('#codet_con').text()

    $('#back').html("");
        var msg = '<div id="note">';
        msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="tip_bold">刪除資料</h2>';
        msg +='<p id="tip_text">是否刪除'+name+'?</p>';
        msg += '<button id="affirm">確認刪除</button><button>取消</button>';
        msg += '</div></div>'
        $('#back').append(msg);
        $('#back').show();
        $('body').click((e) => {
          if (['back','note','title','text','tip_text','tip_bold'].indexOf(e.target.id) > -1) {
            return false;
          }
          $('#back').hide();
          $(document).on('click','#affirm',function(){
            $('#preloader').show()
            $.ajax({
              url:"/del_code",
              type:"POST",
              data:{
                'key':key
              }
            })
            .done(function(data){
              console.log("成功")
              $('#preloader').hide()
              msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="tip_bold">刪除資料</h2>';
              msg +='<p id="tip_text">已刪除'+name+'</p>';
              msg += '</div></div>'
              $('#back').append(msg);
              $('#back').show();
              $('body').click((e) => {
                if (['back','note','title','text'].indexOf(e.target.id) > -1) {
                  return false;
                }
            })
            $('#back').hide();
            location.reload(true)
          })



        
  })
})
})
})