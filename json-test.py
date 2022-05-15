import os,json
import numpy as np
with open ("data/"+"麥當勞.json","r",encoding="utf-8") as f:
            data=json.load(f)


b=["123","151","223","330"]

p=["1","2"]



#search寫法
v=set(z for a in p for z in b if a in z)
print(v)