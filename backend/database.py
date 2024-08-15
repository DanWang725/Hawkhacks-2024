from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL')

engine = create_engine(DATABASE_URL, pool_pre_ping=True, pool_recycle=300)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(30), index=True, nullable=False)
    email = Column(String(30), unique=True)
    password = Column(String(30), nullable=False)


class Course(Base):
    __tablename__ = "course"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(30), index=True)
    code = Column(String(10), index=True, nullable=False)
    desc = Column(String(255))
    university = Column(String(40), nullable=False)


class Test(Base):
    __tablename__ = "test"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    dateCreated = Column(DateTime(timezone=True), nullable=False)
    name = Column(String(30), nullable=False)
    desc = Column(String(255))
    courseId = Column(Integer, ForeignKey("course.id"), nullable=False)
    authorId = Column(Integer, ForeignKey("user.id"), nullable=False)


class Unit(Base):
    __tablename__ = "unit"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(20), index=True, nullable=False)
    summary = Column(String(10000), nullable=False)
    testId = Column(Integer, ForeignKey("test.id"), nullable=False)


class TestQuestion(Base):
    __tablename__ = "testQuestion"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    testId = Column(Integer, ForeignKey("test.id"), nullable=False, index=True)
    question = Column(String(1000), nullable=False)
    opt1 = Column(String(500), nullable=False)
    opt2 = Column(String(500), nullable=False)
    opt3 = Column(String(500), nullable=False)
    opt4 = Column(String(500), nullable=False)
    answer = Column(Integer, nullable=False)
    justification = Column(String(1000), nullable=False)


class UserQuestionAnswer(Base):
    __tablename__ = "userQuestionAnswer"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    ownerId = Column(Integer, ForeignKey("user.id"), nullable=False)
    answer = Column(Integer, nullable=False)
    isCorrect = Column(Boolean, nullable=False)
    questionId = Column(Integer, ForeignKey("testQuestion.id"), nullable=False)

# Dependency to get a session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base.metadata.create_all(bind=engine)