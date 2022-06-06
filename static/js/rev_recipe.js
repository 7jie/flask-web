$(document).ready(function() {
    $('#img_file').on('change', function(e){  
        var f=new FileReader();
        img =this.files[0];
        f.readAsDataURL(img);
        f.onload=function(){
            $('#recipe_img').attr('src',"");
            $('#recipe_img').attr('src',this.result);
            
        }
        
            
    });
    $(document).on('click','.r4',function(){
    
        $(this).parent().remove();
        
        });
    $(document).on('click','.r3',function(){
        num=parseInt($('#step_rev').children().last().find('span').html())+1;
        //console.log(parseInt($('#step_rev').children().last().find('span').html())+1);
        
        $('#step_rev').append('<li><div class="step_num"><div class="step_left"><span>'+num+'</span>：</div><div class="step_right"><input type="text" class="step"type="text" size="90"><button class="r4">x</button></div></div></li>');
            
    });
    $(document).on('blur','.size',function(){
        if ($(this).val().length==0){
            if($(this).next().next().html()!="*請填寫食材份量"){
                $(this).parent().append("<span class='red must'>*請填寫食材份量</span>");
            }
        }else{
            if($(this).next().next().html()=="*請填寫食材份量"){
                $(this).next().next().remove();
            }
        }
    });
    $(document).on('blur','.name',function(){
        if ($(this).val().length==0){
            if($(this).next().next().html()!="*請填寫食材名稱"){
                $(this).parent().append("<span class='red must'>*請填寫食材名稱</span>");
            }
        }else{
            if($(this).next().next().html()=="*請填寫食材名稱"){
                $(this).next().next().remove();
            }
        }
    });
    $(document).on('click','.r2',function(){
        $(this).parent().parent().parent().remove();
        
    });
    $(document).on('click','.r1',function(){
        $('#ing_rev').append('<li><div class="ing_num"><div class="ing_left"><span>名稱：</span><input type="text" class="name"></div><div class="ing_right"><span>份量：</span><input type="text" class="size"><button class="r2">x</button></div></div></li>');
    });



    
});