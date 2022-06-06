from flask import Flask
import pyrebase

app = Flask(__name__)



firebaseConfig = {
    "apiKey": "AIzaSyDU4SMG9hpVMear3YN1aPtV8ABFuu2yHjM",
    "authDomain": "python-f1901.firebaseapp.com",
    "databaseURL":"https://python.firebaseio.com",#python要改成自己的專案名稱
    "projectId": "python-f1901",
    "storageBucket": "python-f1901.appspot.com",
    "messagingSenderId": "985398112505",
    "appId": "1:985398112505:web:2b3a195194fcbfc38a3228",
    "measurementId": "G-R9185X2PHH"
    }
firebase=pyrebase.initialize_app(firebaseConfig)
auth=firebase.auth()
class man:
    def __init__(self,mail=None,ps_word=None):
        self.mail=mail
        self.ps=ps_word
    def check_man(self):
        try:
            user = auth.sign_in_with_email_and_password(self.mail, self.ps)
            return True
        except:
            return False
    
    




