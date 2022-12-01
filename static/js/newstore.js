$(document).ready(function() {
  var stname
  var kcal_bool=false
  var stname_bool=false
  var man_bool=true
  var nazh_blool=false
  var num_tag=false
  var num_bool=true
  var na_en=true
  var st_en=true
  
  $.ajax({
    url:"/getstore",
    type:'POST',
  })
  .done(function(data){
    stname=data
    $.each(stname, function(k,v){
      $('#store').append("<option>"+k+"</option>");
    })


    })
    var elem = document.querySelector('input[name="name_en"]');
    introJs().setOptions({
      steps: [
        {element: document.querySelector('input[name="store_name"]'),
        intro: "請輸入店家中文名稱"},
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
        intro: "請輸入熱量"}
        
      ],
      nextLabel:'下一步>>',
      prevLabel:'<<上一步',
      skipLabel:'跳過',
      doneLabel: '我知道了'
    }).start();
  
  $('input[name="name_en"]').on('input',function(){
    if($(this).val().length>80){
      $('#name_en').html('*請輸入80字以內')
      na_en=false
    }
    else if(/.*[\u4e00-\u9fa5]+.*$/.test($(this).val())){
      $('#name_en').html('*請勿輸入中文')
      na_en=false
    }
    else{
      $('#name_en').html('')
      na_en=true
    }
      
  })


  $('input[name="store_name_en"]').on('input',function(){
    if($(this).val().length>80){
      $('#store_name_en').html('*請輸入80字以內')
      st_en=false
    }
    else if(/.*[\u4e00-\u9fa5]+.*$/.test($(this).val())){
      $('#store_name_en').html('*請勿輸入中文')
      st_en=false
    }
    else
      st_en=true
  })
    
  $('#auto').show();
  
  $('#preloader').show();

  $('.num').hide();

  var size_drink={};
  

    $.ajax({
      url:'/getsize',
      type: 'POST',
      data:{
            "size_type":$("#type").val()
              },
    })
    .done(function(data){
      size_drink=data;
      //console.log(size_drink);
      var n=0;
      $.each(data,function(a,b){
        
        $("#size").append("<option>"+a+"</option>");
        if(n==0){
          $("#size_en").text(b);
        }
        n+=1;
      })
      $('#preloader').hide();
      
    })
    .fail(function(data){

    })
     


     $("#type").on('change', function() {
      
       $("#size").empty();
      $.ajax({
        url:'/getsize',
        type: 'POST',
        data:{
              "size_type":$(this).val()
                },
      })
      .done(function(data){
        size_drink=data;
        
        var n=0;
        $.each(data,function(a,b){
          
          $("#size").append("<option>"+a+"</option>");
          if(n==0){
            $("#size_en").text(b);
          }
          n+=1;
        })
        
        
      })
      .fail(function(data){

      })
      setTimeout(() => {
        console.log($('#size').val())
        if($('#size').val()=="1份"){
          $('.num').hide();
        }
        
      }, 500);
      
      

    });




    var num=0
    $("#size").on('change', function() {

      $("#size_en").text(size_drink[$(this).val()]);
      if($("#type").val()=="eat"){
        if($(this).val()!="1份" ){
          $('.num').show();
          if (num==0){
            introJs().setOptions({
              steps: [
                {element: document.querySelector('.num_text'),
                  intro: "請輸入數量，例：5，若無輸入則預設1"},
              ],
              nextLabel:'下一步>>',
              prevLabel:'<<上一步',
              skipLabel:'跳過',
              doneLabel: '我知道了'
            }).start();
            num+=1
          }
          
        }else{
          $('.num').hide();
        }
      }

      
    })
    var man=0
     $('#ch_manual').click(function(){
      var top=$(document).scrollTop();
      //console.log(top);
      $('#auto').hide();
      $('#man').show();
      $('.num').hide();
      if(man==0){
        introJs().setOptions({
          steps: [
            {element: document.querySelector('#size_zh'),
              intro: "請輸入份量中文"},
            {element: document.querySelector('input[name="man_size_en"]'),
              intro: "若無輸入份量英文則系統自動翻譯"}
          ],
          nextLabel:'下一步>>',
          prevLabel:'<<上一步',
          skipLabel:'跳過',
          doneLabel: '我知道了'
        }).start();
        man+=1
      }
      
     })

     $('#ch_auto').click(function(){
      var top=$(document).scrollTop();

      $('#auto').show();
      $('#man').hide();
      if ($("#size").val()!="1份"){
        $('.num').show();
      }
      
      
    })
      
      $('.ch_num').on('input',function(){
        info_num()
      })
      function info_num(){
        var n=0;
        $('.ch_num').each(function(){
          $($(this).next().html(''));
          
          if($(this).val()<0){
            $($(this).next().html('*不可輸入負數'));
            n+=1;
          }
          if(isNaN($(this).val())){

            $($(this).next().html('*請輸入數字'));
            n+=1;
          }
          if($(this).val()>5000){
            $($(this).next().html('*請勿超過5000'));
            n+=1;
          }
        })
        if(n==0){
          num_tag=true;
        }else{
          num_tag=false;
        }
        console.log(num_tag)
        
      }
      function check_size(){
        var text_val=$('#size_zh').val().split("")
        var n=Number
        if($('#size_zh').val().length==0)
          return '*請輸入份量中文'

        else if($('#size_zh').val().indexOf("-")!=-1)
          return '*份量請勿輸入負數'

        else if(!/.*[\u4e00-\u9fa5]+.*$/.test($('#size_zh').val()))
          return '*請包含中文'

        else if (isNaN(text_val[0]))
          return '*份量數字請輸入在前'
        else{
          $.each(text_val,function(k,v){
            if (/.*[\u4e00-\u9fa5]+.*$/.test(v)){
              n=k
              console.log(n)
              return false
            }
          })
          if(Number($('#size_zh').val().slice(0,n))>2000){
            return '*請勿大於2000'
          }
          else{
          
            size=$('#size_zh').val();
            return '*必填'
          }
          
        }
      }
      function size_bool(){
        var size=check_size()
        $('#sizetext').html(size)
        if(size!="*必填")
          man_bool=false
        else
          man_bool=true
      }
        $($('#size_zh')).on('input',function(){

          size_bool()
        })
        $($('#size_zh')).on('blur',function(){

          size_bool()
        })
      function ch_kcal(){
        var kcal=$('input[name="kcal"]').val()
        if(kcal==0)
          return "*請輸入食品熱量";
        if(isNaN(kcal))
          return "*食品熱量請輸入數字";
        if(kcal<0)
          return "*不可輸入負數";
        if(kcal>5000)
          return "*請勿超過5000"
        return "*必填";
      }
      function k_bool(){
        var k=ch_kcal()
        $('#kcaltext').html(k);
        if(k!="*必填")
          kcal_bool=false
        else
          kcal_bool=true
      }
      $('input[name="kcal"').on('input',function(){
        k_bool()
      })
      $('input[name="kcal"').on('blur',function(){
        k_bool()
      })
      function check_store() {
        
        if ($('input[name="store_name"]').val()==0){
          $('input[name="store_name_en"]').attr('disabled',false)
          $('input[name="store_name_en"]').val("")
          return "*請輸入店家中文名稱";
        }
        else if($('input[name="store_name"]').val().length>20){
          return "*請輸入20字以內";
        }
        else{
          
          if (stname[$('input[name="store_name"]').val()]!=""& stname[$('input[name="store_name"]').val()]!=undefined){
          
            $('input[name="store_name_en"]').val(stname[$('input[name="store_name"]').val()])
            $('input[name="store_name_en"]').attr('disabled',true)
          }
          else{
            $('input[name="store_name_en"]').val("")
            $('input[name="store_name_en"]').attr('disabled',false)
          }
            
        }
        return "*必填";
      }; 
      function stn_bool(){
        var ch_st=check_store()
        $('#store_text').html(ch_st)
        if (ch_st!="*必填")
          stname_bool=false
        else
          stname_bool=true
      }
      $('input[name="store_name"]').on('input',function(){
        stn_bool()
      })
      $('input[name="store_name"]').on('blur',function(){
        stn_bool()
      })
      function check_name() {
        if ($('input[name="name_zh"]').val()==0)
          return "*請輸入食品中文名稱";
        else if(!/.*[\u4e00-\u9fa5]+.*$/.test($('input[name="name_zh"]').val()))
          return "*請包含中文"
        else if($('input[name="name_zh"]').val().length>30)
          return "*請輸入30字以內";
        return "*必填";
      } 
      function name_bool(){
        var n=check_name()
        $('#name').html(n)
        if(n!="*必填")
          nazh_blool=false
        else
          nazh_blool=true
      }
      $('input[name="name_zh"]').on('input',function(){
        name_bool()
      })
      $('input[name="name_zh"]').on('blur',function(){
        name_bool()
      })
      $(".num_text").on('input',function(){
        if($(this).val()<0){
          $('#num_text').html('*請勿輸入負數')
          num_bool=false
        }
        else if(isNaN($(this).val())){
          $('#num_text').html('*請勿輸入中文')
          num_bool=false
        }
        else if($(this).val()>50){
          $('#num_text').html('*請勿大於50')
          num_bool=false
        }
        else{
          $('#num_text').html('')
          num_bool=true
        }
      })
      $('.click').on('click', function() {



        
        var size="";
        //var chaoyangHotel = new Text($('input[name=store_name]').val(),$('input[name=name_zh]').val(), $('input[name=kcal]').val());
        //console.log($('#man').css("display"));

        if($('#man').css("display")=="block"){
          size_bool()
          console.log("是block");
        }else{
          man_bool=true
        }
        name_bool()
        stn_bool()
        k_bool()
        info_num()

        //console.log($('.num_text').val()+"Pieces")
        //console.log($('#size_zh').val());
        //$('#name').html(chaoyangHotel.checkname());
        //$('#store_text').html(chaoyangHotel.checkstore());
        //$('#kcaltext').html(chaoyangHotel.check_kcal())  chaoyangHotel.checktext();
        /*
        console.log("熱量"+kcal_bool)
        console.log("店"+stname_bool)
        console.log("名"+nazh_blool)
        console.log("數"+num_tag)
        console.log(man_bool)
        */
        if( kcal_bool& stname_bool& nazh_blool& num_tag & man_bool & num_bool &st_en &na_en){
          $('input[name="store_name_en"]').attr('disabled',false)
          $('#preloader').show();
          
          
          if($('#man').css("display")=="block"){
            $('#form1').append("<input  name='man' value='t'>")
            $('#form1').append("<input  name='size' value='"+size+"'></input>");
          }
          else{

            if ($('.num').css("display")=="block"){
              if ($('.num_text').val()>1){
                $('#form1').append("<input  hidden name='auto_size_en' value='"+$('.num_text').val()+"Pieces"+"'>");
                $('#form1').append("<input hidden  name='size' value='"+$('.num_text').val()+$('#size').val()+"'></input>");
              }else if ($('.num_text').val().length==0){
                $('#form1').append("<input hidden name='auto_size_en' value='"+"1Piece"+"'>");
                $('#form1').append("<input hidden name='size' value='1"+$('#size').val()+"'></input>");
              }
              $('#form1').append("<input hidden name='auto' value='t'>")
              
            }else{
              $('#form1').append("<input hidden name='size' value='"+$('#size').val()+"'></input>");
              $('#form1').append("<input hidden name='auto' value='t'>")
              $('#form1').append("<input hidden name='auto_size_en' value='"+$('#size_en').text()+"'>");
            }
            
          }
          //$(location).attr("href","insert_food");
          
        }else{
          name_bool()
          console.log("no");
          return false;
        }
         
       })

      });

