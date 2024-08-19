from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from fastapi import HTTPException
from database import *
from database import Session as SessionModel
import os
from hashing import Hash
from uuid import uuid4
from pytz import UTC as utc

load_dotenv()
JWT_SECRET = os.getenv('JWT_SECRET')

oauth2schema = OAuth2PasswordBearer(tokenUrl="/users/token")

###############
#    USERS    #
###############


async def get_user_by_id(db: Session, id: int):
    return db.query(User).filter(User.id == id).first()

async def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

async def create_user(db: Session, name: str, email: str, password: str):
    # check if the user already exists
    existing_user = await get_user_by_email(db, email=email)
    if existing_user:
        raise HTTPException(status_code=409, detail="User already exists")
    
    if (len(name) == 0):
        raise HTTPException(status_code=400, detail="Name cannot be empty")
    if (len(email) == 0):
        raise HTTPException(status_code=400, detail="Email cannot be empty")
    if (len(password) == 0):
        raise HTTPException(status_code=400, detail="Password cannot be empty")
    
    try:
        user = User(name=name, email=email, password=Hash.bcrypt(password))
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")




##################
# AUTHENTICATION #
##################

async def get_session_by_id(db: Session, id: str):
    session = db.query(SessionModel).filter(SessionModel.id == id).first()
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    present = datetime.now().replace(tzinfo=utc)
    if session.expireAt and present > session.expireAt.replace(tzinfo=utc):
        db.delete(session)
        raise HTTPException(status_code=401, detail="Session expired")
    
    return session

async def create_new_session(db: Session, userId: int):
    uuid = str(uuid4())
    try:
        present = datetime.now().replace(tzinfo=utc)
        session = SessionModel(id=uuid, userId=userId, createdAt=present, expireAt=present + timedelta(days=7))
        db.add(session)
        db.commit()
        db.refresh(session)
    except Exception:
        raise HTTPException(status_code=500, detail=f"Internal Server Error")

    return session


async def verify_login(db: Session, email: str, password: str) -> bool:
    user = await get_user_by_email(db, email)
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not Hash.verify(user.password, password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return True


async def delete_session(db: Session, id: str):
    try:
        session = db.query(SessionModel).filter(SessionModel.id == id).first()
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        db.delete(session)
        db.commit()
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


###############
#   COURSES   #
###############

async def get_all_courses(db: Session, max_courses: int = 100):
    try:
        courses = db.query(Course).limit(max_courses).all()
        return courses
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")

async def get_course_by_id(db: Session, id: int):
    return db.query(Course).filter(Course.id == id).first()

async def create_course(db: Session, name: str, code: str, desc: str, university: str):
    # check if the course already exists
    existing_course = db.query(Course).filter(Course.code == code, Course.university == university).first()
    if existing_course:
        return existing_course
    
    try:
        course = Course(name=name, code=code, desc=desc, university=university)
        db.add(course)
        db.commit()
        db.refresh(course)
        return course
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")



###############
#    TESTS    #
###############

async def get_all_tests(db: Session, max_tests: int = 100):
    try:
        tests = db.query(Test).limit(max_tests).all()
        return tests
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")

async def get_test_by_id(db: Session, id: int):
    return db.query(Test).filter(Test.id == id).first()

async def get_tests_by_user_id(db: Session, userId: int):
    return db.query(Test).filter(Test.authorId == userId).all()

async def create_test(db: Session, name: str, desc: str, courseId: int, authorId: int, dateCreated: datetime):
    try:
        test = Test(name=name, desc=desc, courseId=courseId, authorId=authorId, dateCreated=dateCreated)
        db.add(test)
        db.commit()
        db.refresh(test)
        return test
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")



###############
#    UNITS    #
###############

async def get_unit_by_id(db: Session, id: int):
    return db.query(Unit).filter(Unit.id == id).first()

async def get_units_by_test_id(db: Session, testId: int):
    return db.query(Unit).filter(Unit.testId == testId).all()

async def create_unit(db: Session, name: str, summary: str, testId: int):
    # check if the unit already exists
    existing_unit = db.query(Unit).filter(Unit.name == name, Unit.testId == testId).first()
    if existing_unit:
        raise HTTPException(status_code=409, detail="Unit already exists")
    
    try:
        unit = Unit(name=name, summary=summary, testId=testId)
        db.add(unit)
        db.commit()
        db.refresh(unit)
        return unit
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")



###############
#  QUESTIONS  #
###############

async def get_question_by_id(db: Session, id: int):
    return db.query(TestQuestion).filter(TestQuestion.id == id).first()

async def get_questions_by_test_id(db: Session, testId: int):
    return db.query(TestQuestion).filter(TestQuestion.testId == testId).all()

async def create_multiple_choice_question(db: Session, testId: int, question: str, opt1: str, opt2: str, opt3: str, opt4: str, answer: int, justification: str):
    try:
        question = TestQuestion(testId=testId, question=question, opt1=opt1, opt2=opt2, opt3=opt3, opt4=opt4, answer=answer, justification=justification)
        db.add(question)
        db.commit()
        db.refresh(question)
        return question
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")



###############
#   ANSWERS   #
###############

async def get_answer_by_id(db: Session, id: int):
    return db.query(UserQuestionAnswer).filter(UserQuestionAnswer.id == id).first()

async def create_question_answer(db: Session, userId: int, answer: int, questionId: int):
    try:
        question = await get_question_by_id(db, questionId)
        isCorrect = question.answer == answer
        answer = UserQuestionAnswer(userId=userId, answer=answer, isCorrect=isCorrect, questionId=questionId)
        db.add(answer)
        db.commit()
        db.refresh(answer)
        return answer
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")