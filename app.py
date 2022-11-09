import re
from flask import Flask,request,session,url_for,redirect,json,jsonify,render_template
import os
import flask
import time
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pyrebase
import datetime
import random
from PIL import Image
from flask_login import UserMixin,login_user,LoginManager,current_user,logout_user,login_required
import test
from datetime import datetime, timedelta 
from flask_paginate import Pagination, get_page_parameter
import math
import pathlib
import pytz
import datetime
from firebase_admin import auth
from firebase_admin import storage as st
from firebase_admin import db
import hashlib
from googletrans import Translator
translator = Translator()
#cred = credentials.Certificate("python.json")#自己的json路徑
cred = credentials.Certificate("topic.json")#自己的json路徑
"""
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://python-f1901-default-rtdb.firebaseio.com/',
    'storageBucket': 'python-f1901.appspot.com'
})
"""
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://topic-3b33d-default-rtdb.firebaseio.com/',
    'storageBucket': 'topic-3b33d.appspot.com'
})

"""
firebaseConfig = {
   "databaseURL":"https://python-f1901-default-rtdb.firebaseio.com/",
  "apiKey": "AIzaSyDU4SMG9hpVMear3YN1aPtV8ABFuu2yHjM",
  "authDomain": "python-f1901.firebaseapp.com",
  "projectId":"python-f1901",
  "storageBucket": "python-f1901.appspot.com",
  "messagingSenderId":"985398112505",
  "appId": "1:985398112505:web:2b3a195194fcbfc38a3228",
  "measurementId": "G-R9185X2PHH"
}
"""

firebaseConfig = {
     "databaseURL":"https://topic-3b33d-default-rtdb.firebaseio.com/",
     "apiKey": "AIzaSyAk2Sp6_oP4o1Q1_wOtgOlIKpdaVemoqEI",
     "authDomain": "topic-3b33d.firebaseapp.com",
     "projectId": "topic-3b33d",
     "storageBucket": "topic-3b33d.appspot.com",
     "messagingSenderId": "536031508017",
     "appId": "1:536031508017:web:f51954c5819d6923b98710",
     "measurementId": "G-20ZX53K4QD"
    }


bucket=st.bucket()
firestore_db = firestore.client()
firebase=pyrebase.initialize_app(firebaseConfig)
storage = firebase.storage()
#database=firebase.database()

app=Flask(__name__)
app.secret_key= 'fgdgedsfw1g6613wg16w15615a1f2d3dvw9894wevebhkjlbghtrh'
diet={"吃":"eat","喝":"drink"}
recipe_data=["chinese","english","url","path","ingredients","step"]

def num_info(map):
    str_list=['BarCode',"chinese","english","size_zh","size_en","unit"]
    for i,k in map.items():
        if i not in str_list:
            map[i]=float(k)
    return map




login_manager = LoginManager()
login_manager.init_app(app)
#login_manager = LoginManager(app)
login_manager.login_view = 'login'

class User(UserMixin):
    pass

@login_manager.user_loader
def user_loader(u):
    if u not in [i.to_dict()["mail"] for i in firestore_db.collection("manager").get()]:
        return

    user = User()
    user.id = u
    return user

@app.route('/',methods=['GET','POST'])
def login():

    #return  redirect(url_for('index',name={"hi":{"no":"QQ"}}))
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=10)
    if current_user.is_authenticated:
        return redirect(url_for('food'))
    
    #return redirect(url_for('logout'))
    return render_template('home.html') 

@app.route('/login_test',methods=['GET','POST'])
def login_test():
    user = User()
    user.id = request.values.get('mail')
    login_user(user)
    #user.id = request.values.get('mail')
    return redirect(url_for('food'))

@app.route('/reg_manager',methods=['GET','POST'])
def reg_manager():
    firestore_db.collection("manager").document().set({'mail':request.values.get('mail')})
    user = User()
    user.id = request.values.get('mail')
    login_user(user)
    user.id = request.values.get('mail')
    return redirect(url_for('login'))
#可修改成js寫法
"""
@app.route('/check_login',methods=['POST'])
def check_login():
    a=test.man(request.form['mail'],request.form['pass'])
    if a.check_man():  
        user = User()
        user.id = request.form['mail']
        login_user(user)
        session['session_id']=request.form['mail']
        return  "OK"
    return"NO" 
"""


#改json
@app.route('/manager_check',methods=['POST'])
def manager_check():
    manager_mail=[i.to_dict()["mail"] for i in firestore_db.collection("manager").get()]
    if request.form.get("mail") in manager_mail:
        return "OK"
    return "NO"

@app.route('/newpass',methods=['GET'])
def newpass():
    return render_template('newpass.html')


@app.route('/new_acc',methods=['POST'])
def new_acc():
    uid=request.form.get('uid')
    print(uid)
    #uid+真密碼+"%pwd"
    pass_text=uid+request.form.get('pass')+"%pwd"
    newpass=hashlib.sha256(pass_text.encode('utf-8')).hexdigest()
    data_tect={
        "Account":request.form.get('acc'),
        "PhoneNumber":request.form.get('num')
    }
    data={
        "Passwd":newpass
    }
    pro="Users/Protect"
    priv="Users/Private"
    per_data={
        "bornYear":None,
        "recTransFat":None,
        "filterFood":None,
        "userId":uid,
        "recSaturatedFat":None,
        "recSugar":None,
        "recCalorie":None,
        "height":None,
        "userPhone":request.form.get('num'),
        "weight":None,
        "userNick":None,
        "recProtein":None,
        "recCarbohydrate":None,
        "gender":None,
        "userEmail":request.form.get('acc'),
        "recSodium":2400
    }
    a=firestore_db.document('user/member').get().to_dict()
    a['userid'].append(uid)
    firestore_db.document('user/member').set(a)
    firestore_db.document('user/member/'+uid+'/personal_data').set(per_data)
    db.reference(pro).child(uid).set(data_tect)
    db.reference(priv).child(uid).set(data)
    return "h"
acc_amp={
    "userEmail":"帳號",
    "bornYear":"出生年",
    "gender":"性別",
    "height":"身高",
    "weight":"體重",
    "filterFood":"想避免的食物"
}
sex_map={
    "man":"男",
    "woman":"女",
    "unidentified":"不方便透漏"
}
@app.route('/acc_insert',methods=['POST'])
def acc_insert():

    #data={}
    # bornYear 、recTransFat 、filterFood 、userId、recSaturatedFat、recSugar、recCalorie、height、userPhone、weight、userNick
    # recProtein、recCarbohydrate、gender、userEmail、recSodium
    
    uid=request.form.get('uid')
    print(uid)
    year=int(request.form.get('birth_year'))
    hei=float(request.form.get('height'))
    wei=float(request.form.get('weight'))

    if request.form.get('sex')=="woman":
        Calorie=round((655+(9.6*wei)+(1.8*hei)-(4.7*(2022-year)))*1.3,2)#datetime.datetime.today().year
    else:
        Calorie=round((66+(13.7*wei)+(5*hei)-(6.8*(2022-year)))*1.3,2)#datetime.datetime.today().year
    per={
        "height":hei,
        "weight":wei,
        "bornYear":str(year),
        "gender":request.form.get('sex'),
        "recCalorie":Calorie,
        "recProtein":round(Calorie*0.2/4,2),
        "recSaturatedFat":round(Calorie*0.1,2),
        "recTransFat":round(Calorie*0.01,2),
        "recSugar":round(Calorie*0.1/4,2),
        "recCarbohydrate":round(Calorie*0.6/4,2),
    }
    if  len(request.form.getlist("filter"))!=0:
        per["filterFood"]=request.form.getlist("filter")
    else:
        per["filterFood"]=None
    firestore_db.document('user/member/'+uid+'/personal_data').update(per)
    per_acc=firestore_db.document('user/member/'+uid+'/personal_data').get().to_dict()
    return flask.render_template('acc_insert.html', data=per_acc,d_map=acc_amp,sex=sex_map)

