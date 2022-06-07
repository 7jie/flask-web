import re
from flask import Flask,request,session,url_for,redirect,json,jsonify,render_template,flash
import os,flask
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
cred = credentials.Certificate("topic.json")#自己的json路徑
firebase_admin.initialize_app(cred)
db = firestore.client()


firebaseConfig = {
     "databaseURL":"https://topic.firebaseio.com",#python要改成自己的專案名稱
     "apiKey": "AIzaSyAk2Sp6_oP4o1Q1_wOtgOlIKpdaVemoqEI",
     "authDomain": "topic-3b33d.firebaseapp.com",
     "projectId": "topic-3b33d",
     "storageBucket": "topic-3b33d.appspot.com",
     "messagingSenderId": "536031508017",
     "appId": "1:536031508017:web:f51954c5819d6923b98710",
     "measurementId": "G-20ZX53K4QD"
    }
firebase=pyrebase.initialize_app(firebaseConfig)
storage = firebase.storage()

app=Flask(__name__)
app.secret_key= 'fgdgedsfw1g6613wg16w15615a1f2d3dvw9894wevebhkjlbghtrh'
diet={"吃":"eat","喝":"drink"}
recipe_data=["chinese","english","url","path","ingredients","step"]

login_manager = LoginManager()
login_manager.init_app(app)
#login_manager = LoginManager(app)
login_manager.login_view = 'login'

class User(UserMixin):
    pass

@login_manager.user_loader
def user_loader(u):
    if u not in [i.to_dict()["mail"] for i in db.collection("manager").get()]:
        return

    user = User()
    user.id = u
    return user

@app.route('/',methods=['GET','POST'])
def login():
    #return  redirect(url_for('index',name={"hi":{"no":"QQ"}}))
    print(current_user.is_authenticated)  
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    return render_template('home.html') 

@app.route('/login_test',methods=['GET','POST'])
def login_test():
    user = User()
    user.id = request.values.get('mail')
    login_user(user)
    user.id = request.values.get('mail')
    return redirect(url_for('index'))

@app.route('/reg_manager',methods=['GET','POST'])
def reg_manager():
    db.collection("manager").document().set({'mail':request.values.get('mail')})
    user = User()
    user.id = request.values.get('mail')
    login_user(user)
    user.id = request.values.get('mail')
    return redirect(url_for('index'))
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
    manager_mail=[i.to_dict()["mail"] for i in db.collection("manager").get()]
    if request.form.get("mail") in manager_mail:
        return "OK"
    return "NO"

@app.route('/newpass',methods=['GET'])
def newpass():
    return render_template('newpass.html')

@app.route('/index',methods=['GET','POST']) #'/index/<name>' ,傳參數
@login_required
def index(): #index(name)
    #return  '{}'.format(name)
    return  render_template('account.html')
 
@app.route('/food')
@login_required 
def food():
    """
    data=[]
    stores=db.collection("food").get()
    for store in stores:
        data.append(store.id)
    """
    with open ("food_store.json","r",encoding="utf-8") as f:
        data=json.load(f)
    
    return render_template('food.html',data=data)

@app.route('/food_list')
@login_required
def food_list():
    with open ("food_store.json","r",encoding="utf-8") as f:
        data=json.load(f)
    return  render_template('store_list.html',data_name=data)


@app.route('/newstore', methods=['POST'])
@login_required
def newstore():
    return render_template('newstore.html') 


@app.route('/insert_food', methods=['POST'])
@login_required
def insert_food():
    if request.method=='POST':
        mess={'店家名稱：':request.form.get('store_name'),
            '食品中文名稱：':request.form.get('name_zh'),
            '熱量：':request.form.get('kcal'),
            '份量：':request.form.get('size')
            }
        return render_template('insert_food.html', data=mess)


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
    manager_mail=[i.to_dict()["mail"] for i in db.collection("manager").get()]
    if mail not in manager_mail:
        return "OK"
    return "NO"


@app.route('/insert_food_store', methods=['POST'])
@login_required
def insert_food_store():
    if request.method=='POST':
        store_mess={
            '食品中文名稱：':request.form.get('name_zh'),
            '熱量：':request.form.get('kcal')
            }
        return render_template('insert_food.html', data=store_mess)        

@app.route('/insert_food_mess',methods=['POST'])
@login_required
def insert_food_mess():
    return render_template('store_food.html',store_name=request.form.get('store_name'))



