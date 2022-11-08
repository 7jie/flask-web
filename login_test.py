# -*- coding: utf-8 -*-
"""
Created on Fri Jun  3 20:48:25 2022

@author: asus
"""
from flask import Flask,request
from flask_login import LoginManager,login_user,current_user,UserMixin

app = Flask(__name__)
app.secret_key= 'fgdgedsfw1g6613wg16w15615a1f2d3dvw9894wevebhkjlbghtrh'
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin):
    pass

def user_loader(u):
    if u not in users:
        return

    user = User()
    user.id = u
    return user
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        print("")
    
    使用者 = request.form['user_id']
    if ("Me" in users) and (request.form['password'] == users["Me"]['password']):
        user = User()
        user.id = 使用者
        login_user(user)
        return "o"

users = {'Me': {'password': 'myself'}}


if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)