@app.route('/account',methods=['GET','POST']) #'/index/<name>' ,傳參數
@login_required
def account(): 
    return  render_template('account.html')
@app.route('/del_acc')
@login_required
def del_acc():
    return flask.render_template('del_acc.html') 
@app.route('/acc',methods=['POST'])
def acc():
    a=[]
    for i in firestore_db.document('user/'+request.form.get('key')).get().to_dict():
        print(i)

    
    return jsonify(a) 

@app.route('/getuser',methods=['POST'])
def getuser():

    uid_list=firestore_db.document('user/'+request.form.get('provider')).get().to_dict()
    u={}
    for i,k in uid_list.items():
        for x in k:
            user = auth.get_user(x)
            u[x]=user.disabled

    return jsonify(u)
@app.route('/userstop',methods=['POST'])
def userstop():
    auth.update_user(request.form.get('uid'),disabled=True)
    return "hi"
@app.route('/userstar',methods=['POST'])
def userstar():
    auth.update_user(request.form.get('uid'),disabled=False)
    return "hi"
@app.route('/userdel',methods=['POST'])
def userdel():
    uid=request.form.get('uid')
    if request.form.get('pro')=="member":

        db.reference('Users/Protect').child(uid).set({})
        db.reference('Users/Private').child(uid).set({})
        user=firestore_db.document('user/member').get().to_dict()

        firestore_db.document('user/member/'+uid+'/personal_data').delete()
        firestore_db.document('userCustomFood/'+uid).delete()
        user['userid'].remove(uid)
        firestore_db.document('user/member').set(user)
        auth.delete_user(uid)
    else:
        
        pro=request.form.get('pro')
        user=firestore_db.document('user/'+pro).get().to_dict()
        firestore_db.document('user/'+pro+'/'+uid+'/personal_data').delete()
        firestore_db.document('userCustomFood/'+uid).delete()
        user['userid'].remove(uid)
        user=firestore_db.document('user/'+pro).set(user)
        auth.delete_user(uid)

    return "hi"

@app.route('/food')
@login_required 
def food():

    num={}
    #測試用python_data
    
    num={}
    with open ("store_name.json","r",encoding="utf-8") as f:
        data=json.load(f)
    for n in os.listdir('data'):
        with open(os.path.abspath('data/'+n),"r",encoding="utf-8") as f:
            food_data=json.load(f)
        st_num=0
        for a,k in food_data.items():
            st_num+=len(k)
        num[n.replace('.json','')]=st_num


    return render_template('food.html',data=data,num=num)
@app.route('/getstore', methods=['POST'])
def getstore():
    with open ("store_name.json","r",encoding="utf-8") as f:
        data=json.load(f)
    return jsonify(data)
@app.route('/food_list')
@login_required
def food_list():
    with open ("store_name.json","r",encoding="utf-8") as f:
        data=json.load(f)
        x=[n for n in data]
    return  render_template('store_list.html',data_name=data)
@app.route('/del_code', methods=['POST'])
def del_code():
    key=request.form.get("key")
    firestore_db.document('code/7-11/條碼資訊/'+key).delete()
    with open('code.json','r',encoding="utf-8")as f:
        code_data=json.load(f)
    c_d=code_data[key]
    del code_data[key]
    with open('code.json','w',encoding="utf-8")as f:
        json.dump(code_data,f)
    code_all=firestore_db.document('code/code_all').get().to_dict()
    if ('english' in c_d) and ('size_en' in c_d):
        try:
            del code_all['codeName_en'][c_d['english']+'-'+c_d['size_en']]
        except:
            pass
    del code_all['codeName_zh'][c_d['chinese']+'-'+c_d['size_zh']]

    firestore_db.document('code/code_all').set(code_all)
    return "v"

@app.route('/del_food', methods=['POST'])
def del_food():
    st_n='data/'+request.form.get("name")+'.json'
    f_type=diet[request.form.get("diet")]
    firestore_db.document('food/'+request.form.get("name")+'/'+f_type+'/'+request.form.get("key")).delete()
    
    with open(st_n,'r',encoding="utf-8")as f:
        food_data=json.load(f)
    fdata=food_data[f_type][request.form.get("key")]
    del food_data[f_type][request.form.get("key")]

    with open(st_n,'w',encoding="utf-8")as f:
        json.dump(food_data,f)

    food_all=firestore_db.document('food/food_all_zh').get().to_dict()
    food_all_en=firestore_db.document('food/food_all_en').get().to_dict()
    st_name_en_zh=st_name()

    if f_type=='eat':
        
        if 'english' in fdata and st_name_en_zh[request.form.get("name")]!="":

            del food_all_en["eatName_en"][fdata['english']+'-'+fdata['size_en']]
            firestore_db.document('food/food_all_en').set(food_all_en)


        del food_all["eatName_zh"][request.form.get("name")+'-'+request.form.get("n_size")]
        firestore_db.document('food/food_all_zh').set(food_all)

    else: 
        
        if 'english' in fdata and st_name_en_zh[request.form.get("name")]!="":
            
            del food_all_en["drinkName_en"][fdata['english']+'-'+fdata['size_en']]
            firestore_db.document('food/food_all_en').set(food_all_en)
            
        del food_all["drinkName_zh"][request.form.get("name")+'-'+request.form.get("n_size")]
        firestore_db.document('food/food_all_zh').set(food_all)
    return jsonify("yy")

@app.route('/newstore', methods=['POST'])
@login_required
def newstore():
    return render_template('newstore.html') 
def st_name():
    with open ("store_name.json","r",encoding="utf-8") as f:
            return json.load(f)

