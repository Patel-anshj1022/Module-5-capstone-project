from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()
api = Api()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    db.init_app(app)
    jwt.init_app(app)
    api.init_app(app)
    
    with app.app_context():
        db.create_all()
        
        from . import routes
        api.add_resource(routes.UserRegistration, '/register')
        api.add_resource(routes.UserLogin, '/login')
        api.add_resource(routes.TaskList, '/tasks')
        api.add_resource(routes.HabitList, '/habits')
        
    return app