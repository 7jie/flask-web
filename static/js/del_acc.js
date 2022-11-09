
$(document).ready(function() {
    $('#preloader').show()
    function db_pre(){
        $.ajax({
            url:'/getuser',
            type:'POST',
            data:{
                'provider':$('#acc_ch').val()
            }
        })
        .done(function(data){
            $('#uid_con').empty()
            if($.isEmptyObject(data)){
                $('#uid_con').append('<div class="nodata">暫無使用者資料</div>')
            }else{
                $.each(data,function(a,b){
                    if (b==false){
                        $('#uid_con').append('<div class="uid_fr"><div class="uid_text">'+a+'</div><div class="rev_del"><button data-val="'+a+'" class="stop">停用</button><button data-val="'+a+'" class="del">刪除</button></div></div>')
                    }else{
                        $('#uid_con').append('<div class="uid_fr"><div class="uid_text">'+a+'</div><div class="rev_del"><button data-val="'+a+'" class="star">啟用</button><button data-val="'+a+'" class="del">刪除</button></div></div>')
                    }
                })
            }

            $('#preloader').hide()
        })
    }
    console.log($('#acc_ch').val())

    db_pre()
    setTimeout(function() {
        
    },2000)
    $('#acc_ch').on('change',function(){
        $('#preloader').show()
        
        db_pre()
        
    })
    $(document).on('click','.del',function(){
        $('#back').html("");
        var uid=$(this).data('val')
        var msg = '<div id="note">';
        msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="tip_bold">刪除帳戶</h2>';
        msg +='<p id="tip_text">是否刪除'+uid+'?</p>';
        msg += '<button id="affirm">確認</button><button>取消</button>';
        msg += '</div></div>'
        $('#back').append(msg);
        $('#back').show();
        $('body').click((e) => {
            if (['back','note','title','text','tip_text','tip_bold'].indexOf(e.target.id) > -1) {
              return false;
            }
            $(document).on('click','#affirm',function(){
                $('#preloader').show()
                $('#back').hide();
                $.ajax({
                    url:'/userdel',
                    type:'POST',
                    data:{
                        'uid':uid,
                        'pro':$('#acc_ch').val()
                    }
                })
                .done(function(data){
                    $('#preloader').hide()
                    $('#back').html("");
                    var msg = '<div id="note">';
                    msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="tip_bold">刪除帳戶</h2>';
                    msg +='<p id="tip_text">已刪除'+uid+'</p>';
                    msg += '</div></div>'
                    $('#back').append(msg);
                    $('#back').show();
      
                    $('body').click((e) => {
                      if (['back','note','title','text'].indexOf(e.target.id) > -1) {
                        return false;
                      }
                      $('#preloader').show()
                      db_pre()
                      setTimeout(function() {
                          $('#preloader').hide()
                      },5000)
                })

                })

            
            })
            $('#back').hide();
        })
    })
    $(document).on('click','.stop',function(){
        $('#back').html("");
        var uid=$(this).data('val')
        var msg = '<div id="note">';
        msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="tip_bold">停用帳戶</h2>';
        msg +='<p id="tip_text">是否停用'+uid+'?</p>';
        msg += '<button id="affirm">確認</button><button>取消</button>';
        msg += '</div></div>'
        $('#back').append(msg);
        $('#back').show();

        $('body').click((e) => {
            if (['back','note','title','text','tip_text','tip_bold'].indexOf(e.target.id) > -1) {
              return false;
            }
            
            $(document).on('click','#affirm',function(){
              $('#preloader').show()
              $('#back').hide();

            $.ajax({
                url:'/userstop',
                type:'POST',
                data:{
                    'uid':uid
                }
            })
            .done(function(data){
              $('#preloader').hide()
              $('#back').html("");
              var msg = '<div id="note">';
              msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="tip_bold">停用帳戶</h2>';
              msg +='<p id="tip_text">已停用'+uid+'</p>';
              msg += '</div></div>'
              $('#back').append(msg);
              $('#back').show();

              $('body').click((e) => {
                if (['back','note','title','text'].indexOf(e.target.id) > -1) {
                  return false;
                }
                $('#preloader').show()
                db_pre()
                setTimeout(function() {
                    $('#preloader').hide()
                },3000)
                
            })
           
        })
    })
    $('#back').hide();
})
})  
    $(document).on('click','.star',function(){
        $('#back').html("");
        var uid=$(this).data('val')
        var msg = '<div id="note">';
        msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="tip_bold">啟用帳戶</h2>';
        msg +='<p id="tip_text">是否啟用'+uid+'?</p>';
        msg += '<button id="affirm">確認</button><button>取消</button>';
        msg += '</div></div>'
        $('#back').append(msg);
        $('#back').show();

        $('body').click((e) => {
            if (['back','note','title','text','tip_text','tip_bold'].indexOf(e.target.id) > -1) {
              return false;
            }
            
            $(document).on('click','#affirm',function(){
              $('#preloader').show()
              $('#back').hide();

              $.ajax({
                url:'/userstar',
                type:'POST',
                data:{
                    'uid':uid
                }
            })
            .done(function(data){
                $('#preloader').hide()
              $('#back').html("");
              var msg = '<div id="note">';
              msg += '<div id="title"><a href="#">關閉X</a></div><div id="text"><h2 id="tip_bold">啟用帳戶</h2>';
              msg +='<p id="tip_text">已啟用'+uid+'</p>';
              msg += '</div></div>'
              $('#back').append(msg);
              $('#back').show();

              $('body').click((e) => {
                if (['back','note','title','text'].indexOf(e.target.id) > -1) {
                  return false;
                }
                $('#preloader').show()
                db_pre()
                setTimeout(function() {
                    $('#preloader').hide()
                },3000)
            })
           
        })
    })
    $('#back').hide();
})


        
    })
/*

    var firebaseConfig = {
        apiKey: "AIzaSyAk2Sp6_oP4o1Q1_wOtgOlIKpdaVemoqEI",
        authDomain: "topic-3b33d.firebaseapp.com",
        databaseURL: "https://topic.firebaseio.com",
        projectId: "topic-3b33d",
        storageBucket: "topic-3b33d.appspot.com",
        messagingSenderId: "536031508017",
        appId: "1:536031508017:web:f51954c5819d6923b98710",
        measurementId: "G-20ZX53K4QD"
        }

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db=firebase.firestore();
    var ref = db.collection("user");
    ref.doc('google').get().then((doc) => {
        if (doc.exists) {
            $.each(doc.data(),function(k,v){
                $.each(v,function(i,x){
                    $('#acc_con').append('<div><div>'+x+'<a href="#">停用</a></div></div>')
                    console.log(x)
                })
            })
            
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    */
    
    
    

    
    


})