stroe_map={'店家中文名稱：':'store_chinese','店家英文名稱：':'store_english','食品中文名稱：':'chinese','食品英文名稱：':'english',
'熱量(kcal)：':'kcal','份量(中文)：':'size_zh','份量(英文)：':'size_en','蛋白質(g):':'protein','飽和脂肪(g):':'saturated',
'反式脂肪(g):':'trans','糖(g):':'sugar','碳水化合物(g):':'carbohydrate','鈉(mg):':'sodium'}
@app.route('/insert_food', methods=['POST'])
@login_required
def insert_food():

    if request.method=='POST':
        mess={'店家中文名稱：':request.form.get('store_name'),
            '店家英文名稱：':request.form.get('store_name_en'),
            '食品中文名稱：':request.form.get('name_zh'),
            '食品英文名稱：':request.form.get('name_en'),
            '熱量(kcal)：':request.form.get('kcal'),
            '份量(中文)：':request.form.get('size'),
            '蛋白質(g):':request.form.get('protein'),
            '飽和脂肪(g):':request.form.get('saturated'),
            '反式脂肪(g):':request.form.get('trans'),
            '糖(g):':request.form.get('sugar'),
            '碳水化合物(g):':request.form.get('carbohydrate'),
            '鈉(mg):':request.form.get('sodium')
            }
        if mess['店家英文名稱：']=="" or mess['店家英文名稱：']==None:
           mess['店家英文名稱：'] = translator.translate(mess['店家中文名稱：'], dest='en').text

        if mess['食品英文名稱：']=="":
            mess['食品英文名稱：'] = mess['店家英文名稱：']+"-"+translator.translate(mess['食品中文名稱：'], dest='en').text


        #取條列選擇值or手動輸入的值，接著改匯入資料庫
        if request.form.get('auto'):
            mess['份量(英文)：']=request.form.get('auto_size_en')
            print(request.form.get('auto_size_en'))
        else:
            mess['份量(英文)：']=request.form.get('man_size_en')
            print(request.form.get('man_size_en'))

        n={x:k for x,k in mess.items() if k!=""}
        
        with open ("store_name.json","r",encoding="utf-8") as f:
            food_data=json.load(f)
        
        if request.form.get('store_name') not in food_data:
            food_data[request.form.get('store_name')]=mess['店家英文名稱：']
            with open ("store_name.json","w",encoding="utf-8") as f:
                json.dump(food_data,f)
            with open("data/"+request.form.get('store_name')+".json","w",encoding="utf-8")as f:
                json.dump({},f)
            tw = pytz.timezone('Asia/Taipei')
            firestore_db.document('food/'+request.form.get('store_name')).set({"store_chinese":request.form.get('store_name'),
            "store_english":mess['店家英文名稱：'],"time":tw.localize(datetime.datetime.now())})
        
        """
        #elif 可以不要
        elif request.form.get('store_name') in food_data and food_data[request.form.get('store_name')]=="":
            food_data[request.form.get('store_name')]=request.form.get('store_name_en')
            with open ("store_name.json","w",encoding="utf-8") as f:
                json.dump(food_data,f)
            with open(request.form.get('store_name')+'.json','r',encoding="utf-8") as f:
                data=json.load(f)
            en_all__data=firestore_db.document('food/food_all_en').get()
            for x,k in data.items():
                for z,o in k.items():
                    if "english" in o.keys():
                        if "size_en" in o.keys():
                            en_all__data[request.form.get('store_name_en')+'-'+o["english"]+'-'+o["size_en"]]
            firestore_db.document('food/'+request.form.get('store_name')).set({"store_english":request.form.get('store_name_en')},merge=True)
        """
        
            
        n.pop('店家中文名稱：','')
        n.pop('店家英文名稱：','')
        

        #匯入資料庫
        x=firestore_db.collection('food/'+request.form.get('store_name')+"/"+request.form.get('type')).document().path
        print(x)
        st_data={stroe_map[x]:k for x,k in n.items() }
        st_data=num_info(st_data)
        st_data["unit"]={"份":1}
        st_data['chinese']=request.form.get('store_name')+'-'+st_data['chinese']
        firestore_db.document(x).set(st_data)
        #寫json
        print(st_data)
        
        with open("data/"+request.form.get('store_name')+".json","r",encoding="utf-8")as f:
                d=json.load(f)
        
        if request.form.get('type') in d:
            d[request.form.get('type')][x[x.rfind("/")+1:]]=st_data
        else:
            d[request.form.get('type')]={}
            d[request.form.get('type')][x[x.rfind("/")+1:]]=st_data
        
        with open("data/"+request.form.get('store_name')+".json","w",encoding="utf-8")as f:
                        json.dump(d,f)
        
        if request.form.get('type')=="eat":
            #匯入all資料庫
            eat_zh=firestore_db.document("food/food_all_zh").get().to_dict()
            eat_zh["eatName_zh"][request.form.get('store_name')+"-"+request.form.get('name_zh')+"-"+request.form.get('size')]=firestore_db.document(x)
            firestore_db.document("food/food_all_zh").set(eat_zh)

            if request.form.get('name_en')!="" and request.form.get('store_name_en')!="":
                eat_en=firestore_db.document("food/food_all_en").get().to_dict()
                eat_en["eatName_en"][request.form.get('store_name_en')+"-"+request.form.get('name_en')+"-"+mess['份量(英文)：']]=firestore_db.document(x)
                firestore_db.document("food/food_all_en").set(eat_en)
            
        else:
            drink_zh=firestore_db.document("food/food_all_zh").get().to_dict()
            drink_zh["drinkName_zh"][request.form.get('store_name')+"-"+request.form.get('name_zh')+"-"+request.form.get('size')]=firestore_db.document(x)
            firestore_db.document("food/food_all_zh").set(drink_zh)
            

            if request.form.get('name_en')!=""&request.form.get('store_name_en')!="":
                drink_en=firestore_db.document("food/food_all_en").get().to_dict()
                drink_en["drinkName_en"][request.form.get('store_name_en')+"-"+request.form.get('name_en')+"-"+mess['份量(英文)：']]=firestore_db.document(x)
                firestore_db.document("food/food_all_en").set(drink_en)
        
        return render_template('insert_food.html', data=n)#hi


@app.route('/food_store', methods=['POST'])
@login_required
def food_store():
    try:
        
        with open ("data/"+request.form.get('name')+".json","r",encoding="utf-8") as f:
            data=json.load(f)
        
        aa=data[diet[request.form.get('diet')]]

        b={k["chinese"][k["chinese"].find("-")+1:]+"-"+k["size_zh"]:i for i,k in aa.items()}


        return jsonify(b)
    except:
        return jsonify([])
@app.route('/reg_mail',methods=['POST'])
def reg_mail():
    mail=request.form['r_mail']
    manager_mail=[i.to_dict()["mail"] for i in firestore_db.collection("manager").get()]
    if mail not in manager_mail:
        return "OK"
    return "NO"


  

@app.route('/newfood',methods=['GET','POST'])
@login_required
def newfood():
    with open('store_name.json','r',encoding="utf-8")as f:
        d=json.load(f)
    return render_template('newfood.html',store_name=request.form.get('store_name'),en_name=d)


data_name={"BarCode":"Barcode","chinese":"食品中文名稱","english":"食品英文名稱","kcal":"熱量","size_zh":"份量(中文)","size_en":"份量(英文)",
    "protein":"蛋白質(g)","saturated":"飽和脂肪(g)","trans":"反式脂肪(g)","sugar":"糖(g)",
    "carbohydrate":"碳水化合物(g)","sodium":"鈉(mg)"}
