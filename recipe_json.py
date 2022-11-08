import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

cred = credentials.Certificate("topic.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

a=db.collection("recipe/低卡/食譜名稱").get()


k={}
for i in a:
        k[i.id]=i.to_dict()

with open("lowkcal.json","w",encoding="utf-8") as f:
    json.dump(k,f,ensure_ascii=False)



