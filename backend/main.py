from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import datetime
import crud
import database
import asyncio
import ChatCompletionManager

app = FastAPI()
openAiClient = ChatCompletionManager.Manager()

origins = [
    "http://localhost:3000",  # React development server
    "http://127.0.0.1:3000",  # Another possible address for React
]

# Add the CORSMiddleware to the FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Set the allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.post("/create/user")
async def create_user(request: Request, db: Session = Depends(database.get_db)):
    data = await request.json()
    user = await crud.create_user(db=db, name=data.get("name"), email=data.get("email"), password=data.get("password"))
    
    return user


@app.get("/users")
async def get_user(userId: int, db: Session = Depends(database.get_db)):
    user = await crud.get_user_by_id(db, userId)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user


@app.get("/courses")
async def get_courses(courseId: int = None, db: Session = Depends(database.get_db)):
    if courseId:
        return await crud.get_course_by_id(db, id=courseId)
    
    return await crud.get_all_courses(db)


@app.post("/create/course")
async def create_course(request: Request, db: Session = Depends(database.get_db)):
    data = await request.json()
    course = await crud.create_course(db=db, name=data.get("name"), code=data.get("code"), desc=data.get("desc"), university=data.get("university"))
    
    return course


@app.get("/testcardinfo")
async def get_test_card_info(testId: int = None, db: Session = Depends(database.get_db)):
    if testId:
        test = await crud.get_test_by_id(db, testId)
        if test is None:
            raise HTTPException(status_code=404, detail="Test not found")

        author, course, units, questions = await asyncio.gather(
            crud.get_user_by_id(db, test.authorId),
            crud.get_course_by_id(db, test.courseId),
            crud.get_units_by_test_id(db, testId),
            crud.get_questions_by_test_id(db, testId)
        )
        
        return { "id": test.id, "name": test.name, "date": test.dateCreated, "courseName": course.name, "courseCode": course.code, "university": course.university, "units": len(units), "questionAmount": len(questions), "authorName": author.name }
    
    payload = []
    tests = await crud.get_all_tests(db)
    
    for test in tests:
        author, course, units, questions = await asyncio.gather(
            crud.get_user_by_id(db, test.authorId),
            crud.get_course_by_id(db, test.courseId),
            crud.get_units_by_test_id(db, test.id),
            crud.get_questions_by_test_id(db, test.id)
        )
        
        payload.append({ "id": test.id, "name": test.name, "date": test.dateCreated, "courseName": course.name, "courseCode": course.code, "university": course.university, "units": len(units), "questionAmount": len(questions), "authorName": author.name })
    
    return payload


@app.get("/tests")
async def get_tests(testId: int = None, userId: int = None, db: Session = Depends(database.get_db)):
    if testId:
        test, questions = await asyncio.gather(
            crud.get_test_by_id(db, testId),
            crud.get_questions_by_test_id(db, testId)
        )
        
        formatted_questions = [
            {
                "id": q.id,
                "question": q.question,
                "options": [q.opt1, q.opt2, q.opt3, q.opt4],
                "answer": q.answer,
                "justification": q.justification
            }
            for q in questions
        ]
        
        return { "id": test.id, "name": test.name, "desc": test.desc, "date": test.dateCreated, "questions": formatted_questions }
    
    if userId:
        return await crud.get_tests_by_user_id(db, userId)
    
    return await crud.get_all_tests(db)


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
async def create_test_questions(testId: int, db: Session = Depends(database.get_db)):
    
    # make sure the test exists
    test = await crud.get_test_by_id(db=db, id=testId)
    if test is None:
        raise HTTPException(status_code=404, detail=f"No test found with id {testId}")
    
    # make sure the test has units
    units = await crud.get_units_by_test_id(db=db, testId=testId)
    if not units:
        raise HTTPException(status_code=404, detail=f"No units found for test with id {testId}")
    
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