@app.route('/revise_food',methods=['POST','GET'])
@login_required
def revise_food():
    diet={"吃":"eat","喝":"drink"}
    data_del=["size_zh","size_en"]
    
    with open ("data/"+request.args.get('b')+".json","r",encoding="utf-8") as f:
            data=json.load(f)
    food_data=data[diet[request.args.get('c')]][request.args.get('a')]
    unit=food_data['unit']
    del food_data['unit']
    food_data['chinese']=food_data['chinese'][food_data['chinese'].find('-')+1:]
    if 'english' in food_data:
        food_data['english']=food_data['english'][food_data['english'].find('-')+1:]
    
    return render_template('revise_food.html',d=food_data,name=data_name,store_name=request.args.get('b'),u=unit,de=data_del)
@app.route('/rev_code',methods=['POST'])
def rev_code():
    
    code_data={
            '食品中文名稱':request.form.get('chinese'),
            '食品英文名稱':request.form.get('english'),
            '熱量(kcal)':request.form.get('kcal'),
            '份量(中文)':request.form.get('size_zh'),
            '份量(英文)':request.form.get('size_en'),
            '蛋白質(g)':request.form.get('protein'),
            '飽和脂肪(g)':request.form.get('saturated'),
            '反式脂肪(g)':request.form.get('trans'),
            '糖(g)':request.form.get('sugar'),
            '鈉(mg)':request.form.get('sodium'),
            '碳水化合物(g)':request.form.get('carbohydrate')
            }
    incode_data={x:k for x,k in code_data.items() if k!=""}
    if request.form.get('BarCode') is None:
        incode_data['BarCode']=""
    else:
        incode_data['BarCode']=request.form.get('BarCode')
    code_path='code/7-11/條碼資訊/'+request.form.get('key')
    print(code_path)
    d={code_map[x]:k for x,k in incode_data.items()}
    d=num_info(d)
    d['unit']={"份":1}
    firestore_db.document(code_path).set(d)

    cd_all=firestore_db.document('code/code_all').get().to_dict()
    if request.form.get('def_chinese') and request.form.get('def_size_zh'):
        del cd_all["codeName_zh"][request.form.get('def_chinese')+'-'+request.form.get('def_size_zh')]
    elif request.form.get('def_chinese'):
        del cd_all["codeName_zh"][request.form.get('def_chinese')+'-'+request.form.get('size_zh')]

    if request.form.get('def_englsih') and request.form.get('def_size_en'):
        del cd_all["codeName_zh"][request.form.get('def_english')+'-'+request.form.get('def_size_en')]
    elif request.form.get('def_englsih') :
        del cd_all["codeName_zh"][request.form.get('def_english')+'-'+request.form.get('size_en')]
    
    cd_all["codeName_zh"][d['chinese']+'-'+d['size_zh']]=firestore_db.document(code_path)
        
    with open("code.json", "r", encoding="utf-8") as code:
        data=json.load(code)
    data[code_path[code_path.rfind('/')+1:]]=d

    with open("code.json", "w", encoding="utf-8") as code:
        json.dump(data,code)
    if "english" in d and "size_en" in d:
        cd_all["codeName_en"][d['english']+'-'+d['size_en']]=firestore_db.document(code_path)
    firestore_db.document('code/code_all').set(cd_all)
    print(d)
    return render_template('rev_code.html',data=d,cd=code_map)
@app.route('/revise_fper',methods=['POST'])
@login_required
def revise_fper():
    st_data={}
    revise_fdata={
            '食品中文名稱：':request.form.get('chinese'),
            '食品英文名稱：':request.form.get('english'),
            '熱量(kcal)：':request.form.get('kcal'),
            "份量(中文)：":request.form.get('size_zh'),
            "份量(英文)：":request.form.get('size_en'),
            '蛋白質(g):':request.form.get('protein'),
            '飽和脂肪(g):':request.form.get('saturated'),
            '反式脂肪(g):':request.form.get('trans'),
            '糖(g):':request.form.get('sugar'),
            '碳水化合物(g):':request.form.get('carbohydrate'),
            '鈉(mg):':request.form.get('sodium')
            }
    if revise_fdata['食品英文名稱：']=="":
        revise_fdata['食品英文名稱：']=translator.translate(revise_fdata['食品中文名稱：'], dest='en').text
    path='food/'+request.form.get('store_name')+'/'+request.form.get('type')+'/'+request.form.get('key')
    #取店家英文名稱
    with open ("store_name.json","r",encoding="utf-8") as f:
        st_en_name=json.load(f)
    st_en_name=st_en_name[request.form.get('store_name')]
    print(st_en_name)
    #寫資料庫

    rf_data={stroe_map[x]:k for x,k in revise_fdata.items() if k!=""}
    rf_data=num_info(rf_data)
    rf_data['unit']={"份":1}
    rf_data['chinese']=request.form.get('store_name')+'-'+rf_data['chinese']
    firestore_db.document(path).set(rf_data)
    with open('data/'+request.form.get('store_name')+'.json','r',encoding="utf-8")as f:
        store_data=json.load(f)
    store_data[request.form.get('type')][request.form.get('key')]=firestore_db.document(path).get().to_dict()

    with open('data/'+request.form.get('store_name')+'.json','w',encoding="utf-8")as f:
        json.dump(store_data,f)
    st_data={data_name[i]:k for i,k in store_data[request.form.get('type')][request.form.get('key')].items() if i!="unit"}

    if request.form.get('def_chinese'):
        p=request.form.get('store_name')+'-'+request.form.get('def_chinese')+'-'+request.form.get('size_zh')
        fa_zh_db=firestore_db.document("food/food_all_zh").get().to_dict()
        rf_refname=request.form.get('store_name')+'-'+request.form.get('chinese')+'-'+request.form.get('size_zh')
        
        if request.form.get('type')=="eat":
            
            del fa_zh_db["eatName_zh"][p]
            fa_zh_db["eatName_zh"][rf_refname]=firestore_db.document(path)
            firestore_db.document("food/food_all_zh").set(fa_zh_db)
            
        else:
            del fa_zh_db["drinkName_zh"][p]
            fa_zh_db["drinkName_zh"][rf_refname]=firestore_db.document(path)
            firestore_db.document("food/food_all_zh").set(fa_zh_db)
    
    if request.form.get('def_english'):
        if st_en_name!="":
            p=st_en_name+'-'+request.form.get('def_english')+'-'+request.form.get('size_en')
            fa_en_db=firestore_db.document("food/food_all_en").get().to_dict()
            rf_refname=st_en_name+'-'+request.form.get('englsih')+'-'+request.form.get('size_en')

            if request.form.get('type')=="eat":
            
                del fa_en_db["eatName_en"][p]
                fa_en_db["eatName_en"][rf_refname]=firestore_db.document(path)
                firestore_db.document("food/food_all_en").set(fa_en_db)
                
            else:
                del fa_en_db["drinkName_en"][p]
                fa_en_db["drinkName_en"][rf_refname]=firestore_db.document(path)
                firestore_db.document("food/food_all_en").set(fa_en_db)




    """
    #刪除?
    else:
        #沒有更改名稱，有更改資料
        if request.form.get('type')=="drink":
            with open('data/'+request.form.get('store_name')+'.json','r',encoding="utf-8")as f:
                store_data=json.load(f)
    """         

    return render_template('revise_fper.html',data=st_data,da_na=data_name)#,data=revise_fdata
