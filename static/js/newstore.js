$(document).ready(function() {
  function Text(store,name,kcal) {
    this.store = store;
    this.name = name;
    this.kcal =kcal;
    this.checkstore = function() {
      if (this.store.length==0)
        return "請輸入店家名稱";
      return "";
    }; 
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
      if (this.store.length==0)
        return false;
      if (this.name.length==0)
        return false;
      if (this.kcal.length==0 ||isNaN(this.kcal))
        return false;
      return true;
    }; 
  }

    $('#click').on('click', function() {

      
      var chaoyangHotel = new Text($('input[name=store_name]').val(),$('input[name=name_zh]').val(), $('input[name=kcal]').val());
      $('#store').html(chaoyangHotel.checkstore());
      $('#name').html(chaoyangHotel.checkname());
      $('#kcaltext').html(chaoyangHotel.check_kcal());
      if(chaoyangHotel.checktext()){
        document.form1.submit();
      }else{
        return false;
      }
/*
        $.ajax({
          url: '/insert_food',
          type: 'POST',
          data:{
            "num":5
          },
        })
        .done(function(data) {
          console.log(data)
          //$(location).attr("href","insert_food")

        })
        .fail(function() {
          console.log('失敗');
        });
      
          
      */
      
  
          

        
       
     });
     
});