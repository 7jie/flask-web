import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
cred = credentials.Certificate("python.json")#自己的json路徑
firebase_admin.initialize_app(cred)
db = firestore.client()

#pa="test/XX系/C班"

#docs = db.document("t/2bH80fhc7tQ2X32ho8eA").get().to_dict()

#要改成自己的路徑

#a=db.collection("food").get()
#print(a)


with open ("python_data.json","r",encoding="utf-8") as f:
    data=json.load(f)
print(data)
for i in data:
    store={}
    store_drink={}
    store_eat={}
    name=i+".json"
    drink=db.collection("food/"+i+"/drink").get()
    if len(drink) !=0:
        for n in drink:
            store_drink[n.id]=n.to_dict()
    
    eat=db.collection("food/"+i+"/eat").get()
    if len(eat) !=0:
        for e in eat:
            store_eat[e.id]=e.to_dict()
    if store_drink:
        store["drink"]=store_drink
    if store_eat:
        store["eat"]=store_eat
        
    with open("data_python/"+name,"w",encoding="utf-8") as f:
        json.dump(store,f,ensure_ascii=False)
