from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Testing(db.Model):
    amongUs: Mapped[int] = mapped_column(primary_key=True)
    joelMother: Mapped[str] = mapped_column()