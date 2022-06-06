$(document).ready(function() {
    var img;
    $('#img').hide();
    $('#test1').on('change', function(e){  
        var f=new FileReader();
         img =this.files[0];
        f.readAsDataURL(img);
        f.onload=function(){
            $('#img1').attr('src',this.result);

            $('#img').show();
        }
        
            
});
var recipe_name;
var name=[];
var size=[];
var step=[];
var k={};
var recipe={};
n=true;
w=true;
v=true;
s=true;
var a='<li class="r0"><span>名稱</span><input name="n"class="name"><span class="red">*</span><span id="s">份量</span><input class="size"><span class="red">*</span><button class="r2">x</button></li>';
$(document).on('click','.r1',function(){
    
    
    $('input[class=name]').each(function(){
        if ($(this).val().length==0){
            if($(this).next().html()!="*請填寫食材名稱"){
                $(this).next().html('*請填寫食材名稱');
               
            }
            w=false;
        }else{
            if($(this).next().html()=="*請填寫食材名稱"){
                $(this).next().html('*');
            }
            w=true;
            
        }
       
    })

    $('input[class=size]').each(function(){
        if ($(this).val().length==0){
            if($(this).next().html()!="*請填寫食材份量"){
                $(this).next().html('*請填寫食材份量');
            }
            
            v=false;
        }else{
            if($(this).next().html()=="*請填寫食材份量"){
                $(this).next().html('*');
            }
            v=true;
        }
        
    })
    if(w & v){
        $('#ing').append(a);
        
    }else if($(".r0").html()==undefined){
        $('#ing').append(a);
    }
    

    })

$(document).on('blur','.size',function(){
    if ($(this).val().length==0){
        if($(this).next().html()!="*請填寫食材份量"){
            $(this).next().html('*請填寫食材份量');
        }
    }else{
        if($(this).next().html()=="*請填寫食材份量"){
            $(this).next().html('*');
        }
    }
})
$(document).on('blur','.name',function(){
    if ($(this).val().length==0){
        if($(this).next().html()!="*請填寫食材名稱"){
            $(this).next().html('*請填寫食材名稱');
        }
    }else{
        if($(this).next().html()=="*請填寫食材名稱"){
            $(this).next().html('*');
        }
    }
})

$(document).on('blur','.step',function(){
    if ($(this).val().length==0){
        if($(this).next().html()!="*請填寫食譜步驟"){
            $(this).next().html('*請填寫食譜步驟');
        }
    }else{
        if($(this).next().html()=="*請填寫食譜步驟"){
            $(this).next().html('*');
        }
    }
})
$(document).on('blur','#recipe_name',function(){
    if ($(this).val().length==0){
        if($(this).next().html()!="*請填寫食譜名稱"){
            $(this).next().html('*請填寫食譜名稱');
            n=false;
            
        }
    }else{
        recipe_name=$(this).val();
        if($(this).next().html()=="*請填寫食譜名稱"){
            $(this).next().html('*');
        }
        n=true;
    }
})

$(document).on('click','.r2',function(){
    $(this).parent().remove();
    
});
$(document).on('click','.r3',function(){
    var b='<li><input class="step"><span class="red">*</span><button class="r4">x</button></li>';
    $('input[class=step]').each(function(){
        if($(this).val().length==0){
            if($(this).next().html()!="*請填寫食材步驟"){
                $(this).next().html('*請填寫食材步驟');
            }
            
            s=false;
        }else{
            if($(this).next().html()=="*請填寫食材步驟"){
                $(this).next().html('*');
            }
            s=true;
        }
    })
    if(s){
        $('#st').append(b);
        return false;
    }
    return false;
    })
    $(document).on('click','.r4',function(){
    
        $(this).parent().remove();
        
        })

$('#go').on('click',function(){
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

    if(ing&recipe_size&recipe_step&n){
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
        console.log(recipe_name);
        console.log(k);
        console.log(step);
        if (img==null){
            console.log("sss");
        }
        
        var cover = new FormData();
        cover.append('ing',JSON.stringify(k))
        cover.append('step',JSON.stringify(step))
        $.ajax({
            
            url:'/recipe',
            type: 'POST',
            async: false,
            processData: false,
            contentType: false,
            data:cover,
          })
          .done(function(data){
            console.log(data);
          })
          .fail(function(data){
            console.log("圖片錯誤");
          })
    
    }else{
        console.log("失敗");
        //return false;
        
    }


/*
    $('.tip').each(function(){
        if ($(this).text()=="*請填寫食材名稱"|$(this).text()=="*請填寫食材份量"|$(this).text()=="*請填寫食材步驟"){
            console.log("資料填寫不完整");
            return false;
        }else{
            $('input[class=name]').each(function(){
                
                name.push($(this).val());
                
            });
            $('input[class=size]').each(function(){
                
                size.push($(this).val());
                

            });
        
        
            for (var x=0;x<name.length;x++){
                k[name[x]]=size[x];
            }
        
            $.ajax({
                url: '/search',
                type: 'POST',
                data:{
                  "n":JSON.stringify(k)
                },
              })
              .done(function(data) {
                console.log(data)
        
                //$(location).attr("href","insert_food")
        
              })
              .fail(function() {
                console.log('失敗');
              });
        }
    })
    */

})




});