#整合code
@app.route('/newcode')
@login_required
def newcode():
    return flask.render_template('newcode.html')




code_map={'BarCode':'BarCode',"食品中文名稱":"chinese","食品英文名稱":"english",
"份量(中文)":"size_zh","份量(英文)":"size_en","熱量(kcal)":"kcal",
    "蛋白質(g)":"protein","飽和脂肪(g)":"saturated",
    "反式脂肪(g)":"trans","糖(g)":"sugar","碳水化合物(g)":"carbohydrate","鈉(mg)":"sodium"}
@app.route('/insert_code', methods=['POST'])
def insert_code():
    if request.method=='POST':
        code_data={
            '食品中文名稱':request.form.get('name_zh'),
            '食品英文名稱':request.form.get('name_en'),
            '熱量(kcal)':request.form.get('kcal'),
            '份量(中文)':request.form.get('size_zh'),
            '份量(英文)':request.form.get('size_en'),
            '蛋白質(g)':request.form.get('protein'),
            '飽和脂肪(g)':request.form.get('saturated'),
            '反式脂肪(g)':request.form.get('trans'),
            '糖(g)':request.form.get('sugar'),
            '鈉(mg)':request.form.get('sodium'),
            '碳水化合物(g)':request.form.get('carbohydrate')
            }
        print(type(code_data['熱量(kcal)']))
        incode_data={x:k for x,k in code_data.items() if k!=""}
        if request.form.get('barcode') is None:
            incode_data['BarCode']=""
        else:
            incode_data['BarCode']=request.form.get('barcode')

        code_path=firestore_db.collection('code/7-11/條碼資訊').document().path
        d={code_map[x]:k for x,k in incode_data.items()}
        #寫成def
        d=num_info(d)
        
        d['unit']={'份':1}

        firestore_db.document(code_path).set(d)

        cd_all=firestore_db.document('code/code_all').get().to_dict()
        cd_all["codeName_zh"][d['chinese']+'-'+d['size_zh']]=firestore_db.document(code_path)
        
        with open("code.json", "r", encoding="utf-8") as code:
            data=json.load(code)
        data[code_path[code_path.rfind('/')+1:]]=d

        with open("code.json", "w", encoding="utf-8") as code:
            json.dump(data,code)
        if "english" in d and "size_en" in d:
            cd_all["codeName_en"][d['english']+'-'+d['size_en']]=firestore_db.document(code_path)
        firestore_db.document('code/code_all').set(cd_all)

        return flask.render_template('insert_code.html', data=incode_data,cd=code_map)

@app.route('/fd_code',methods=["GET"])
def fd_code():
    with open("code.json", "r", encoding="utf-8") as code:
        data=json.load(code)
    return render_template('fd_code.html', data=data)
@app.route('/fix_code')
def fix_code():
    with open('code.json','r',encoding="utf-8") as f:
        data=json.load(f)[request.values.get('key')]
    return flask.render_template('fix_code.html',d=data,cd_zh=data_name)

@app.route('/revise',methods=['POST','GET'])
@login_required
def revise():
    return str(request.form.get('d'))

#搜尋方法
def search_data(name_class,search_text,name=None,d=None):
    
    text=search_text.split(" ")
    text_char=[n for x in text for n in x]
    #print(text)
    try:
        if name_class=="food":
            with open ("data/"+name+".json","r",encoding="utf-8") as f:
                
                
                data=json.load(f)
                print(data)
                food_data=data[diet[d]]
                food_res={k["chinese"][k["chinese"].find("-")+1:]+'-'+k['size_zh']:x for i in text_char for x,k in food_data.items() if k["chinese"][k["chinese"].find("-")+1:].find(i)!=-1}
                return food_res
        if name_class=="recipe":

            #食譜json路徑要改
            print(text)
            with open('recipe/lowkcal.json','r',encoding='utf-8') as f:
                recipe_data=json.load(f)
                
                if text[0]=="":
                    return {k['chinese']:x for x,k in recipe_data.items()}
                recipe_res={k['chinese']:x for i in text_char for x,k in recipe_data.items() if k['chinese'].find(i)!=-1}
                
                return recipe_res
        if name_class=="code":
            #code json檔要改
            with open('code.json','r',encoding='utf-8') as f:
                code_data=json.load(f)
                code_res={x:{'chinese':k['chinese'],'BarCode':k['BarCode']} for i in text_char for x,k in code_data.items() if k['chinese'].find(i)!=-1}
                return code_res
    except KeyError:
        return []


@app.route('/search',methods=['POST'])
@login_required
def search():
    n_class=request.form.get('name_class')
    if n_class=="food":
        print(request.form.get('name'))
        data=search_data(n_class,request.form.get('text'),request.form.get('name'),request.form.get('diet'))
        return jsonify(data)
    if n_class=="recipe":
        data=search_data(n_class,request.form.get('text'))
        return jsonify(data)
    if n_class=="code":
        data=search_data(n_class,request.form.get('text'))
        return jsonify(data)
    

@app.route('/newrecipe')
@login_required
def newrecipe():
    return render_template('newrecipe.html')


@app.route('/getsize',methods=["POST"])
@login_required
def getsize():
    if request.form.get('size_type')=='drink':
        with open('size_drink.json','r',encoding='utf-8') as f:
            data=json.load(f)
        return data
    if request.form.get('size_type')=='eat':
        with open('size_eat.json','r',encoding='utf-8') as f:
            data=json.load(f)
        return data    

