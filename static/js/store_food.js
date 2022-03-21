$(document).ready(function() {
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
    
        $('#click').on('click', function() {
    
          
          var chaoyangHotel = new Text($('input[name=name_zh]').val(), $('input[name=kcal]').val());
          $('#name').html(chaoyangHotel.checkname());
          $('#kcaltext').html(chaoyangHotel.check_kcal());
          if(chaoyangHotel.checktext()){
            $(location).attr("href","insert_food_store")
          }else{
            return false;
          }
           
         });
});