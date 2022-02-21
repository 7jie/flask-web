 const firebaseConfig = {
    apiKey: "AIzaSyDU4SMG9hpVMear3YN1aPtV8ABFuu2yHjM",
    authDomain: "python-f1901.firebaseapp.com",
    projectId: "python-f1901",
    storageBucket: "python-f1901.appspot.com",
    messagingSenderId: "985398112505",
    appId: "1:985398112505:web:2b3a195194fcbfc38a3228",
    measurementId: "G-R9185X2PHH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db=firebase.firestore();
var ref = db.collection("food");
/*
ref.onSnapshot(querySnapshot => {

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


