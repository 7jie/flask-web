from flask import Flask,request,session,url_for,redirect,json,jsonify
import os,flask
import time
import json

app=flask.Flask(__name__)
app.secret_key= 'fgdgedsfw1g6613wg16w15615a1f2d3dvw9894wevebhkjlbghtrh'
@app.route('/',methods=['GET','POST'])
def home():

    
    if request.method=='POST':
        if request.values['send']=='登入':
            return  flask.render_template('account.html')
    return flask.render_template('index.html') 
    

@app.route('/food')
def food():
    with open ("food_store.json","r",encoding="utf-8") as f:
        data=json.load(f)
    return  flask.render_template('food.html',data=data)


@app.route('/newstore')
def newstore():
    return flask.render_template('newstore.html') 

@app.route('/insert_food', methods=['GET','POST'])
def insert_food():
    if request.method=='POST':
        mess={'店家名稱：':request.form.get('store_name'),
            '食品中文名稱：':request.form.get('name_zh'),
            '份量：':request.form.get('size')
            }
        
        return flask.render_template('insert_food.html', data=mess)
    
if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)

