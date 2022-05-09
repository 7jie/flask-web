import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
cred = credentials.Certificate("topic.json")#自己的json路徑
firebase_admin.initialize_app(cred)
db = firestore.client()

#pa="test/XX系/C班"

#docs = db.document("t/2bH80fhc7tQ2X32ho8eA").get().to_dict()

#要改成自己的路徑

#a=db.collection("food").get()
#print(a)
zh={}

with open ("food_store.json","r",encoding="utf-8") as f:
    data=json.load(f)

for i in data:
    store={}
    store_drink={}
    store_eat={}

    drink=db.collection("food/"+i+"/drink").get()
    if len(drink) !=0:
        for n in drink:
            a=n.to_dict()
            zh[a["size_zh"]]=a["size_en"]
    print(zh)
            
    
    eat=db.collection("food/"+i+"/eat").get()
    if len(eat) !=0:
        for e in eat:
            b=e.to_dict()
            zh[a["size_zh"]]=a["size_en"]
    print(zh)
    
        
with open("size","w",encoding="utf-8") as f:
    json.dump(store,f,ensure_ascii=False)
