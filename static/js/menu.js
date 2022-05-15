$(document).ready(function() {
    
            $(".item").hover(function() {
                $(this).children("ul").slideToggle();
            });
    
        })