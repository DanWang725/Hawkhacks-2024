import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException
from database import *

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
        raise HTTPException(status_code=409, detail="Email already registered")
    
    try:
        user = User(name=name, email=email, password=password)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")



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