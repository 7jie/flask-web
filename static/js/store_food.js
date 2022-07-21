$(document).ready(function() {
    
    $('#auto').show();
    
    $('#preloader').show();

    var size_drink={};
      function Text(name,kcal) {
        this.name = name;
        this.kcal =kcal;

        this.checkname = function() {
          if (this.name.length==0)
            return "請輸入食品名稱";
          return "";
        }; 
        this.check_kcal = function() {
          if (this.kcal.length==0)
            return "請輸入食品熱量";
          if(isNaN(this.kcal))
            return "食品熱量請輸入數字"
          return "";
        }; 
        this.checktext = function() {
          if (this.name.length==0)
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
        $('#preloader').hide();
        
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
        var top=$(document).scrollTop();
        console.log(top);
        $('#auto').hide();
        $('#man').show();
       })

       $('#ch_auto').click(function(){
        var top=$(document).scrollTop();
        console.log(top);
        $('#auto').show();
        $('#man').hide();
        
        
      })
    
        $('#click').on('click', function() {
    
          
          var chaoyangHotel = new Text($('input[name=name_zh]').val(), $('input[name=kcal]').val());
          console.log($('#man').css("display"));
          console.log($('#size_zh').val());
          $('#name').html(chaoyangHotel.checkname());
          $('#kcaltext').html(chaoyangHotel.check_kcal());
          if(chaoyangHotel.checktext()){
            $(location).attr("href","insert_food_store")
          }else{
            return false;
          }
           
         });
});