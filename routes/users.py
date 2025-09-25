from fastapi import APIRouter, HTTPException, Request
from structs import db_dependency, user_dependency
from starlette import status
from models import UsersModel
from pydantic import Field, BaseModel, ValidationError
from fastapi.responses import JSONResponse
from passlib.context import CryptContext
from sqlalchemy.exc import IntegrityError
from jose import jwt
from dotenv import load_dotenv
from os import environ

load_dotenv()

class NewUser(BaseModel):
    email: str = Field(min_length = 5)
    password: str = Field(min_length = 1)
    confirmedPassword: str = Field(min_length = 1)

class User(BaseModel):
    email: str = Field(min_length = 5)
    password: str = Field(min_length = 1)

router = APIRouter(
    prefix = "/users",
    tags = ["users"],
)

bcrypt_content = CryptContext(
    schemes = ["bcrypt"], deprecated = "auto"
)

@router.post("/create", status_code = status.HTTP_201_CREATED)
async def create_user(
    db: db_dependency,
    new_user_request: Request,
):
    
    new_user_body = await new_user_request.json()

    try:
        new_user = NewUser(**new_user_body)

        new_user_model = UsersModel(
            email = new_user.email,
            encoded_password = bcrypt_content.hash(new_user.password)
        )

    except ValidationError as e:
        return JSONResponse(
            status_code = status.HTTP_400_BAD_REQUEST,
            content = {
                "detail": "Bad request.",
                "paramns": e.errors()
            }
        )
    
    try:
        db.add(new_user_model)
        db.commit()
        return {
            "message": "User created successfully.",
            "content": None
        }
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Email already taken."
        )

#Login and get jwt token encoded
@router.post("/login", status_code = status.HTTP_202_ACCEPTED)
async def login_user(
    db: db_dependency,
    login_user_request: Request,
):

    login_user_body = await login_user_request.json()

    try:
        login_user = User(**login_user_body)

    except ValidationError as e:
        return JSONResponse(
            status_code = status.HTTP_400_BAD_REQUEST,
            content = {
                "detail": "Bad request.",
                "paramns": e.errors()
            }
        )
    
    user = db.query(UsersModel).filter(
        UsersModel.email == login_user.email
    ).first()

    if user == None or not bcrypt_content.verify(
        secret = login_user.password,
        hash = user.encoded_password
    ):
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "User not found."
        )
    
    jwt_encoded = jwt.encode(
        claims = {
            "id": user.id_encoded,
        },
        key = environ.get("JWT_KEY"),
        algorithm = environ.get("JWT_ALGORITHM"),
    )

    return jwt_encoded

@router.get("/user", status_code = status.HTTP_200_OK)
async def get_user(
    db: db_dependency,
    user: user_dependency
):
    user = db.query(UsersModel).filter(
        UsersModel.id == user.get("id")
    ).first()

    if user == None:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "User not found.",
        )
    
    return user


