
$(document).ready(function() { 
    var a=decodeURI($(location).attr('href'))
    var key=a.slice(a.indexOf("?key=")+5,)
    var kcal_bool=true
    var code=true
    var ch_bool=true
    var size=true
    var num_tag=true;
    var english_bool=true
    var size_en_bool=true
    function ch_size_en(){
      var s_en=$('input[name="size_en"]').val()
      var text_val=$('input[name="size_en"]').val().split("")
      
      var n=Number
      if(/.*[\u4e00-\u9fa5]+.*$/.test(s_en)){
        $('#size_en').html('*請勿包含中文')
      }else if(s_en.indexOf("-")!=-1){
        $('#size_en').html("*份量請勿輸入負數")
        size_en_bool=false
      }else if(s_en.length==0){
        $('#size_en').html('')
          size_en_bool=true
      }
      else if (isNaN(text_val[0])){
        $('#size_en').html('*份量數字請輸入在前')
        size_en_bool=false
      }else{
        $.each(text_val,function(k,v){
          if (/[a-zA-Z]/.test(v)){
            console.log(v)
            n=k
            return false
          }else{
            n=-1
          }
        })
        if(n==-1){
          $('#size_en').html('*請輸入英文份量')
          size_en_bool=false
        }
        else if(Number($('input[name="size_en"]').val().slice(0,n))>2000){
          $('#size_en').html('*單位請勿大於2000')
          size_en_bool=false
        }else{
          $('#size_en').html('')
          size_en_bool=true
        }
      }

    }
    $('input[name="size_en"]').on('input',function(){
      ch_size_en()
    })
    function ch_english(){
      var en=$('input[name="english"]').val()
      if (en.length>80){
        $('#english').html('*請勿超過80字')
        english_bool=false
      }else if(/.*[\u4e00-\u9fa5]+.*$/.test(en)){
        $('#english').html('*請勿包含中文')
        english_bool=false
      }else if(en.indexOf('-')!=-1){
        $('#english').html('*請勿包含"-"')
        english_bool=false
      }
      else{
        $('#english').html('')
        english_bool=true
      }
    }
    $('input[name="english"]').on('input',function(){
      ch_english()
    })
    function check_code(){
      
        var c=$('input[name="BarCode"]').val()

        if(c<0){
          $('#Barcode').html("*條碼請勿輸入負數")
          code=false
        }
        else if(c.length==0){
          $('#Barcode').html("*請輸入Barcode")
          code=false
        }
        else if(isNaN(c)){
          $('#Barcode').html("*條碼請輸入數字")
          code=false
        }
        else if(c.length<8 || c.length>13 ||(c.length>8 && c.length<13)){
          $('#Barcode').html("*條碼請輸入8位數or13位數")
          code=false
        }
        else{
          $('#Barcode').html("*必填")
          code=true
        }
        
      }
      $('input[name="BarCode"]').on('input',function(){
        check_code()
      })
    function ch_kcal(){
      
      var k=$('input[name="kcal"]').val()
      
      if(k==0){
        $('#kcal').html("*請輸入食品熱量")
        kcal_bool=false
      }
      else if(isNaN(k)){
        $('#kcal').html("*食品熱量請輸入數字")
        kcal_bool=false
      }
        
      else if(k<0){
        $('#kcal').html("*不可輸入負數")
        kcal_bool=false
      }
        
      else if(k>5000){
         $('#kcal').html("*請勿超過5000")
         kcal_bool=false
      }
      else{
        $('#kcal').html("*必填")
        kcal_bool=true
      }
      
    }
    $('input[name="kcal"]').on('input',function(){
      ch_kcal()
    })
    function ch_chinese(){
      var n=$('input[name="chinese"]').val()
      if(n.length!=0 && /.*[\u4e00-\u9fa5]+.*$/.test(n)){
        if(n.length>30){
          $('#chinese').html("*請輸入30字以內")
          ch_bool=false
        }
        else{
          $('#chinese').html("*必填")
          ch_bool=true
        }
        
      }
      else{
        if(n.length==0)
          $('#chinese').html("*請輸入食品中文名稱")
        else if(!/.*[\u4e00-\u9fa5]+.*$/.test(n))
          $('#chinese').html("*請包含中文")
        ch_bool=false;
      }
      
    }
    function check_size(){
      var s=$('input[name="size_zh"]').val()
      var text_val=$('input[name="size_zh"]').val().split("")
      var n=Number
      if(s.indexOf("-")!=-1){
        $('#size_zh').html("*份量請勿輸入負數")
        size=false
      }
      else if(s.length==0){
        $('#size_zh').html("*請輸入食品份量中文")
        size=false
      }else if(!/.*[\u4e00-\u9fa5]+.*$/.test(s)){
        $('#size_zh').html("*請包含中文")
        size=false
      }
      else if (isNaN(text_val[0])){
        $('#size_zh').html('*份量數字請輸入在前')
        size=false
      }   
      else{
        $.each(text_val,function(k,v){
          if (/.*[\u4e00-\u9fa5]+.*$/.test(v)){
            n=k
            return false
          }
        })
        if(Number($('input[name="size_zh"]').val().slice(0,n))>2000){
          $('#size_zh').html('*單位請勿大於2000')
          size=false
        }
        else{
          size=$('#size_zh').val();
          $('#size_zh').html('*必填')
          size=true
    
        }
        
      }
    
    }
    $('input[name="size_zh"]').on('input',function(){
      check_size()
    })
    function info_num(){
      var n=0;
      $('.num').each(function(){
        $($(this).next().html(''));
        if(isNaN($(this).val())){
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
        num_tag=true;
      }else{
        num_tag= false;
      }
      
    }

    $('.num').on('input',function(){
      info_num()
    })
    $('input[name="chinese"]').on('input',function(){
      ch_chinese()
    })


$('#click').on('click',function(){
  
  if($('.code').length){
    code=true
  }else{
    check_code()
  }
  
  if(kcal_bool&ch_bool&english_bool&code&size&size_en_bool&num_tag){
    $('#preloader').show()
    
    console.log(key.replace('#',''))
    
    $('#code_fr').append("<input name='key' hidden value='"+key.replace('#','')+"'>")
    
    if($('input[name="chinese"]').data('val')!=$('input[name="chinese"]').val()){
      $('#code_fr').append("<input name='def_chinese' hidden value='"+$('input[name="chinese"]').data('val')+"'>")

    }
    if($('input[name="english"]').data('val')!=$('input[name="english"]').val()){
      $('#code_fr').append("<input name='def_english' hidden value='"+$('input[name="english"]').data('val')+"'>")
    }
    if($('input[name="size_zh"]').data('val')!=$('input[name="size_zh"]').val()){
      $('#code_fr').append("<input name='def_esize_zh' hidden value='"+$('input[name="size_zh"]').data('val')+"'>")
    }
    if($('input[name="size_en"]').data('val')!=$('input[name="size_en"]').val()){
      $('#code_fr').append("<input name='def_esize_en' hidden value='"+$('input[name="size_en"]').data('val')+"'>")
    }
  }


})

$(document).on('click','.inst_code',function(){
    
    $('input[name="BarCode"]').attr('disabled',true)
    $(this).addClass("code")
    $(this).removeClass("inst_code")
      
})
      
$(document).on('click','.code',function(){
    $('input[name="BarCode"]').attr('disabled',false)
    $(this).addClass("inst_code")
    $(this).removeClass("code")
    
    
    /*
    $('input[name="barcode"]').attr('disabled',false)
    $(this).addClass("inst_code")
    $(this).removeClass("code")
    */
    check_code()
  })
  
})