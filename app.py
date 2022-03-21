
from flask import Flask,request,session,url_for,redirect,json,jsonify
import os,flask
import time
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
cred = credentials.Certificate("topic.json")#自己的json路徑
firebase_admin.initialize_app(cred)
db = firestore.client()

app=flask.Flask(__name__)
app.secret_key= 'fgdgedsfw1g6613wg16w15615a1f2d3dvw9894wevebhkjlbghtrh'
@app.route('/',methods=['GET','POST'])
def home():
    if request.method=='POST':
        if request.values['send']=='登入':
            return  redirect(url_for('index'))
    return flask.render_template('index.html') 
    
@app.route('/index',methods=['GET','POST'])
def index():
     return  flask.render_template('account.html')
@app.route('/food')
def food():
    data=[]
    stores=db.collection("food").get()
    for store in stores:
        data.append(store.id)
    """
    with open ("food_store.json","r",encoding="utf-8") as f:
        data=json.load(f)
    """
    return  flask.render_template('food.html',data=data)


@app.route('/newstore')
def newstore():
    return flask.render_template('newstore.html') 

@app.route('/insert_food', methods=['POST'])
def insert_food():
    if request.method=='POST':
        mess={'店家名稱：':request.form.get('store_name'),
            '食品中文名稱：':request.form.get('name_zh'),
            '熱量：':request.form.get('kcal'),
            '份量：':request.form.get('size')
            }
        return flask.render_template('insert_food.html', data=mess)

@app.route('/insert_food_store', methods=['POST'])
def insert_food_store():
    if request.method=='POST':
        store_mess={
            '食品中文名稱：':request.form.get('name_zh'),
            '熱量：':request.form.get('kcal')
            }
        return flask.render_template('insert_food.html', data=store_mess)        
@app.route('/insert_food_mess',methods=['POST'])
def insert_food_mess():
    return flask.render_template('store_food.html',store_name=request.form.get('store_name'))
if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)

