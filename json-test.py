import os,json
with open ("data/"+"麥當勞.json","r",encoding="utf-8") as f:
            data=json.load(f)
ss=data["eat"]["BLT嫩煎雞腿堡-1個"]
print(ss)
del ss['unit']
#a=[i for i in ss.keys()]
print(ss)