seafood = ['魚', '蝦', '螃蟹', '蛤蜊', '海鮮', '鰻魚', '蚌蛤', '貽貝', '牡蠣', '魷魚', '烏賊', '章魚', '扇貝']
egg = ['蛋']
milk = ['牛奶']
nuts = ['花生', '腰果', '黃豆', '小麥', '綠豆']
honey = ['蜂蜜']
@app.route('/recipe',methods=["POST"])
@login_required
def recipe():
    img_dir="recipe/lowkcal/"
    global recipe
    recipe={}

    ing={}
    step=[]
    ran_name=str(random.randint(1,100))
    if len(ran_name)<3:
        ran_name=ran_name.rjust(3,"0")
    if "img" in request.files:
        f=request.files["img"].filename
        f_type=f[f.find('.'):]
        path=datetime.datetime.now().strftime("%Y%m%d%H%M%S")+"-"+ran_name+f_type
        storage.child(img_dir+path).put(request.files["img"])
        url=storage.child(img_dir+path).get_url(None)
        recipe['url']=url
        recipe['path']=img_dir+path
    else:
        recipe['url']=""
        recipe['path']=""
    for s in json.loads(request.form.get("step")) :
        step.append(s)
    for i,k in json.loads(request.form.get("ing")).items():
        ing[i]=k
    
    recipe["step"]=step
    recipe["ingredients"]=ing
    recipe["chinese"]=request.form.get('chinese')
    recipe["english"]=request.form.get('english')
    db_path=firestore_db.collection('recipe/低卡/食譜名稱').document().path

    firestore_db.document(db_path).set(recipe)
    with open('recipe/lowkcal.json','r',encoding="utf-8") as f:
        recipe_data=json.load(f)
    recipe_data[db_path[db_path.rfind('/')+1:]]=recipe
    with open('recipe/lowkcal.json','w',encoding="utf-8") as f:
        json.dump(recipe_data,f)
    
    
    recipe_all=firestore_db.document('recipe/recipe_all').get().to_dict()
    recipe_all["recipeName_zh"][recipe["chinese"]]=firestore_db.document(db_path)
    if recipe["english"]!="":
        recipe_all["recipeName_en"][recipe["english"]]=firestore_db.document(db_path)
    #分類
    for i in json.loads(request.form.get("ing")):
        if i in seafood:
            recipe_all["recipeName_seafood_zh"][recipe["chinese"]]=firestore_db.document(db_path)
            if recipe["english"]!="":
                recipe_all["recipeName_seafood_en"][recipe["english"]]=firestore_db.document(db_path)
        if i in egg:
            recipe_all["recipeName_egg_zh"][recipe["chinese"]]=firestore_db.document(db_path)
            if recipe["english"]!="":
                recipe_all["recipeName_egg_en"][recipe["english"]]=firestore_db.document(db_path)
        if i in milk:
            recipe_all["recipeName_milk_zh"][recipe["chinese"]]=firestore_db.document(db_path)
            if recipe["english"]!="":
                recipe_all["recipeName_milk_en"][recipe["english"]]=firestore_db.document(db_path)
        if i in nuts:
            recipe_all["recipeName_nuts_zh"][recipe["chinese"]]=firestore_db.document(db_path)
            if recipe["english"]!="":
                recipe_all["recipeName_nuts_en"][recipe["english"]]=firestore_db.document(db_path)
        if i in honey:
            recipe_all["recipeName_honey_zh"][recipe["chinese"]]=firestore_db.document(db_path)
            if recipe["english"]!="":
                recipe_all["recipeName_honey_en"][recipe["english"]]=firestore_db.document(db_path)

    firestore_db.document('recipe/recipe_all').set(recipe_all)

    return recipe
recipe_map={"chinese":"食譜名稱","english":"食譜英文名稱","url":"圖片","ingredients":"食材","step":"步驟"}

@app.route('/recipe_rev',methods=["POST"])
def recipe_rev():
    img_dir="recipe/lowkcal/"
    global recipe
    recipe={}
    ing={}
    step=[]
    

    ran_name=str(random.randint(1,100))
    if len(ran_name)<3:
        ran_name=ran_name.rjust(3,"0")
    if "img" in request.files:
        f=request.files["img"].filename
        f_type=f[f.find('.'):]
        path=datetime.datetime.now().strftime("%Y%m%d%H%M%S")+"-"+ran_name+f_type
        storage.child(img_dir+path).put(request.files["img"])
        url=storage.child(img_dir+path).get_url(None)
        recipe['url']=url
        recipe['path']=img_dir+path
    for s in json.loads(request.form.get("step")) :
        step.append(s)
    for i,k in json.loads(request.form.get("ing")).items():
        ing[i]=k
    recipe["step"]=step
    recipe["ingredients"]=ing
    recipe["chinese"]=request.form.get('chinese')
    recipe["english"]=request.form.get('english')

    path='recipe/低卡/食譜名稱/'+request.form.get('key')
    firestore_db.document(path).set(recipe,merge=True)


    with open('recipe/lowkcal.json','r',encoding="utf-8") as f:
        recipe_data=json.load(f)
    if request.form.get('def_path')!="undefined":
        blob=bucket.blob(recipe_data[request.form.get('key')]['path'])
        blob.delete()

    recipe_data[request.form.get('key')]=recipe
    print(recipe)
    with open('recipe/lowkcal.json','w',encoding="utf-8") as f:
        json.dump(recipe_data,f)
    recipe_all=firestore_db.document('recipe/recipe_all').get().to_dict()
    recipe_all["recipeName_zh"][recipe["chinese"]]=firestore_db.document(path)
    if recipe["english"]!="":
        recipe_all["recipeName_en"][recipe["english"]]=firestore_db.document(path)
    if request.form.get("def_chinese"):
        if request.form.get("def_chinese") in recipe_all["recipeName_seafood_zh"]:
            del recipe_all["recipeName_seafood_zh"][request.form.get("def_chinese")]
        if request.form.get("def_chinese") in recipe_all["recipeName_egg_zh"]:
            del recipe_all["recipeName_egg_zh"][request.form.get("def_chinese")]
        if request.form.get("def_chinese") in recipe_all["recipeName_milk_zh"]:
            del recipe_all["recipeName_milk_zh"][request.form.get("def_chinese")]
        if request.form.get("def_chinese") in recipe_all["recipeName_nuts_zh"]:
            del recipe_all["recipeName_nuts_zh"][request.form.get("def_chinese")]
        if request.form.get("def_chinese") in recipe_all["recipeName_honey_zh"]:
            del recipe_all["recipeName_honey_zh"][request.form.get("def_chinese")]
    if request.form.get("def_english"):
        if request.form.get("def_english") in recipe_all["recipeName_seafood_en"]:
            del recipe_all["recipeName_seafood_en"][request.form.get("def_english")]
        if request.form.get("def_english") in recipe_all["recipeName_egg_en"]:
            del recipe_all["recipeName_egg_en"][request.form.get("def_english")]
        if request.form.get("def_english") in recipe_all["recipeName_milk_enh"]:
            del recipe_all["recipeName_milk_en"][request.form.get("def_english")]
        if request.form.get("def_english") in recipe_all["recipeName_nuts_en"]:
            del recipe_all["recipeName_nuts_en"][request.form.get("def_english")]
        if request.form.get("def_english") in recipe_all["recipeName_honey_en"]:
            del recipe_all["recipeName_honey_en"][request.form.get("def_english")]
    #分類
    for i in json.loads(request.form.get("ing")):
        if i in seafood:
            recipe_all["recipeName_seafood_zh"][recipe["chinese"]]=firestore_db.document(path)
            if recipe["english"]!="":
                recipe_all["recipeName_seafood_en"][recipe["english"]]=firestore_db.document(path)
        if i in egg:
            recipe_all["recipeName_egg_zh"][recipe["chinese"]]=firestore_db.document(path)
            if recipe["english"]!="":
                recipe_all["recipeName_egg_en"][recipe["english"]]=firestore_db.document(path)
        if i in milk:
            recipe_all["recipeName_milk_zh"][recipe["chinese"]]=firestore_db.document(path)
            if recipe["english"]!="":
                recipe_all["recipeName_milk_en"][recipe["english"]]=firestore_db.document(path)
        if i in nuts:
            recipe_all["recipeName_nuts_zh"][recipe["chinese"]]=firestore_db.document(path)
            if recipe["english"]!="":
                recipe_all["recipeName_nuts_en"][recipe["english"]]=firestore_db.document(path)
        if i in honey:
            recipe_all["recipeName_honey_zh"][recipe["chinese"]]=firestore_db.document(path)
            if recipe["english"]!="":
                recipe_all["recipeName_honey_en"][recipe["english"]]=firestore_db.document(path)
    firestore_db.document('recipe/recipe_all').set(recipe_all)
    recipe=firestore_db.document(path).get().to_dict()

    return "hi"
