$(document).ready(function() {

    introJs().setOptions({
        steps: [
          
        {element: document.querySelector('.click_newbutton'),
            intro: "新增已有/新店家及食品資料"},
        {element: document.querySelector('.click_button'),
            intro: "新增已有店家食品資料"}
        ],

        hidePrev: true,
        hideNext: true,  
        nextLabel:'下一步>>',
        prevLabel:'<<上一步',
        skipLabel:'跳過',
        doneLabel: '我知道了'
      }).start();

});