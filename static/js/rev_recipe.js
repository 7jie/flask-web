$(document).ready(function() {

    var a=decodeURI($(location).attr('href'))
    var key=a.slice(a.indexOf("?key=")+5,)
    var cover = new FormData();
    var name=[];
    var size=[];
    var step=[];
    var k={};
    var recipe={};
    var ch_bool=true
    var en_bool=true
    var img;

    $('#img_file').on('change', function(e){  
        var f=new FileReader();
        img =this.files[0];
        f.readAsDataURL(img);
        f.onload=function(){
            $('#recipe_img').attr('src',"");
            $('#recipe_img').attr('src',this.result);
            
        }
        
            
    });
    $('input[name="chinese"]').on('input',function(){
        if($(this).val().length==0){
            $('#chinese').html("*請輸入食譜名稱")
            ch_bool=false
        }else if($(this).val().length>30){
            $('#chinese').html("*請勿超過30字")
            ch_bool=false
        }else{
            $('#chinese').html("*必填")
            ch_bool=true
        }
    })
    $('input[name="english"]').on('input',function(){
        if($(this).val().length>80){
            $('#english').html("*請勿超過80字")
            en_bool=false
        }else if(/.*[\u4e00-\u9fa5]+.*$/.test($(this).val())){
            $('#english').html("*請勿包含中文")
            en_bool=false
        }
        else{
            $('#english').html("")
            en_bool=true
        }
    })
    $(document).on('click','.r4',function(){
    
        $(this).parent().parent().parent().remove();
        
        });
    $(document).on('click','.r3',function(){
        s=Boolean
        num=parseInt($('#step_rev').children().last().find('span').html())+1;
        console.log(num)
        if(isNaN(num)){
            num=1;
        }
        var st_num=0
        $('input[class=step]').each(function(){
            if($(this).next().html()=="*請填寫食譜步驟"){
                st_num+=1
            }
            
        })
        if(st_num==0){
            $('#step_rev').append('<li><div class="step_num"><div class="step_left"><span>'+num+'</span>：</div><div class="step_right"><input type="text" class="step"type="text" size="60"></div><div><button class="r4">刪除</button></div></div></li>');
        }
        //console.log(parseInt($('#step_rev').children().last().find('span').html())+1);
        
        
            
    });
    $(document).on('blur','.step',function(){
        if ($(this).val().length==0){
            if($(this).next().html()!="*請填寫食譜步驟"){
                $(this).parent().append("<span class='red must'>*請填寫食譜步驟</span>");
            }
        }else{
            if($(this).next().html()=="*請填寫食譜步驟"){
                $(this).next().remove();
            }
        }
    });
    $(document).on('blur','.size',function(){
        if ($(this).val().length==0){
            if($(this).next().html()!="*請填寫食材份量"){
                $(this).parent().append("<span class='red must'>*請填寫食材份量</span>");
            }
        }else{
            if($(this).next().html()=="*請填寫食材份量"){
                $(this).next().remove();
            }
        }
    });

    $(document).on('blur','.name',function(){
        if ($(this).val().length==0){
            if($(this).next().html()!="*請填寫食材名稱"){
                $(this).parent().append("<span class='red must'>*請填寫食材名稱</span>");
            }
        }else{
            if($(this).next().html()=="*請填寫食材名稱"){
                $(this).next().remove();
            }
        }
    });
    $(document).on('click','.r2',function(){
        $(this).parent().parent().parent().remove();
        
    });
    $(document).on('click','.r1',function(){

        var name_num=0
        var size_num=0
        $('input[class=name]').each(function(){
            if($(this).next().html()=="*請填寫食材名稱")
                name_num+=1
            
        })
    
        $('input[class=size]').each(function(){
            if($(this).next().html()=="*請填寫食材份量")
                size_num+=1
            
        })
        if(name_num==0&size_num==0){
            $('#ing_rev').append('<li><div class="ing_num"><div class="ing_left"><span>名稱：</span><input type="text" class="name"></div><div class="ing_right"><span>份量：</span><input type="text" class="size"></div><div><button class="r2">刪除</button></div></div></li>');
        }
        
    });

    $('#rev_recipe').on('click',function(){
        $('#preloader').show()
        var ing=true;
        var recipe_size=true;
        var recipe_step=true;
        $('input[class=name]').each(function(){
             if ($(this).val().length==0){
                ing=false;
             }
            
        });
        $('input[class=size]').each(function(){
            if ($(this).val().length==0){
                recipe_size=false;
                
             }
            
        });
        $('input[class=step]').each(function(){
            if ($(this).val().length==0){
                recipe_step=false;
            }
           
       });

       console.log(ing)
       console.log(recipe_size)
       console.log(recipe_step)

       if(ing & recipe_size & recipe_step & ch_bool & en_bool){
        
        
        $('input[class=name]').each(function(){
            name.push($(this).val());
          
      });
      $('input[class=size]').each(function(){   
          size.push($(this).val());
      });
  
      $('input[class=step]').each(function(){   
          step.push($(this).val());
      });
      for (var x=0;x<name.length;x++){
          k[name[x]]=size[x];
      }
      
      //img!=null放入cover

      console.log()
      if($('input[name="chinese"]').data('val')!=$('input[name="chinese"]').val()){
        cover.append('def_chinese',$('input[name="chinese"]').data('val'))
      }
      if($('input[name="english"]').data('val')!=$('input[name="english"]').val()){
        cover.append('def_english',$('input[name="english"]').data('val'))
      }
      if($('img').data('val')!="undefined"){
        cover.append('def_path',$('img').data('val'))
      }

        cover.append('img',img)
        cover.append('chinese',$('input[name="chinese"]').val())
        cover.append('english',$('input[name="english"]').val())
        cover.append('ing',JSON.stringify(k))
        cover.append('step',JSON.stringify(step))
        cover.append('key',key)
        
        $.ajax({
            
            url:'/recipe_rev',
            type: 'POST',
            async: false,
            processData: false,
            contentType: false,
            data:cover,
          })
          .done(function(data){
            console.log(data)
          })

       }
       $(location).attr("href","reciperev");
        //alert("儲存成功");
        //要抓食譜中文、英文的舊值

    })


    
});