@app.route('/reciperev')
def reciperev():
    return render_template('revrecipe.html',data=recipe,re=recipe_map)
@app.route('/insert_recipe',methods=['POST','GET'])
@login_required
def insert_recipe():
    return render_template('insert_recipe.html',data=recipe,re=recipe_map)



@app.route('/del_recipe',methods=['POST'])
def del_recipe():


    firestore_db.document('recipe/低卡/食譜名稱/'+request.form.get('key')).delete()
    with open('recipe/lowkcal.json','r',encoding='utf-8') as f:
        data=json.load(f)
    if data[request.form.get('key')]['path']!='' or data[request.form.get('key')]['path']!=None:
        blob=bucket.blob(data[request.form.get('key')]['path'])
        blob.delete()
        #storage.child(data[request.form.get('key')]['path']).delete()
    
    name=data[request.form.get('key')]['chinese']
    en_name=data[request.form.get('key')]['english']
    data_all=firestore_db.document('recipe/recipe_all').get().to_dict()
    del data_all["recipeName_zh"][name]
    if en_name in data_all["recipeName_en"]:
        del data_all["recipeName_en"][en_name]
    #seafood egg milk nuts  honey 
    #中文
    if name in data_all["recipeName_seafood_zh"]:
        del data_all["recipeName_seafood_zh"][name]
    if name in data_all["recipeName_egg_zh"]:
        del data_all["recipeName_egg_zh"][name]
    if name in data_all["recipeName_milk_zh"]:
        del data_all["recipeName_milk_zh"][name]
    if name in data_all["recipeName_nuts_zh"]:
        del data_all["recipeName_nuts_zh"][name]
    if name in data_all["recipeName_honey_zh"]:
        del data_all["recipeName_honey_zh"][name]
    
    #英文
    if en_name in data_all["recipeName_seafood_en"]:
        del data_all["recipeName_seafood_en"][en_name]
    if en_name in data_all["recipeName_egg_en"]:
        del data_all["recipeName_egg_en"][en_name]
    if en_name in data_all["recipeName_milk_en"]:
        del data_all["recipeName_milk_en"][en_name]
    if en_name in data_all["recipeName_nuts_en"]:
        del data_all["recipeName_nuts_en"][en_name]
    if en_name in data_all["recipeName_honey_en"]:
        del data_all["recipeName_honey_en"][en_name]

    del data[request.form.get('key')]
    firestore_db.document('recipe/recipe_all').set(data_all)
    with open('recipe/lowkcal.json','w',encoding='utf-8') as f:
        json.dump(data,f)
    return "h"
@app.route('/rev_recipe',methods=['POST','GET'])
@login_required
def rev_recipe():
    with open('recipe/lowkcal.json','r',encoding='utf-8') as f:
        data=json.load(f)
    name=request.args.get('key')
    return render_template('rev_recipe.html',data=data[name],rec=recipe_data,len=len(data[name]['step']))




@app.route('/search_recipe')
@login_required
def search_recipe():
    with open('recipe/lowkcal.json','r',encoding='utf-8') as f:
        data=json.load(f)
    return render_template("search_recipe.html",data=data)


@app.route('/logout')
#@login_required
def logout():
    global u_type
    u_type=True
    logout_user()
    print(session.get('userid'))
    return render_template('logout.html')

def on_snapshot(col_snapshot, changes, read_time):
    
    a={}    
    for change in changes:
        """
        if change.type.name == 'ADDED':
            print(f'New: {change.document.id}')
        elif change.type.name == 'MODIFIED':
            print(f'Modified: {change.document.id}')
        elif change.type.name == 'REMOVED':
            print(f'Removed: {change.document.id}')
        """
        for  i in firestore_db.collection(u'userCustomFood').get():
            a[i.id]=i.to_dict()
    
    with open("user_food.json","w",encoding="utf-8")as f:
        json.dump(a, f)
            

col_query = firestore_db.collection(u'userCustomFood')

# Watch the collection query
query_watch = col_query.on_snapshot(on_snapshot)

def getdata(name):
    v=[]
    with open('user_food.json','r')as f:
        a=json.load(f)
    for key,val in a.items():
        n=0
        for x in val:
            if x==name:
                for b in val[x]:
                    if b['tag']==False:
                        b['userID']=key
                        b['list_num']=n
                        v.append(b)
                    n+=1
    return v
ad_name={"barCode":"Barcode","chinese":"食品中文名稱","english":"食品英文名稱","kcal":"熱量","size_zh":"份量(中文)","size_en":"份量(英文)",
    "protein":"蛋白質(g)","saturated":"飽和脂肪(g)","trans":"反式脂肪(g)","sugar":"糖(g)",
    "carbohydrate":"碳水化合物(g)","sodium":"鈉(mg)"}
@app.route('/adit',methods=['GET'])
def adit():
    if request.values.get('type')=="食品審核":
        return redirect(url_for('getadit',t='eat'))
    if request.values.get('type')=="飲品審核":
        return redirect(url_for('getadit',t='drink'))
    if request.values.get('type')=="條碼審核":
        return redirect(url_for('getadit',t='code'))
    if request.values.get('type')=="水果審核":
        return redirect(url_for('getadit',t='fruit'))


@app.route('/adit<t>')
def getadit(t):
    data=getdata(t)
    page=1
    pre=3
    num=len(data)
    total_page=math.ceil(num/pre)
    star=(page-1)*pre
    #page = request.args.get(get_page_parameter(), type=int, default=1)

    
    pagination =Pagination(page=page, per_page=pre,total=len(data))

    if request.args.get('page'):
        return render_template('adit.html',n=t,data=data,n_view=['chinese','userID','tag','list_num'],total=total_page,page=int(request.args.get('page')),pagination=pagination,d_n=ad_name)
    return render_template('adit.html',n=t,data=data,n_view=['chinese','userID','tag','list_num'],pagination=pagination,page=1,d_n=ad_name)

@app.route('/adit_no',methods=['POST'])
def adit_ch():
    data=json.loads(request.form.get('d'))
    if request.form.get('type')=="eat":
        for i in data:
            for x,k in i.items():
                if x!="chinese": 
                    eat_data=firestore_db.document('userCustomFood/'+x).get().to_dict()
                    eat_data["eat"][i[x]]['tag']=True
                    #放資料庫
                    firestore_db.document('userCustomFood/'+x).set(eat_data)
    elif request.form.get('type')=="drink":
        for i in data:
            for x,k in i.items():
                if x!="chinese": 
                    drink_data=firestore_db.document('userCustomFood/'+x).get().to_dict()
                    drink_data["drink"][i[x]]['tag']=True
                    #放資料庫
                    firestore_db.document('userCustomFood/'+x).set(drink_data)

    return "tt"
