from fastapi import FastAPI, Depends, HTTPException, Request
from sqlalchemy.orm import Session
import datetime
import crud
import database
import asyncio
import ChatCompletionManager

app = FastAPI()

@app.get("/")
async def root():
    return {'status': 200, 'message': 'Hello World'}


@app.post("/create/user")
async def create_user(request: Request, db: Session = Depends(database.get_db)):
    data = await request.json()
    user = await crud.create_user(db=db, name=data.get("name"), email=data.get("email"), password=data.get("password"))
    
    return user


@app.get("/users/id/{user_id}")
async def read_user(user_id: int, db: Session = Depends(database.get_db)):
    user = await crud.get_user_by_id(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user


@app.post("/create/course")
async def create_course(request: Request, db: Session = Depends(database.get_db)):
    data = await request.json()
    course = await crud.create_course(db=db, name=data.get("name"), code=data.get("code"), desc=data.get("desc"), university=data.get("university"))
    
    return course


@app.post("/create/test")
async def create_test(request: Request, db: Session = Depends(database.get_db)):
    data = await request.json()
    courseId = data.get("courseId")
    authorId = data.get("authorId")
    date = data.get("dateCreated")
    
    if date is None:
        date = datetime.datetime.now()
    
    # make sure the course exists
    course = await crud.get_course_by_id(db=db, id=courseId)
    if course is None:
        raise HTTPException(status_code=404, detail=f"No course found with id {courseId}")
    
    # make sure the author exists
    user = await crud.get_user_by_id(db=db, id=authorId)
    if user is None:
        raise HTTPException(status_code=404, detail=f"No user found with id {authorId}")
    
    test = await crud.create_test(db=db, name=data.get("name"), desc=data.get("desc"), courseId=courseId, authorId=authorId, dateCreated=date)
    
    return test


@app.post("/create/unit")
async def create_unit(request: Request, db: Session = Depends(database.get_db)):
    data = await request.json()
    testId = data.get("testId")
    
    # make sure the test exists
    test = await crud.get_test_by_id(db=db, id=testId)
    if test is None:
        raise HTTPException(status_code=404, detail=f"No test found with id {testId}")
    
    unit = await crud.create_unit(db=db, name=data.get("name"), summary=data.get("summary"), testId=data.get("testId"))
    
    return unit


@app.post("/create/testquestions")
async def create_test_questions(request: Request, db: Session = Depends(database.get_db)):
    data = await request.json()
    testId = data.get("testId")
    
    # make sure the test exists
    test = await crud.get_test_by_id(db=db, id=testId)
    if test is None:
        raise HTTPException(status_code=404, detail=f"No test found with id {testId}")
    
    # make sure the test has units
    units = await crud.get_units_by_test_id(db=db, testId=testId)
    if not units:
        raise HTTPException(status_code=404, detail=f"No units found for test with id {testId}")
    
    # for each unit asyncrounously create questions
    openAiClient = ChatCompletionManager.Manager()
    
    # Create a list of tasks
    tasks = [openAiClient.questionsNoHistory(unit.summary) for unit in units]
    results = await asyncio.gather(*tasks)
    
    # holy nesting, batman! (it has a very minor impact on performance)
    for result in results:
        question = result.choices[0].message.parsed
        for quiz_tuple in question:
            quiz = quiz_tuple[1]
            for question in quiz.questions:
                await crud.create_multiple_choice_question(db=db, testId=testId, question=question.question, opt1=question.options[0], opt2=question.options[1], opt3=question.options[2], opt4=question.options[3], answer=question.answer, justification=question.explanation)
    
    return {"status": 200, "message": "Test questions created successfully"}
    



# the frontend must make requests in the following order to create a test:
# 1. create a course (POST /create/course)
# 2. create a test (POST /create/test)
# 2a. make sure you save the test.id from the response
# 3. create all units for test (POST /create/unit)
# 4. generate test questions (POST /create/testquestions)





# Old code from the original server.py that I have to turn into FastAPI endpoints

# @app.route('/testResults', methods=["POST"])
# def testResults():
#     if(request.method == "POST"):
#         reqArgs = request.get_json()
#         testId = reqArgs['testId']
#         userId = reqArgs['userId']
#         answers = reqArgs['answers']
#         testQuestions = db.session.execute(db.select(TestQuestion).where(TestQuestion.testId == testId)).scalars().fetchall()
#         for i in range(len(answers)):
#             userAnswer = UserQuestionAnswer(ownerId=userId, answer=answers[i], isCorrect=testQuestions[i].answer == answers[i], questionId=testQuestions[i].id)
#             db.session.add(userAnswer)
#         db.session.commit()
#         return Response("{'status': 200, 'message': 'test results saved'}", 200, mimetype='application/json')

# Get request for test (one for single id and one for all)

# @app.route("/login", methods=['POST'])
# def login():
#     reqArgs = request.get_json()
#     getUser = db.session.execute(db.select(User.id).where(User.name == reqArgs['name']).where(User.password == reqArgs['password'])).first()
#     if(len(getUser) == 0):
#         return Response("{'status': 400, 'message': 'user not found'}", 400, mimetype='application/json')
    
#     # userId = getUser.first()
#     # print(str(getUser[0]))
#     responseObj = dict()
#     responseObj['status'] = 200
#     responseObj['id'] = getUser[0]
#     return Response(json.dumps(responseObj), 200, mimetype='application/json')