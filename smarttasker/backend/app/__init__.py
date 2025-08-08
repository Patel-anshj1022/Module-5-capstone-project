from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

db = SQLAlchemy()
jwt = JWTManager()
api = Api()

def create_app():
    load_dotenv()
    
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///smarttasker.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'super-secret-key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600  # 1 hour
    
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    db.init_app(app)
    jwt.init_app(app)
    
    with app.app_context():
        db.create_all()
    
    from app.routes.auth import auth_routes
    from app.routes.tasks import task_routes
    from app.routes.habits import habit_routes
        
    api.init_app(app)
    app.register_blueprint(auth_routes)
    app.register_blueprint(task_routes)
    app.register_blueprint(habit_routes)
    
    return app