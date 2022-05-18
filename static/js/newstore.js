$(document).ready(function() {
  $('#man').hide();
  var size_drink={};
  function Text(store,name,kcal,size) {
    this.store = store;
    this.name = name;
    this.kcal =kcal;
    this.size=size;
    this.checkstore = function() {
      if (this.store.length==0)
        return "請輸入店家中文名稱";
      return "";
    }; 
    this.checkname = function() {
      if (this.name.length==0)
        return "請輸入食品名稱";
      return "";
    }; 
    this.checksize = function() {
      if (this.size.length==0)
        return "請輸入份量";
      return "";
    }; 
    this.check_kcal = function() {
      if (this.kcal.length==0)
        return "請輸入食品熱量";
      if(isNaN(this.kcal))
        return "請輸入數字如：10"
      return "";
    }; 
    this.checktext = function() {
      if (this.store.length==0)
        return false;
      if (this.name.length==0)
        return false;
        if (this.size.length==0)
        return false;
      if (this.kcal.length==0 ||isNaN(this.kcal))
        return false;
      return true;
    }; 

    
  }
  

  function type_eat_drink(){
    if($('#type').val()=='eat'){
      $('.num').show();
    }else{
      $('.num').hide();
    }
  }
  type_eat_drink();

    $('#click').on('click', function() {
      var size;
      if($('#auto').css('display')=='block'){
        size=$('#size').val();
      }else{
        size=$('#size_zh').val();
      }
      
      var food_info = new Text($('input[name=store_name]').val(),$('input[name=name_zh]').val(), $('input[name=kcal]').val(),size);
      $('#store').html(food_info.checkstore());
      $('#sizetext').html(food_info.checksize());
      $('#name').html(food_info.checkname());
      $('#kcaltext').html(food_info.check_kcal());
      console.log($('#size_zh').val());
      if(food_info.checktext()){
        $(location).attr("href","insert_food");
      }else{
        return false;
      }
       
     });

     $.ajax({
      url:'/getsize',
      type: 'POST',
      data:{
            "size_type":$("#type").val()
              },
    })
    .done(function(data){
      size_drink=data;
      console.log(size_drink);
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

     $("#type").on('change', function() {
      type_eat_drink();
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
        console.log(size_drink);
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
    });

    $("#size").on('change', function() {
      console.log(size_drink[$(this).val()]);

      $("#size_en").text(size_drink[$(this).val()]);
    })
     $('#ch_manual').click(function(){
       $('#auto').hide();
       $('#man').show();
     })
     $('#ch_auto').click(function(){
      $('#auto').show();
      $('#man').hide();
    })
     
});