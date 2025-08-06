import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "super-secret-key"
    SQLALCHEMY_DATABASE_URI = 'sqlite:///smarttasker.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "your_jwt_secret"
