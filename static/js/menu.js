$(document).ready(function() {
    
            $(".item").hover(function() {
                $(this).children("ul").slideToggle();
            });
            

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

            $('.adit_link').on('click',function(){
                window.location.href='/adit?type='+$(this).text()
                //console.log($(this).text())
            })

        })