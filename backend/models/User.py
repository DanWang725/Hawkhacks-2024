import datetime
from sqlalchemy import Integer, String, ForeignKey
from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30))
    email: Mapped[str] = mapped_column(String(30), unique=True)
    course_id: Mapped[int] = mapped_column(ForeignKey("course.id"))
    author_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
