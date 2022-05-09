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
});