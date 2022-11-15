$(document).ready(function() {
  
  var num_tag=false
  var na_en=true
  var name_bool=false
  var kc_bool=false
  
  
    
  $('#auto').show();
  
  
  
  $('.num').hide();
  
  $('input[name="name_en"]').on('input',function(){
    console.log($(this).val())
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

    $("#size").on('change', function() {


      console.log(size_drink[$(this).val()]);
      console.log($(this).val());
      $("#size_en").text(size_drink[$(this).val()]);
      if($("#type").val()=="eat"){
        if($(this).val()!="1份" ){
          $('.num').show();
        }else{
          $('.num').hide();
        }
      }

      
    })

     $('#ch_manual').click(function(){
      var top=$(document).scrollTop();
      //console.log(top);
      $('#auto').hide();
      $('#man').show();
      $('.num').hide();
     })

     $('#ch_auto').click(function(){
      var top=$(document).scrollTop();
      console.log(top);
      $('#auto').show();
      $('#man').hide();
      if ($("#size").val()!="1份"){
        $('.num').show();
      }
      
      
    })
      $('.ch_num').on('input',function(){
        num_tag=info_num()
      })
      
      function info_num(){
        var n=0;
        $('.ch_num').each(function(){
          $($(this).next().html(''));
          if($(this).val().length>0 & isNaN($(this).val())){
            console.log($(this).val());
            $($(this).next().html('*請輸入數字'));
            n+=1;
          }
          if($(this).val()<0){
            $($(this).next().html('*不可輸入負數'));
            n+=1;
          }
          if($(this).val()>5000){
            $($(this).next().html('*請勿超過5000'));
            n+=1;
          }

        })
        if(n==0){
          return true;
        }
        return false;

      }

        $($('#size_zh')).on('input',function(){
        
        var text_val=$(this).val().split("")
        var n=Number
        $.each(text_val,function(k,v){
          console.log("t")
          if (/.*[\u4e00-\u9fa5]+.*$/.test(v)){
            n=k
            console.log(n)
            return false
          }
        })
        if($('#size_zh').val().length==0){//
          $('#sizetext').html('*請輸入份量中文');
          man_bool=false;
        }
        else if($(this).val().indexOf("-")!=-1){
          $('#sizetext').html('*份量請勿輸入負數');
          man_bool=false;
        }
        else if(!/.*[\u4e00-\u9fa5]+.*$/.test($(this).val())){
          $('#sizetext').html('*請包含中文');
          man_bool=false;
        }
        else if (isNaN(text_val[0])){
          $('#sizetext').html('*份量數字請輸入在前');
          man_bool=false;
        }
        else if(Number($('#size_zh').val().slice(0,n))>2000){
          $('#sizetext').html('*請勿大於2000');
          man_bool=false;
        }
        else{
          man_bool=true;
          size=$('#size_zh').val();
          $('#sizetext').html('*必填');
          
        }
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
      $('input[name="kcal"').on('input',function(){
        var kc_text=ch_kcal()
        $('#kcaltext').html(kc_text);
        if (kc_text!="*必填")
          kc_bool=false
        else
          kc_bool=true
      })

      function check_name() {
        if ($('input[name="name_zh"]').val()==0)
          return "*請輸入食品中文名稱";
        if(!/.*[\u4e00-\u9fa5]+.*$/.test($('input[name="name_zh"]').val()))
          return "*請包含中文"
        return "*必填";
      }; 
      $('input[name="name_zh"').on('input',function(){
        var name_text=check_name()
        $('#name').html(name_text);
        if (name_text!="*必填")
          name_bool=false
        else
        name_bool=true

      })

      $('.click').on('click', function() {
        
        
        num_tag=info_num();
        
        var size="";

        //console.log($('#man').css("display"));
        
        if($('#man').css("display")=="block"){

          console.log("是block");
          
        }else{
          size=$('#size').val();
          man_bool=true;
        }

        
        
        //console.log($('#size_zh').val());
        
        $('#name').html(check_name())
        $('#kcaltext').html(ch_kcal())
        if(name_bool& kc_bool & num_tag & man_bool &na_en){
          $('#preloader').show();
          $('#form1').append("<input hidden name='store_name' value='"+$(".center_name span").text()+"'></input>")
          console.log("成功");
          $('#form1').append("<input hidden name='size' value='"+size+"'></input>");
          if($('#man').css("display")=="block"){
            $('#form1').append("<input hidden name='man' value='t'>")
          }
          else{
            $('#form1').append("<input hidden name='auto' value='t'>")
            $('#form1').append("<input hidden name='auto_size_en' value='"+$('#size_en').text()+"'>");
          }
          //$(location).attr("href","insert_food");
          
        }else{
          console.log("no");
          return false;
        }
         
       });
});