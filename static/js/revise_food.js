$(document).ready(function() {
    var a=decodeURI($(location).attr('href'))
    var store=a.slice(a.indexOf("&b=")+3,a.indexOf("&c="))
    var type_sel={"喝":"drink","吃":"eat"}
    var type=type_sel[a.slice(a.indexOf("&c=")+3)]
    var num_tag=true;
    var kcal_bool=false
    var name_bool=false
    var key=a.substr(a.indexOf("?a=")+3,20)

    

    function check_chinese(){
      var c=$("input[name='chinese']").val()
      if(c.length==0){
        $('#zh_text').html("*請輸入欲修改的食品名稱")
        name_bool=false
      }
      else if(c.length>30){
        $('#zh_text').html("*字串長度請勿超過30")
        name_bool=false
      }
      else{
          name_bool=true
          $('#zh_text').html("*必填")
      }
    }
    $("input[name='chinese']").on('input',function(){
      check_chinese()
    })
    function check_kcal(){
      var k=$("input[name='kcal']").val()

      if(k.length==0){
        $('#kcal_text').html("*請輸入欲修改的熱量")

        kcal_bool=false
      }
      else if(k.length>5000){
        $('#kcal_text').html("*請勿超過5000")  

        kcal_bool=false
      }
      else if(k<0){
        $('#kcal_text').html("*請勿輸入負數")  

        kcal_bool=false
      }
      else{
        $('#kcal_text').html("*必填")
        kcal_bool=true
      }
        
    }
    $("input[name='kcal']").on('input',function(){
      check_kcal()
            
    })
    $('.n').on('input',function(){
      info_num()
    })

      function info_num(){
        var n=0;
        
        $('.n').each(function(){
          
          $($(this).next().html(''));
          if(isNaN($(this).val())){

            $($(this).next().html('*請輸入數字'));
            n+=1;
          }
          else if($(this).val()<0){
            $($(this).next().html('*不可輸入負數'));
            n+=1;
          }
          else if($(this).val()>5000){
            $($(this).next().html('*請勿超過5000'));
            n+=1;
          }
        })

        if(n!=0)
          num_tag=false
        else
          num_tag=true
      }

    $('#save').on('click',function(){
        $('#preloader').show()
        check_kcal()
        check_chinese()

        
        if (name_bool && kcal_bool && num_tag){
            console.log("t")
            $("#rev_f_con").append("<input name='store_name' hidden value='"+store+"'>")
            $("#rev_f_con").append("<input name='key' hidden value='"+key+"'>")
            $("#rev_f_con").append("<input name='type' hidden value='"+type+"'>")
            $("#rev_f_con").append("<input name='size_zh' hidden value='"+$('#size_zh').text()+"'>")
            $("#rev_f_con").append("<input name='size_en' hidden value='"+$('#size_en').text()+"'>")
            if ($('input[name="chinese"]').data('val')!=$('input[name="chinese"]').val()){
              $("#rev_f_con").append("<input name='def_chinese' hidden value='"+$('input[name="chinese"]').data('val')+"'>")
            }
            if ($('input[name="english"]').data('val')!=$('input[name="english"]').val()){
              console.log($('input[name="english"]').data('val'))
              $("#rev_f_con").append("<input name='def_english' hidden value='"+$('input[name="english"]').data('val')+"'>")
            }
            
            
        }
        else{
          $('#preloader').hide()
          return false;
        }
            
    })
});