@app.route('/revise_food',methods=['POST','GET'])
@login_required
def revise_food():
    diet={"吃":"eat","喝":"drink"}
    data_del=["size_zh","size_en"]
    data_name={"chinese":"食品中文名稱","english":"食品英文名稱","size_zh":"份量(中文)","size_en":"份量(英文)","kcal":"熱量",
    "protein":"蛋白質(g)","saturated":"飽和脂肪(g)","trans":"反式脂肪(g)","sugar":"糖值總量(g)","sodium":"鈉(mg)","carbohydrate":"碳水化合物(g)"}
    with open ("data/"+request.args.get('b')+".json","r",encoding="utf-8") as f:
            data=json.load(f)
    food_data=data[diet[request.args.get('c')]][request.args.get('a')]
    unit=food_data['unit']
    del food_data['unit']
    food_data['chinese']=food_data['chinese'][food_data['chinese'].find('-')+1:food_data['chinese'].rfind('(')]
    food_data['english']=food_data['english'][food_data['english'].find('-')+1:food_data['english'].rfind('(')]
    return render_template('revise_food.html',d=food_data,name=data_name,store_name=request.args.get('b'),u=unit,de=data_del)


@app.route('/revise',methods=['POST','GET'])
@login_required
def revise():
    return str(request.form.get('d'))

#搜尋方法
def search_data(name_class,search_text,name=None,d=None):
    """
    if name!=None & d!=None:
        with open ("data/"+name+".json","r",encoding="utf-8") as f:
                data=json.load(f)
                food_data=data[diet[d]]
                food_res={k["chinese"][k["chinese"].find("-")+1:]:x for i in text for x,k in food_data.items() if k["chinese"][k["chinese"].find("-")+1:].find(i)!=-1}
                return food_res
    """
    text=search_text.split(" ")
    print(text)
    try:
        if name_class=="food":
            with open ("data/"+name+".json","r",encoding="utf-8") as f:
                data=json.load(f)
                food_data=data[diet[d]]
                food_res={k["chinese"][k["chinese"].find("-")+1:]:x for i in text for x,k in food_data.items() if k["chinese"][k["chinese"].find("-")+1:].find(i)!=-1}
                return food_res
        if name_class=="recipe":
            with open('recipe/lowkcal.json','r',encoding='utf-8') as f:
                recipe_data=json.load(f)
                recipe_res={k['chinese']:x for i in text for x,k in recipe_data.items() if k['chinese'].find(i)!=-1}
                
                return recipe_res
    except KeyError:
        return []


@app.route('/search',methods=['POST'])
@login_required
def search():
    n_class=request.form.get('name_class')
    if n_class=="food":
        data=search_data(n_class,request.form.get('text'),request.form.get('name'),request.form.get('diet'))
        return jsonify(data)
    if n_class=="recipe":
        data=search_data(n_class,request.form.get('text'))
        return jsonify(data)
    """
    try:
        with open ("data/"+request.form.get('name')+".json","r",encoding="utf-8") as f:
            data=json.load(f)
            aa=data[diet[request.form.get('diet')]]
            print(request.form.get('text'))
            b={k["chinese"][k["chinese"].find("-")+1:]:i  for i,k in aa.items() if k["chinese"][k["chinese"].find("-")+1:].find(request.form.get('text'))!=-1}
           
            
            return jsonify(b)
    except:
        return jsonify([])   
    """ 

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


@app.route('/recipe',methods=["POST"])
@login_required
def recipe():
    #a=request.files["img"]
    a=json.loads(request.form.get("step"))
    
    for i in a:
        print(i)
    return "hi"


@app.route('/rev_recipe',methods=['POST','GET'])
@login_required
def rev_recipe():
    with open('recipe/lowkcal.json','r',encoding='utf-8') as f:
        data=json.load(f)
    name=request.args.get('key')
    return render_template('rev_recipe.html',data=data[name],rec=recipe_data,len=len(data[name]['step']))


@app.route('/del_recipe')
@login_required
def del_recipe():
    return "刪除"


@app.route('/search_recipe')
@login_required
def search_recipe():
    with open('recipe/lowkcal.json','r',encoding='utf-8') as f:
        data=json.load(f)
    return render_template("search_recipe.html",data=data)


@app.route('/logout')
@login_required
def logout():
    u = current_user.get_id()
    logout_user()
    print(session.get('userid'))
    return "<h2>您已登出</h2>"+"<p><a href='/'>回主頁</a></P>"

    
if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)

