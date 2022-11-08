const firebaseConfig = {
    apiKey: "AIzaSyAk2Sp6_oP4o1Q1_wOtgOlIKpdaVemoqEI",
    authDomain: "topic-3b33d.firebaseapp.com",
    databaseURL: "https://topic-3b33d-default-rtdb.firebaseio.com",
    projectId: "topic-3b33d",
    storageBucket: "topic-3b33d.appspot.com",
    messagingSenderId: "536031508017",
    appId: "1:536031508017:web:f51954c5819d6923b98710",
    measurementId: "G-20ZX53K4QD"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();
var ref = db.collection("food");
db.collection("userCoustomFood")
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                console.log("New city: ", change.doc.data());
            }
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
        });
    });

    /*
ref.onSnapshot(querySnapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          console.log('New district: ', change.doc.data())
        }
        if (change.type === 'modified') {
          console.log('Modified district: ', change.doc.data())
        }
        if (change.type === 'removed') {
          console.log('Removed district: ', change.doc.data())
        }

    querySnapshot.forEach(doc => {
      console.log(doc.id, doc.data());
      console.log(doc.ref.path);
      
      db.collection("food/清心/drink").get().then(Snapshot=>
         Snapshot.forEach(d => {
            console.log(d.data());
         })

      );
      
  });
  
});
*/
/*

async function getData() {
    var sayings=new Map();
    await db.collection("food")
        .onSnapshot(querySnapshot => {
             querySnapshot.forEach(doc => {
                console.log(doc.data());
                
                sayings.set(doc.id,JSON.stringify(doc.data()));
                
             });
             console.log(sayings);
$.ajax({
            
                url: '/ttt',
                type: 'GET',
                data: {'name': JSON.stringify(sayings)}
            })
            .done(function(data){
                console.log("u");
            })
            .fail(function(){
                console.log("no");
            });
        
            });
        }
getData();

*/
