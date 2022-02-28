$(document).ready(function() {
    
            $(".item").hover(function() {
                $(this).children("ul").addClass();
                $(this).children("ul").slideToggle();
            });
    
        })