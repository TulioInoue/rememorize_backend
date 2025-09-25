from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from database import Base
from uuid import uuid4

class UsersModel(Base):
    __tablename__ = "users"
    id = Column(Integer, index = True, primary_key = True)
    id_encoded = Column(String, default = lambda: str(uuid4()), unique = True)
    email = Column(String, unique = True)
    encoded_password = Column(String)
    is_active = Column(Boolean, default = True)

class AnnotationModel(Base):
    __tablename__ = "annotations"
    id = Column(Integer, index = True, primary_key = True)
    onwer_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(String)
    likes = Column(Integer, default = 0)
    is_favorited = Column(Boolean, default = False)
    is_public = Column(Boolean, default = False)

class TagsModel(Base):
    __tablename__ = "tags"
    id = Column(Integer, index = True, primary_key = True)
    onwer_id = Column(Integer, ForeignKey("users.id"))
    description = Column(String)

class AnnotationTagsModel(Base):
    __tablename__ = "annotationtags"
    id = Column(Integer, index = True, primary_key = True)
    owner_id = Column(Integer, ForeignKey("annotations.id"))
    description = Column(String)

