$(document).ready(function() { //確保網頁載入完畢才執行程式
  
  var code=false
  var name=false
  var kcal=false
  var size=false
  var english_bool=true
  var size_en_bool=true
  introJs().setOptions({
    steps: [
      {element: document.querySelector('input[name="barcode"]'),
        intro: "請輸入條碼"},
      {element: document.querySelector('.inst_code'),
        intro: "若條碼為店內條碼，請點選"},
    ],
    hidePrev: true,
    hideNext: true,   
    nextLabel:'下一步>>',
    prevLabel:'<<上一步',
    skipLabel:'跳過',
    doneLabel: '我知道了'
  }).start();
  function ch_english(){
    var en=$('input[name="english"]').val()
    if (en.length>80){
      $('#english').html('*請勿超過80字')
      english_bool=false
    }else if(/.*[\u4e00-\u9fa5]+.*$/.test(en)){
      $('#english').html('*請勿包含中文')
      english_bool=false
    }else{
      $('#english').html('')
      english_bool=true
    }
  }
  $('input[name="english"]').on('input',function(){
    ch_english()
  })
  $('input[name="english"]').on('blur',function(){
    ch_english()
  })
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
    $('input[name="size_en"]').on('blur',function(){
      ch_size_en()
    })
  function check_code(){
    var c=$('input[name="barcode"]').val()
      if(c<0)
        return "*條碼請勿輸入負數"
      else if(c.length==0)
        return"*請輸入Barcode"
      else if(isNaN(c))
        return"*條碼請輸入數字"
      else if(c.length<8 || c.length>13 ||(c.length>8 && c.length<13))
        return"*條碼請輸入8位數or13位數"
      
      else
        return"*必填"
      
        

  }
  function code_bool(){
    var c=check_code()
    $('#barcode').html(c)
    if (c!="*必填")
      code=false
    else
      code=true
  }
  function check_name(){
    var n=$('input[name="name_zh"]').val()
    if(n.length!=0 && /.*[\u4e00-\u9fa5]+.*$/.test(n)){
      if(n.length>30){
        $('#name_zh').html("*請輸入30字以內")
        name=false
      }
      else{
        $('#name_zh').html("*必填")
        name=true
      }
      
    }
    else{
      if(n.length==0)
        $('#name_zh').html("*請輸入食品中文名稱")
      else if(!/.*[\u4e00-\u9fa5]+.*$/.test(n))
        $('#name_zh').html("*請包含中文")
      name=false
    }
  }
  function check_kcal(){
    var k=$('input[name="kcal"]').val()
    if(k.length!=0 && !isNaN(k)){
      if(k>5000){
        $('#kcal').html("*請勿超過5000")
        kcal=false
      }
      else{
        $('#kcal').html("*必填")
        kcal=true
      }
      
    }
    else if(k.indexOf("-")!=-1){
      $('#kcal').html("*熱量請勿輸入負數")
      kcal=false
    }
    else{
      if(k.length==0)
        $('#kcal').html("*請輸入熱量")
      else if(isNaN(k))
        $('#kcal').html("*熱量請輸入數字")
      kcal=false
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
      $('#size_zh').html('*請勿大於2000')
      size=false
    }
    else{
      size=$('#size_zh').val();
      $('#size_zh').html('*必填')
      size=true

    }
    
  }

}
  $('input[name="barcode"]').on('input',function(){
    code_bool()
  })
  $('input[name="barcode"]').on('blur',function(){
    code_bool()
  })
  $('input[name="name_zh"]').on('input',function(){
    check_name()
  })

  $('input[name="name_zh"]').on('blur',function(){
    check_name()
  })
  
  $('input[name="kcal"]').on('input',function(){
    check_kcal()

  })
  
  
  $('input[name="size_zh"]').on('input',function(){
    check_size()
  })
  $('input[name="size_zh"]').on('blur',function(){
    check_size()
  })

    $(document).on('click','.inst_code',function(){
      $('input[name="barcode"]').attr('disabled',true)
      $(this).addClass("code")
      $(this).removeClass("inst_code")
      $('#barcode').html("")
    })
    $(document).on('click','.code',function(){
      $('input[name="barcode"]').attr('disabled',false)
      $(this).addClass("inst_code")
      $(this).removeClass("code")
      
      code_bool()
    })
    var num_tag=true;
    function info_num(){
      var n=0;
      $('.num').each(function(){
        $($(this).next().html(''));
        if(isNaN($(this).val())){
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
        num_tag=true;
      }else{
        num_tag=false;
      }
      

    }
    
    $('.num').on('input',function(){
      info_num()
    })

   
    $('#click').on('click', function() {
      
      
      check_kcal()
      check_name()
      check_size()
      if($('.code').length){
        console.log("TT")
        code=true
      }else{
        code_bool()
      }
      

      

      if(code && name && kcal && size && num_tag & english_bool &size_en_bool){
        $('#preloader').show()
      }
      else
        return false
     });
    });
