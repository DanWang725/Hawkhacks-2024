import datetime
from sqlalchemy import Integer, String, ForeignKey
from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Test(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    dateCreated: Mapped[datetime.datetime] = mapped_column(db.DateTime)
    name: Mapped[str] = mapped_column(String(30))
    desc: Mapped[Optional[str]] = mapped_column()
    course_id: Mapped[int] = mapped_column(ForeignKey("course.id"))
    author_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