@app.route('/getadit_re',methods=['POST'])
def getadit_re():
    
    data=json.loads(request.form.get('d'))
    if request.form.get('type')=="eat":
        for i in data:
            for x,k in i.items():
                if x!="chinese": 
                    eat_data=firestore_db.document('userCustomFood/'+x).get().to_dict()
                    eat_data["eat"][i[x]]['tag']=True
                    #放資料庫
                    firestore_db.document('userCustomFood/'+x).set(eat_data)
                    newdata=eat_data["eat"][i[x]]
                    if i["chinese"]!=eat_data["eat"][i[x]]["chinese"]:
                        newdata["chinese"]=i["chinese"]
                    stname=newdata["chinese"][:newdata["chinese"].find('-')]
                    stname_en=newdata["english"][:newdata["english"].find('-')]
                    if firestore_db.document('food/'+stname).get().to_dict()==None:
                        firestore_db.document('food/'+stname).set({'store_chinese':stname,'store_english':stname_en})
                    del newdata['tag']
                    del newdata['foodType']
                    new_data={key:val for key,val in newdata.items() if val!=None}
                    path=firestore_db.collection('food/'+stname+'/eat').document().path     
                    firestore_db.document(path).set(new_data)
                    en_all=firestore_db.document('food/food_all_en').get().to_dict()
                    zh_all=firestore_db.document('food/food_all_zh').get().to_dict()
                    en_all['eatName_en'][new_data["english"]+'-'+new_data["size_en"]]=firestore_db.document(path)
                    zh_all['eatName_zh'][new_data["chinese"]+'-'+new_data["size_zh"]]=firestore_db.document(path)
                    firestore_db.document('food/food_all_en').set(en_all)
                    firestore_db.document('food/food_all_zh').set(zh_all)
                    with open('store_name.json','r',encoding="utf-8")as f:
                        a=json.load(f)
                    if stname not in a:
                        a[stname]=stname_en
                        with open('store_name.json','w',encoding="utf-8")as f:
                            json.dump(a,f)
                    try:
                        with open(stname+'.json','r',encoding="utf-8")as f:
                            st_d=json.load(f)
                        st_d['eat'][path[path.rfind('/')+1:]]=new_data
                        with open(stname+'.json','w',encoding="utf-8")as f:
                            json.dump(st_d,f)
                    except:
                        with open(stname+'.json','w',encoding="utf-8")as f:
                            json.dump({'eat':{path[path.rfind('/')+1:]:new_data}},f)

                    return "OK"
    elif request.form.get('type')=="drink":
        for i in data:
            for x,k in i.items():
                if x!="chinese": 
                    drink_data=firestore_db.document('userCustomFood/'+x).get().to_dict()
                    drink_data["drink"][i[x]]['tag']=True
                    #放資料庫
                    firestore_db.document('userCustomFood/'+x).set(drink_data)
                    newdata=drink_data["drink"][i[x]]
                    if i["chinese"]!=drink_data["drink"][i[x]]["chinese"]:
                        
                        newdata["chinese"]=i["chinese"]
                    stname=newdata["chinese"][:newdata["chinese"].find('-')]
                    stname_en=newdata["english"][:newdata["english"].find('-')]
                    if firestore_db.document('food/'+stname).get().to_dict()==None:
                        firestore_db.document('food/'+stname).set({'store_chinese':stname,'store_english':stname_en})
                    del newdata['tag']
                    del newdata['foodType']
                    new_data={key:val for key,val in newdata.items() if val!=None}
                    path=firestore_db.collection('food/'+stname+'/drink').document().path
                    firestore_db.document(path).set(new_data)
                    en_all=firestore_db.document('food/food_all_en').get().to_dict()
                    zh_all=firestore_db.document('food/food_all_zh').get().to_dict()
                    en_all['drinkName_en'][new_data["english"]+'-'+new_data["size_en"]]=firestore_db.document(path)
                    zh_all['drinkName_zh'][new_data["chinese"]+'-'+new_data["size_zh"]]=firestore_db.document(path)
                    firestore_db.document('food/food_all_en').set(en_all)
                    firestore_db.document('food/food_all_zh').set(zh_all)
                    with open('store_name.json','r',encoding="utf-8")as f:
                        a=json.load(f)
                    if stname not in a:
                        a[stname]=stname_en
                        with open('store_name.json','w',encoding="utf-8")as f:
                            json.dump(a,f)
                    try:
                        with open(stname+'.json','r',encoding="utf-8")as f:
                            st_d=json.load(f)
                        st_d['drink'][path[path.rfind('/')+1:]]=new_data
                        with open(stname+'.json','w',encoding="utf-8")as f:
                            json.dump(st_d,f)
                    except:
                        with open(stname+'.json','w',encoding="utf-8")as f:
                            json.dump({'drink':{path[path.rfind('/')+1:]:new_data}},f)
                    return "OK"                   
    elif request.form.get('type')=="code":
        for i in data:
            for x,k in i.items():
                if x!="chinese": 
                    code_data=firestore_db.document('userCustomFood/'+x).get().to_dict()
                    code_data["code"][i[x]]['tag']=True
                    firestore_db.document('userCustomFood/'+x).set(code_data)
                    newdata=code_data["code"][i[x]]
                    if i["chinese"]!=code_data["code"][i[x]]["chinese"]:
                        newdata["chinese"]=i["chinese"]
                    del newdata['tag']
                    del newdata['foodType']
                    new_data={key:val for key,val in newdata.items() if val!=None}
                    path=firestore_db.collection('code/7-11/條碼資訊').document().path
                    firestore_db.document(path).set(new_data) 
                    code_all=firestore_db.document('code/code_all').get().to_dict()
                    code_all['codeName_en'][new_data["english"]+'-'+new_data["size_en"]]=firestore_db.document(path)
                    code_all['codeName_zh'][new_data["chinese"]+'-'+new_data["size_zh"]]=firestore_db.document(path)
                    firestore_db.document('food/food_all_en').set(code_all)
                    with open('code.json','r',encoding="utf-8")as f:
                        code_d=json.load(f)
                        code_d[path[path.rfind('/')+1:]]=new_data
                    with open('code.json','w',encoding="utf-8")as f:
                            json.dump(code_d,f)
                    return "OK"                  

    elif request.form.get('type')=="fruit":
        for i in data:
            for x,k in i.items():
                if x!="chinese":
                    fruit_data=firestore_db.document('userCustomFood/'+x).get().to_dict()
                    fruit_data["fruit"][i[x]]['tag']=True
                    firestore_db.document('userCustomFood/'+x).set(fruit_data)
                    newdata=fruit_data["fruit"][i[x]]
                    if i["chinese"]!=fruit_data["fruit"][i[x]]["chinese"]:
                        newdata["chinese"]=i["chinese"]
                    del newdata['tag']
                    del newdata['foodType']
                    new_data={key:val for key,val in newdata.items() if val!=None}
                    path='fruit/'+newdata["chinese"]+'/單位/'+newdata["chinese"]+"-"+newdata["size_zh"]
                    firestore_db.document(path).set(new_data)
                    firestore_db.document('fruit/fruit_all').update({newdata["english"]:newdata["chinese"]})
        return "OK"
    return "OK"

if __name__=='__main__':
    app.run('120.110.7.178',debug=True,port='8000') #120.110.7.178
