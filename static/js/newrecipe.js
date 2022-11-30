$(document).ready(function() {
    var cover = new FormData();
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
var n=false;
var en=true
var ing=false;
var recipe_size=false;
var recipe_step=false;
introJs().setOptions({
    steps: [
     
    {element: document.querySelector('#recipe_name'),
        intro: "請輸入食譜名稱"},
         
    {element: document.querySelector('#recipe_en'),
        intro: "若無輸入英文食譜名稱則系統自動翻譯"},
    {element: document.querySelector('#test1'),
        intro: "您可選擇上傳食譜圖片"},
    {element: document.querySelector('.r1'),
        intro: "點選增加食材與份量，請先填寫在增加"},
    {element: document.querySelector('.name'),
        intro: "請輸入食材名稱"},
    {element: document.querySelector('.size'),
        intro: "請輸入食譜份量"},
    {element: document.querySelector('.r3'),
        intro: "點選增加步驟，請先填寫在增加"},    
    {element: document.querySelector('.step'),
        intro: "請輸入食譜步驟"},
       /* */
    
    {element: document.querySelector('#go'),
        scrollPadding:100,
        intro: "完成以上輸入後可新增食譜"},
    ],

    hidePrev: true,
    hideNext: true,   
    nextLabel:'下一步>>',
    prevLabel:'<<上一步',
    skipLabel:'跳過',
    doneLabel: '我知道了'
  }).start();
var a='<li class="r0"><div class="float_ins"><div class="test"><div class="ins_le"><span>名稱：</span><input name="n" class="name"><span class="red must">*必填</span></div><div class="ins_ri"><span>份量：</span><input name="s" class="size"><span class="red must">*必填</span></div></div><div><button class="r2">刪除</button></div></div></div></li>';
$(document).on('click','.r1',function(){


    if(ch_name()==0 & ch_size()==0){
        $('#ing').append(a);
        
    }else if($(".r0").html()==undefined){
        $('#ing').append(a);
    }
    

    })
function ch_name(){
    var name_num=0
    $('input[class=name]').each(function(){
        if ($(this).val().length==0){
            $(this).next().html("*請填寫食材份量")

            name_num+=1
        }else{
            $(this).next().html("*必填")
        }
            
    })
    return  name_num
}
function name_check(){
    if (ch_name()!=0)
        ing=false
    else
        ing=true
    checkcon()
}
function ch_size(){
    var size_num=0
    $('input[class=size]').each(function(){
        if ($(this).val().length==0){
            $(this).next().html("*請填寫食材份量")

            size_num+=1
        }else{
            $(this).next().html("*必填")
        }
            
    })
    return size_num
}
function size_check(){
    
    console.log(ch_size())
    if (ch_size()!=0)
        recipe_size=false
    else
        recipe_size=true
    checkcon()
}
$(document).on('blur','.size',function(){
    size_check()
    
})
$(document).on('input','.size',function(){
    size_check()
    
})
$(document).on('blur','.name',function(){
    name_check()
    
})
$(document).on('input','.name',function(){
    name_check()
    
})
function ch_step(){
    var step_num=0
    $('input[class=step]').each(function(){
        if ($(this).val().length==0){
            $(this).next().html("*請填寫食譜步驟")

            step_num+=1
        }else{
            $(this).next().html("*必填")
        }
            
    })
    return step_num
}

function step_check(){
    if (ch_step()!=0)
        recipe_step=false
    else
        recipe_step=true
    checkcon()
}
$(document).on('blur','.step',function(){
    step_check()
})
$(document).on('input','.step',function(){
    step_check()
})
function rename(){
    var na=$('#recipe_name').val()
    if(na.length==0){
        return '*請填寫食譜名稱'
    }else if(na.length>30){
        return '*請輸入30字以內'
    }else if(!/.*[\u4e00-\u9fa5]+.*$/.test(na)){
        return '*請包含中文'
    }else{
        return '*必填'
    }
}
function ch_rename(){
    var re_na=rename()
    $('#chinese').html(re_na)
    if (re_na!='*必填'){
        n=false
    }else{
        n=true
    }
    checkcon()
}
$(document).on('blur','#recipe_name',function(){
    ch_rename()
    
})
$(document).on('input','#recipe_name',function(){
    ch_rename()
    
})
$(document).on('blur','#recipe_en',function(){
    if($(this).val().length>80){
        $('#english').html('*請輸入80字以內');
            en=false;
 
    }
    else if(/.*[\u4e00-\u9fa5]+.*$/.test($(this).val())){
        $('#english').html('*請勿包含中文');
        en=false;
    }
    else{
        $('#english').html('');
        en=true;
    }
    checkcon()
})
$(document).on('click','.r2',function(){
    $(this).parent().parent().parent().remove();
    
});
$(document).on('click','.r3',function(){
    s=Boolean
    var b='<li><div><div class="st_block"><input class="step"><span class="red must">*必填</span></div></div><div><button class="r4">刪除</button></div></li>';
    var st_num=0
    $('input[class=step]').each(function(){
        if ($(this).val().length==0){
            $(this).next().html("*請填寫食譜步驟")
            st_num+=1
        }
           
    })

    if(st_num==0){
        $('#st').append(b);
    }
    })
    $(document).on('click','.r4',function(){
    
        $(this).parent().parent().remove();
        
        })



    function checkcon(){
        if(ing & recipe_size & recipe_step & n & en){
            $('#go').attr('disabled',false)
        }else{
            $('#go').attr('disabled',true)
        }
        }
$(document).on('click','#go',function(){
    
    console.log("u")
    $('#preloader').show()
    

        
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
        if (img==null){
            //console.log("sss");
        }else{
            var image=$('#test1')[0].files[0]
            cover.append('img',image)
        }
        
        
        cover.append('chinese',$('#recipe_name').val())
        cover.append('english',$('#recipe_en').val())
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
            //console.log(data);
            
            $(location).attr("href","insert_recipe");
          })
          .fail(function(data){
            $('#preloader').hide();
            //console.log("圖片錯誤");
          })
          
    
    

})


});