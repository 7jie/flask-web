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


with open ("food_store.json","r",encoding="utf-8") as f:
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
        
    with open(name,"w",encoding="utf-8") as f:
        json.dump(store,f,ensure_ascii=False)
"""




data=[]
file_name="food_store.json"
for i in a:
    if i.id=='food_all':
        continue
    data.append(i.id)
with open(file_name,"w",encoding='UTF-8') as f:
    json.dump(data,f,ensure_ascii=False)
"""
#a=db.document(docs).get()
#print(docs)

#doc=db.document("food/清心").set({"test":"hi"},merge=True)
"""
for i in doc:
    print(i.to_dict())



docs = db.document("food/清心").get()
db.document("food/food_all").set({"name":docs.reference})
print(docs.reference.path)

docs = db.collection("food").get()
print(len(docs))
for i in docs:
    if i.id=='food_all':
        continue
    db.collection(str(i.reference.path)+"/drink").get()
    
"""
#a=docs.to_dict()
#print(a)

#a="food/"
#b="/單位"


"""
for i in docs:
    
    o=i.id
    print(i.id)

   
    doc = db.collection(a+o+b).stream()
    print("hi")
    for x in doc:
        print(x.to_dict())
"""



#docs = db.collection(pa).where('`性別`','==','女').stream()

#print(docs)

#for o in docs:
    #print(o.to_dict())


#for i in docs:
    #print(i.to_dict())
