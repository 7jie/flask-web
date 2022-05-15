$(document).ready(function() {
    $('#img').hide();
    $('#test1').on('change', function(e){  
        let f=new FileReader();
        let img =this.files[0];
        f.readAsDataURL(img);
        f.onload=function(){
            $('#img1').attr('src',this.result);
            $('#img').show();
        }
});
var name=[];
var size=[];
var k={};
w=true;
v=true;
s=true;
var a='<li class="r0"><span>名稱</span><input name="n"class="name"><span class="red">*</span><span id="s">份量</span><input class="size"><span class="red">*</span><button class="r2">x</button></li>';
$(document).on('click','.r1',function(){

    $('input[class=name]').each(function(){
        if ($(this).val().length==0){
            if($(this).next().html()!="*請填寫食材名稱"){
                $(this).next().remove();
                $(this).after("<span class='red tip'>*請填寫食材名稱</span>");
            }
            w=false;
        }else{
            if($(this).next().html()=="*請填寫食材名稱"){
                $(this).next().remove();
            }
            w=true;
            
        }
       
    })

    $('input[class=size]').each(function(){
        if ($(this).val().length==0){
            if($(this).next().html()!="*請填寫食材份量"){
                $(this).next().remove();
                $(this).after("<span class='red tip'>*請填寫食材份量</span>");
            }
            
            v=false;
        }else{
            if($(this).next().html()=="*請填寫食材份量"){
                $(this).next().remove();
            }
            v=true;
        }
        
    })
    if(w & v){
        $('#ing').append(a);
    }
    

    })

$(document).on('blur','.size',function(){
    if ($(this).val().length==0){
        if($(this).next().html()!="*請填寫食材份量"){
            $(this).next().remove();
            $(this).after("<span class='red tip'>*請填寫食材份量</span>");
        }
    }else{
        if($(this).next().html()=="*請填寫食材份量"|$(this).next().html()=="*"){
            $(this).next().remove();
        }
    }
})
$(document).on('blur','.name',function(){
    if($(this).next().html()!="*請填寫食材名稱"){
        $(this).next().remove();
        $(this).after("<span class='red tip'>*請填寫食材名稱</span>");
    }else{
        if($(this).next().html()=="*請填寫食材名稱"|$(this).next().html()=="*"){
            $(this).next().remove();
        }
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
                $(this).next().remove();
                $(this).after("<span class='red tip'>*請填寫食材步驟</span>");
            }
            
            s=false;
        }else{
            
            if($(this).next().html()=="*請填寫食材步驟"){
                $(this).next().remove();
            }
            s=true;
        }
    })
    if(s){
        $('#st').append(b);
    }
    
    })
    $(document).on('click','.r4',function(){
    
        $(this).parent().remove();
        
        })

$('#go').on('click',function(){
    $('.tip').each(function(){
        if ($(this).text()=="*請填寫食材名稱"|$(this).text()=="*請填寫食材份量"|$(this).text()=="*請填寫食材步驟"){
            console.log("資料填寫不完整");
            return false;
        }else{
            $('input[class=name]').each(function(){
                if ($(this).val().length!=0){
                    name.push($(this).val());
                }
            });
            $('input[class=size]').each(function(){
                if ($(this).val().length!=0){
                    size.push($(this).val());
                }

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
    

})


});