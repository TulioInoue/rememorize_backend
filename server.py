from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from os import environ
from dotenv import load_dotenv
from database import engine

from routes import users

load_dotenv()

models.Base.metadata.create_all(
    bind = engine
)

server = FastAPI()

origins = [
    environ.get("FRONTEND_URL")
]

server.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

server.include_router(users.router)
