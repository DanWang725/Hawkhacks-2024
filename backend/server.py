import datetime
import os
from flask import Flask, Response, render_template, request, abort
from flask_cors import CORS 
from dotenv import load_dotenv
import json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, String, ForeignKey
from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column
from flask_sqlalchemy import SQLAlchemy

load_dotenv()
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://{}:{}@{}/{}".format(os.getenv('MYSQL_USER'), os.getenv('MYSQL_PASSWORD'),  os.getenv('MYSQL_HOST'), os.getenv('MYSQL_DB'))
db = SQLAlchemy(app)

class University(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30))
    
class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30))
    email: Mapped[Optional[str]] = mapped_column(String(30), unique=True)
    password: Mapped[str] = mapped_column(String(30))

class Course(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30))
    desc: Mapped[str] = mapped_column(String(255))
    universityId: Mapped[Optional[str]] = mapped_column(ForeignKey("university.id"))

class Unit(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    summary: Mapped[str] = mapped_column(String(1000))
    courseId: Mapped[int] = mapped_column(ForeignKey("course.id"))
    authorId: Mapped[int] = mapped_column(ForeignKey("user.id"))

class Test(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    dateCreated: Mapped[datetime.datetime] = mapped_column(db.DateTime)
    name: Mapped[str] = mapped_column(String(30))
    desc: Mapped[Optional[str]] = mapped_column(String(255))
    coruseId: Mapped[int] = mapped_column(ForeignKey("course.id"))
    authorId: Mapped[int] = mapped_column(ForeignKey("user.id"))


with app.app_context() as ctx:
    ctx.push()
    db.create_all()

@app.route("/login", methods=['POST'])
def login():
    reqArgs = request.get_json()
    getUser = db.session.execute(db.select(User.id).where(User.name == reqArgs['name']).where(User.password == reqArgs['password'])).first();
    if(len(getUser) == 0):
        return Response("{'status': 400, 'message': 'user not found'}", 200, mimetype='application/json')
    
    # userId = getUser.first()
    print(str(getUser[0]));
    responseObj = dict()
    responseObj['status'] = 200
    responseObj['id'] = getUser[0]
    return Response(json.dumps(responseObj), 200, mimetype='application/json')

@app.route("/createAccount", methods=['POST'])
def createAcc():
    reqArgs = request.get_json()
    existingUser = db.session.execute(db.select(User).where(User.name == reqArgs['name'])).scalars();
    if(len(existingUser.fetchall()) != 0):
        return Response("{'message': 'User already exists'}", 400, mimetype='application/json')
    
    newUser = User(name=reqArgs['name'], email=reqArgs['email'], password=reqArgs['password'])
    db.session.add(newUser);
    db.session.commit();
    return reqArgs

@app.route("/test")
def test():
    # users2 = db.get_or_404(Testing);
    users = db.session.execute(db.select(Testing).order_by(Testing.amongUs)).scalars();
    bigthig = ""
    for user in users.fetchall():
        bigthig = bigthig + str(user.joelMother)
    return json.dumps({"hello":bigthig})
    
    print( users.fetchall())
    

