$(document).ready(function() {

    var href=decodeURI($(location).attr('href'))
    var type=href.slice(href.indexOf('adit')+4,).replace('#','')
    setTimeout(function(){
      },1000);

      
    introJs().setOptions({
      steps: [
        {element: document.querySelector('#choose_all'),
        intro: "全選請點此"},
        {element: document.querySelector('.u_right'),
        intro: "若要修改名稱請點選"},
        /*
        {element: document.querySelector('input[name="store_name_en"]'),
          intro: "若無輸入店家英文名稱則系統自動翻譯"},
        {element: document.querySelector('#type'),
          intro: "請選擇食品類別"},
        {element: document.querySelector('input[name="name_zh"]'),
          intro: "請輸入食品中文名稱"},
        {element: document.querySelector('input[name="name_en"]'),
        intro: "若無輸入食品英文名稱則系統自動翻譯"},
        {element: document.querySelector('#ch_manual'),
        intro: "若要手動輸入份量請點選"},
        
        {element: document.querySelector('input[name="kcal"]'),
        intro: "請輸入熱量"},
        */
        
      ],
      nextLabel:'下一步>>',
      prevLabel:'<<上一步',
      skipLabel:'跳過',
      doneLabel: '我知道了'
    }).start();
    
    var e_d_num=0
    $('.u_right').on('click',function(){
      var userfood=$(this).prev().children(".userfood_title");
      
      if(userfood.children(".rev_name").val()==undefined){
        
        var n=$(this).prev().children(".userfood_title").children("#food_name").text()
        var st=n.slice(0,n.indexOf('-'))
        var name=n.slice(n.indexOf('-')+1,)
        
        if (type!="code"& type!="fruit"){
          userfood.append('<input type="text" class="rev_stname" value='+st+'>'+'-'+'<input type="text" class="rev_name" value='+name+'>')
          //userfood.append('<input type="text" class="rev_name" value='+$(this).prev().children(".userfood_title").children("#food_name").text()+'>')
          userfood.children("#food_name").remove();
          if (e_d_num==0){
            introJs().setOptions({
              steps: [
                {element: document.querySelector('.rev_stname'),
                intro: "修改店家名稱"},
                {element: document.querySelector('.rev_name'),
                intro: "修改食品名稱"}
                ],
                nextLabel:'下一步>>',
                prevLabel:'<<上一步',
                skipLabel:'跳過',
                doneLabel: '我知道了'
              }).start();
          }

          
        }else{
          userfood.append('<input type="text" class="rev_name" value='+name+'>')
          userfood.children("#food_name").remove();
        }
        
      }
      

    })
/*
    $(document).on('change','.rev_name',function(){
      console.log($(this).val())
      $(this).prev().attr('data-name',$(this).val())
    })

*/

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
    

    $('#choose_all').on('click',function(){
      
      if ($(this).prop("checked")==true){
        $('.c_box').prop("checked",true)
      }else{
        $('.c_box').prop("checked",false)
      }
      
    })

    $('.adit_ok').on('click',function(){
      $('#preloader').show();
      var data_name=new Array();
      
      //console.log("y");
      
      var d=new Array();
      $(':checkbox').map(function(){

        var data={};
        
          if ($(this).data('uid')!=undefined & $(this).prop("checked")==true){
            if (type!="code"& type!="fruit"){
              if($(this).next().attr('class')=='rev_stname'){
                var n=$('.rev_stname').val()+'-'+$('.rev_name').val()
                data_name.push(n)
                data['chinese']=n
              }
              else{
                var n=$(this).data('name')
                data_name.push(n)
                data['chinese']=n
                
              }
            }else{
              if($(this).next().attr('class')=='rev_name'){
                var n=$('.rev_name').val()
                data_name.push(n)
                data['chinese']=n
              }
              else{
                var n=$(this).data('name')
                data_name.push(n)
                data['chinese']=n
                
              }
            }
            
        
          
          data[$(this).data('uid')]=$(this).data('num')
          d.push(data)
          
          
        }
      })

      
      //alert("已通過："+data_name);
      console.log(d)
      
   
      $.ajax({
        
        url:'/getadit_re',
        type:"POST",
        data:{"d":JSON.stringify(d),
        "type":type,
      
      },
      })
      .done(function(data){
        $('#preloader').hide();
        if (d.length!=0){
          $('#back').html("");
          var msg = '<div id="note">';
          msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="adit_ok">審核通過</h2>';
          msg +='<p id="text_data">'+data_name+'</p>';
          msg += '<button id="affirm">確認</button>';
          msg += '</div></div>'
          $('#back').append(msg);
          $('#back').show();
          $('body').click((e) => {
            if (['back','note','title','text','text_data','adit_ok'].indexOf(e.target.id) > -1) {
              return false;
            }
            $('#back').hide();
            location.reload(true)
        })
        }else{
          $('#back').html("");
          var msg = '<div id="note">';
          msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="adit_ok">您未選取通過的資料</h2>';
          msg += '<button id="affirm">確認</button>';
          msg += '</div></div>'
          $('#back').append(msg);
          $('#back').show();
          $('body').click((e) => {
            if (['back','note','title','text','text_data','adit_ok'].indexOf(e.target.id) > -1) {
              return false;
            }
            $('#back').hide();
        })
        }

        

        console.log(d.length)
      })

      
    })



    $('.adit_no').on('click',function(){
      $('#preloader').show();
      var data_name=new Array();
      //console.log("y");
      
      var d=new Array();
      $(':checkbox').map(function(){
        
        
        var data={};
        if ($(this).data('uid')!=undefined & $(this).prop("checked")==true){

          if($(this).next().attr('class')=='rev_stname'){
            var n=$('.rev_stname').val()+'-'+$('.rev_name').val()
            data_name.push(n)
            data['chinese']=n
          }
          else{
            var n=$(this).data('name')
            data_name.push(n)
            data['chinese']=n
            
          }
            
          
          data[$(this).data('uid')]=$(this).data('num')
          d.push(data)
          
          
        }
      })
      $.ajax({
  
        url:'/adit_no',
        type:"POST",
        data:{"d":JSON.stringify(d),
        "type":type,
      
      },
      })
      .done(function(data){
        $('#preloader').hide();
        $('#back').html("");
        if (d.length!=0){
          var msg = '<div id="note">';
          msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="adit_no">已否決以下項目</h2>';
          msg +='<p id="text_data">'+data_name+'</p>';
          msg += '<button id="affirm">確認</button>';
          msg += '</div></div>'
          $('#back').append(msg);
          $('#back').show();
          $('body').click((e) => {
            if (['back','note','title','text','text_data','adit_no'].indexOf(e.target.id) > -1) {
              return false;
            }
            $('#back').hide();
            location.reload(true)
        })
        }else{
          var msg = '<div id="note">';
          msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="adit_no">您未選取否決的資料</h2>';
          msg +='<p id="text_data">'+data_name+'</p>';
          msg += '<button id="affirm">確認</button>';
          msg += '</div></div>'
          $('#back').append(msg);
          $('#back').show();
          $('body').click((e) => {
            if (['back','note','title','text','text_data','adit_no'].indexOf(e.target.id) > -1) {
              return false;
            }
            $('#back').hide();
        })
        }
        
        

      })

    });

 });