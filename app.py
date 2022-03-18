from flask import Flask,request,session,url_for,redirect,json,jsonify
import os,flask
import time
import json

app=flask.Flask(__name__)
app.secret_key= 'fgdgedsfw1g6613wg16w15615a1f2d3dvw9894wevebhkjlbghtrh'
@app.route('/',methods=['GET','POST'])
def home():
    with open('./data/t.json','w') as f:
        f.write("hi")
    return "OK"
    """
    if request.method=='POST':
        if request.values['send']=='登入':
            return  flask.render_template('account.html')
    return flask.render_template('index.html') 
    """

@app.route('/food')
def food():
    with open ("food_store.json","r",encoding="utf-8") as f:
        data=json.load(f)
    return  flask.render_template('food.html',data=data)


@app.route('/newstore')
def newstore():
    return flask.render_template('newstore.html') 

@app.route('/newstore_mess')
def newstore_mess():

    return '測試成功'

if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)

