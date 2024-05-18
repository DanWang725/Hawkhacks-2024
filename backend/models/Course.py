from sqlalchemy import Integer, String, ForeignKey
from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Course(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30))
    desc: Mapped[str] = mapped_column()
    university_id: Mapped[Optional[str]] = mapped_column(ForeignKey("university.id"))
