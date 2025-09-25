from database import SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from os import environ
from dotenv import load_dotenv
from models import UsersModel

load_dotenv()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

db_dependency = Annotated[Session, Depends(get_db)]

token = OAuth2PasswordBearer(
    tokenUrl = "/users/login",
)

def get_user(
    user: Annotated[str, Depends(token)],
    db: db_dependency
):
    try:
        jwt_decoded = jwt.decode(
            token = user,
            key= environ.get("JWT_KEY"),
            algorithms = [environ.get("JWT_ALGORITHM")],
        )
        
        user = db.query(UsersModel).filter(
            UsersModel.id_encoded == jwt_decoded.get("id")
        ).first()

        if user == None:
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                detail = "Must login first."
            )

        return {
            "id": user.id
        }
    
    except JWTError:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "User not found"
        )

user_dependency = Annotated[dict, Depends(get_user)]