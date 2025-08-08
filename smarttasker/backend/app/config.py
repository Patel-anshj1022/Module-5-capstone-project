import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///smarttasker.db')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'super-secret-key')