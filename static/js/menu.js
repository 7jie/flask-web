$(document).ready(function() {

            $("#icon").on('click',function(){
                if($(window).width()<=1160){
                    $('.small').slideToggle();
                    $('.small_menu').slideToggle();
                }
                
            })
            $('.small_item').on('click',function(){
                $(this).children("ul").slideToggle(1)
            
            })


                /*
                if($(this).parent().prev().attr('class')=='menu'){
                    $(this).parent().prev().attr('class','phone')
                }else{
                    $(this).parent().prev().attr('class','menu')
                }
                console.log($(this).parent().prev().attr('class'));
                */
                return false;
            })
            
            $(".item").hover(function() {
                $(this).children("ul").slideToggle(1);
            });
             $(window).resize(function() {
                    var windowsize = $(window).width();
                    
                    if($(window).width()>=1110){
                        $('.small_menu').hide();
                        $('.small').hide();
                    }
                  });   
            /*

            $(window).scroll(function(){

                $('#m').css('position','fixed');
                if($(document).scrollTop()==0){
                    $('#m').css('position','static');
                }
            })
            var oTimerId;
            function Timeout(){
            window.open("/logout")
            }
            function ReCalculate(){
            clearTimeout(oTimerId);
            oTimerId = setTimeout('Timeout()', 1 * 5 * 1000);
            }
*/          
           
            $('.adit_link').on('click',function(){
                window.location.href='/adit?type='+$(this).text()
                //console.log($(this).text())
            })

       