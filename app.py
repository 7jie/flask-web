from flask import Flask,request,session,url_for,redirect,json,jsonify,render_template
import os,flask
import time
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
cred = credentials.Certificate("topic.json")#自己的json路徑
firebase_admin.initialize_app(cred)
db = firestore.client()

app=Flask(__name__)
app.secret_key= 'fgdgedsfw1g6613wg16w15615a1f2d3dvw9894wevebhkjlbghtrh'
diet={"吃":"eat","喝":"drink"}
@app.route('/',methods=['GET','POST'])
def home():
    #return  redirect(url_for('index',name={"hi":{"no":"QQ"}}))
    
    if request.method=='POST':
        if request.values['send']=='登入':
            return  redirect(url_for('index'))
    return render_template('home.html') 
    

@app.route('/index',methods=['GET','POST']) #'/index/<name>' ,傳參數
def index(): #index(name)
    #return  '{}'.format(name)
    return  render_template('account.html')
@app.route('/food')
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
def food_list():
    en={'吃':'eat','喝':'drink'}
    if 'name' in request.form and 'diet' in request.form:
        with open ("food_store.json","r",encoding="utf-8") as f:
            data=json.load(f)
        with open ("data/"+request.form.get('name')+'.json',"r",encoding="utf-8") as f:
            food=json.load(f)
        t=en[request.form.get('diet')]
        food=food[t]
        return  render_template('store_list.html',data_name=data,food=food,diet=request.form.get('diet'))
    with open ("food_store.json","r",encoding="utf-8") as f:
        data=json.load(f)
    return  render_template('store_list.html',data_name=data)


@app.route('/newstore')
def newstore():
    return render_template('newstore.html') 

@app.route('/insert_food', methods=['POST'])
def insert_food():
    if request.method=='POST':
        mess={'店家名稱：':request.form.get('store_name'),
            '食品中文名稱：':request.form.get('name_zh'),
            '熱量：':request.form.get('kcal'),
            '份量：':request.form.get('size')
            }
        return render_template('insert_food.html', data=mess)
@app.route('/food_store', methods=['POST'])
def food_store():
    
    try:
        with open ("data/"+request.form.get('name')+".json","r",encoding="utf-8") as f:
            data=json.load(f)
        aa=data[diet[request.form.get('diet')]]
        b=[i for i in aa.keys()]
        return jsonify(b)
    except:
        return jsonify([])


@app.route('/insert_food_store', methods=['POST'])
def insert_food_store():
    if request.method=='POST':
        store_mess={
            '食品中文名稱：':request.form.get('name_zh'),
            '熱量：':request.form.get('kcal')
            }
        return render_template('insert_food.html', data=store_mess)        
@app.route('/insert_food_mess',methods=['POST'])
def insert_food_mess():
    return render_template('store_food.html',store_name=request.form.get('store_name'))



@app.route('/revise_food',methods=['POST','GET'])
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
def revise():
    return str(request.form.get('d'))
@app.route('/search',methods=['POST'])
def search():
    try:
        with open ("data/"+request.form.get('name')+".json","r",encoding="utf-8") as f:
            data=json.load(f)
            aa=data[diet[request.form.get('diet')]]
            b=[i for i in aa.keys() if i[:i.find("(")-1].find(request.form.get('text'))!=-1]
            print(b)
            return jsonify(b)
    except:
        return jsonify([])    
@app.route('/newrecipe')
def newrecipe():
    return render_template('newrecipe.html')
if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)

