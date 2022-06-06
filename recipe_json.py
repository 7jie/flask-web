import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
from PIL import Image
from urllib.request import urlopen
cred = credentials.Certificate("topic.json")#自己的json路徑
firebase_admin.initialize_app(cred)
db = firestore.client()

#pa="test/XX系/C班"

#docs = db.document("t/2bH80fhc7tQ2X32ho8eA").get().to_dict()

#要改成自己的路徑
"""
with open("recipe/lowkcal.json","r",encoding="utf-8") as f:
    data=json.load(f)

im = Image.open(urlopen(data["01sVTv4cci4vsNu4WCSA"]["url"]))
im.show()


"""
a=db.collection("recipe/低卡/食譜名稱").get()
#print(a)
k={}
for i in a:
    k[i.id]=i.to_dict()


with open("recipe/lowkcal.json","w",encoding="utf-8") as f:
    json.dump(k,f,ensure_ascii=False)


