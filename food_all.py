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

a=db.document("food/food_all_en").get().to_dict()

d={}
d_en={}
e={}
e_en={}
for i,k in a.items():
    #d e
    for x,z in k.items():
        k[x]=z.path
        #food/....
    d[i]=k

with open ("food_all_en.json","w",encoding="utf-8") as f:
    json.dump(d,f)
"""

b=db.document("food/food_all_en").get()

with open ("food_all_en.json","w",encoding="utf-8") as f:
    json.dump(a,f)
"""
