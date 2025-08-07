from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
import os

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
api = Api()

def create_app():
    app = Flask(__name__)
    load_dotenv()
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///smarttasker.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'super-secret-key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 86400  # 1 day
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    api.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Import and register blueprints
    from app.routes import auth_bp, task_bp, habit_bp, ai_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(task_bp, url_prefix='/api/tasks')
    app.register_blueprint(habit_bp, url_prefix='/api/habits')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    
    return app