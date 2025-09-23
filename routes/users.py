from fastapi import APIRouter, HTTPException
from structs import db_dependency
from starlette import status
from models import UsersModel

router = APIRouter(
    prefix = "/users",
    tags = ["users"],
)

@router.get("/read/all", status_code = status.HTTP_200_OK)
def read_all_users(
    db: db_dependency
):
    data = db.query(UsersModel).all()
    return {
        "data": data
    }



