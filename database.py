from sqlalchemy.engine import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from os import environ
from dotenv import load_dotenv

load_dotenv()

engine = create_engine(
    url = environ.get("DATABASE_URL")
)

SessionLocal = sessionmaker(
    autoflush = False,
    autocommit = False,
    bind = engine
)

Base = declarative_base()
