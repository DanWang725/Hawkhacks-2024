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

# class University(db.Model):
#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     name: Mapped[str] = mapped_column(String(30))
    
class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30))
    email: Mapped[Optional[str]] = mapped_column(String(30), unique=True)
    password: Mapped[str] = mapped_column(String(30))

class Course(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[Optional[str]] = mapped_column(String(30), unique=True)
    code: Mapped[str] = mapped_column(String(10))
    desc: Mapped[str] = mapped_column(String(255))
    university: Mapped[str] = mapped_column(String(40))
    

class Unit(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(20))
    summary: Mapped[str] = mapped_column(String(1000))
    courseId: Mapped[int] = mapped_column(ForeignKey("course.id"))
    authorId: Mapped[int] = mapped_column(ForeignKey("user.id"))

class Test(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    dateCreated: Mapped[datetime.datetime] = mapped_column(db.DateTime)
    name: Mapped[str] = mapped_column(String(30))
    desc: Mapped[Optional[str]] = mapped_column(String(255))
    courseId: Mapped[int] = mapped_column(ForeignKey("course.id"))
    authorId: Mapped[int] = mapped_column(ForeignKey("user.id"))

class TestQuestion(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    testId: Mapped[int] = mapped_column(ForeignKey("test.id"))
    question: Mapped[str] = mapped_column(String(100))
    opt1: Mapped[str] = mapped_column(String(100))
    opt2: Mapped[str] = mapped_column(String(100))
    opt3: Mapped[str] = mapped_column(String(100))
    opt4: Mapped[str] = mapped_column(String(100))
    answer: Mapped[int] = mapped_column(Integer())
    justification: Mapped[str] = mapped_column(String(100))

class UserQuestionAnswer(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    answer: Mapped[int] = mapped_column(Integer())
    isCorrect: Mapped[bool] = mapped_column(db.Boolean)
    questionId: Mapped[int] = mapped_column(ForeignKey("test_question.id"))

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



@app.route("/mockPopulateTables")
def mockPopulateTables():
    user1 = User(name="Joel", email="joe@biden.ca", password="1234")
    db.session.add(user1)
    db.session.commit()

    course1 = Course(name="Abungus", code="CIS2750", desc="Computer Science", university="University of Guelph")
    db.session.add(course1)
    db.session.commit()

    unit1 = Unit(name="Unit 1", summary="This is the first unit", courseId=1, authorId=1)
    db.session.add(unit1)

    unit2 = Unit(name="Unit 2", summary="This is the second unit", courseId=1, authorId=1)
    db.session.add(unit2)

    test1 = Test(dateCreated=datetime.datetime.now(), name="Test 1", desc="This is the first test", courseId=1, authorId=1)
    db.session.add(test1)
    db.session.commit()

    testQuestion1 = TestQuestion(testId=1, question="What is the capital of Canada?", opt1="Toronto", opt2="Ottawa", opt3="Montreal", opt4="Vancouver", answer=2, justification="Ottawa is the capital of Canada")
    testQuestion2 = TestQuestion(testId=1, question="What is the capital of the United States?", opt1="New York", opt2="Washington", opt3="Los Angeles", opt4="Chicago", answer=2, justification="Washington is the capital of the United States")
    testQuestion3 = TestQuestion(testId=1, question="What is the capital of Mexico?", opt1="Mexico City", opt2="Guadalajara", opt3="Monterrey", opt4="Cancun", answer=1, justification="Mexico City is the capital of Mexico")
    db.session.add(testQuestion1)
    db.session.add(testQuestion2)
    db.session.add(testQuestion3)
    db.session.commit()
    return "Tables populated"

@app.route("/mockTestResults", methods=["GET"])
def mockTestResults():
    mockAnswerToQuestion1 = UserQuestionAnswer(answer=2, isCorrect=True, questionId=1)
    mockAnswerToQuestion2 = UserQuestionAnswer(answer=2, isCorrect=True, questionId=2)
    mockAnswerToQuestion3 = UserQuestionAnswer(answer=3, isCorrect=False, questionId=3)
    db.session.add(mockAnswerToQuestion1)
    db.session.add(mockAnswerToQuestion2)
    db.session.add(mockAnswerToQuestion3)
    db.session.commit()
    return "Test results populated"

@app.route("/getTest", methods=["GET"])
def getTest():
    testId = request.args.get('testId')
    if(testId == None):
        return Response("{'status': 400, 'message': 'testId not provided'}", 400, mimetype='application/json')
    test = db.session.execute(db.select(Test).where(Test.id == testId)).scalar()
    questions = db.session.execute(db.select(TestQuestion).where(TestQuestion.testId == testId)).scalars()
    # print(test.__dir__())
    questionList = []
    for question in questions.fetchall():
        questionPayload = dict()
        questionPayload['question'] = question.question
        questionPayload['opt1'] = question.opt1
        questionPayload['opt2'] = question.opt2
        questionPayload['opt3'] = question.opt3
        questionPayload['opt4'] = question.opt4
        questionPayload['answer'] = question.answer
        questionPayload['justification'] = question.justification
        questionList.append(questionPayload)
    print(test.__dict__)
    testDict = test.__dict__
    testDict.pop('_sa_instance_state')
    
    testDict['dateCreated'] = str(testDict['dateCreated'].timestamp())
    # print(test, test.__dir__())

    responsePayload = dict()
    responsePayload['test'] = testDict
    responsePayload['questions'] = questionList
    payload = json.dumps(responsePayload)
    return Response(payload, 200, mimetype='application/json')

@app.route('/tests', methods=["GET", "POST"])
def tests():
    if(request.method == "GET"):
        userId = request.args.get('userId')
        testId = request.args.get('testId')
        if(testId != None):
            tests = db.session.execute(db.select(Test).where(Test.id == testId)).scalars()
        else:
            tests = db.session.execute(db.select(Test).order_by(Test.dateCreated)).scalars()
        
        parsedTests = []
        for test in tests.fetchall():
            payload = dict()
            print(test.courseId)
            course = db.session.execute(db.select(Course.code, Course.university).where(Course.id == test.courseId)).one()
            units = db.session.execute(db.select(Unit.name).where(Unit.courseId == test.id)).all();
            questions = db.session.execute(db.select(TestQuestion).where(TestQuestion.testId == test.id)).fetchall()
            questionCount = len(questions)
            answerCount = db.session.execute(db.select(UserQuestionAnswer).where(UserQuestionAnswer.questionId == TestQuestion.id, ).where(UserQuestionAnswer.answer == userId)).all()
            hasAttemptedTest = len(answerCount)
            payload['courseCode'] = course[0]
            payload['name'] =  test.name
            payload['date'] = str(test.dateCreated.timestamp())
            payload['university'] = course[1]
            payload['units'] = [ str(u[0]) for u in units]
            payload['questionAmount'] = questionCount
            if(hasAttemptedTest > 0):
                payload['hasAttempted'] = True
                payload['correctQuestions'] = db.session.execute(db.select(UserQuestionAnswer).where(UserQuestionAnswer.questionId == test.id).where(UserQuestionAnswer.answer == userId).where(UserQuestionAnswer.isCorrect == True)).count()    
            
            parsedTests.append(payload)
        responsePayload = dict(tests=parsedTests, status=200, message="Success")
        return Response(json.dumps(responsePayload), 200, mimetype='application/json')
    
# @app.route('/course', methods=["GET", "POST"])
# def courses():
#     if(request.method == "GET"):
#         courses = db.session.exec(db.select(Course)).scalars()
#         payload = dict()
#         for course in courses.fetchall():
#             coursePayload = dict()
#             coursePayload['University'] = db.session.exec(db.select(University.name).where(University.id==course.universityId)).one()
#             coursePayload['']

    # @app.route("/test")
# def test():
#     # users2 = db.get_or_404(Testing);
#     users = db.session.execute(db.select(Testing).order_by(Testing.amongUs)).scalars();
#     bigthig = ""
#     for user in users.fetchall():
#         bigthig = bigthig + str(user.joelMother)
#     return json.dumps({"hello":bigthig})
    
#     print( users.fetchall())