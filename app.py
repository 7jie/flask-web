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

@app.route('/test',methods=['GET','POST'])
def test():
    return  flask.render_template('test.html')
@app.route('/food',methods=['GET','POST'])
def food():
    with open ("food_store.json","r",encoding="utf-8") as f:
        data=json.load(f)

    return  flask.render_template('food.html',data=data)
@app.route('/ttt',methods=['GET'])
def ttt():
    if request.method=='GET':
        print(request.args.get('name'))
        return "ok"

if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)

