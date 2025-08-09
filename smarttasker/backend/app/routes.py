from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import db, User, Task, Habit
from datetime import datetime

# Auth resources
class UserRegistration(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('email', required=True)
        parser.add_argument('password', required=True)
        args = parser.parse_args()
        
        if User.query.filter_by(username=args['username']).first():
            return {'message': 'Username already exists'}, 400
            
        if User.query.filter_by(email=args['email']).first():
            return {'message': 'Email already exists'}, 400
            
        user = User(username=args['username'], email=args['email'])
        user.set_password(args['password'])
        db.session.add(user)
        db.session.commit()
        
        return {
            'message': 'User created successfully',
            'token': user.get_token()
        }, 201

class UserLogin(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('password', required=True)
        args = parser.parse_args()
        
        user = User.query.filter_by(username=args['username']).first()
        
        if not user or not user.check_password(args['password']):
            return {'message': 'Invalid credentials'}, 401
            
        return {
            'message': 'Logged in successfully',
            'token': user.get_token()
        }, 200

# Task resources
class TaskList(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        tasks = Task.query.filter_by(user_id=user_id).all()
        return [{
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'due_date': task.due_date.isoformat() if task.due_date else None,
            'completed': task.completed
        } for task in tasks]
        
    @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', required=True)
        parser.add_argument('description')
        parser.add_argument('due_date')
        parser.add_argument('completed', type=bool)
        args = parser.parse_args()
        
        task = Task(
            title=args['title'],
            description=args['description'],
            due_date=datetime.fromisoformat(args['due_date']) if args['due_date'] else None,
            completed=args['completed'] or False,
            user_id=get_jwt_identity()
        )
        db.session.add(task)
        db.session.commit()
        
        return {'message': 'Task created successfully'}, 201

# Habit resources
class HabitList(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        habits = Habit.query.filter_by(user_id=user_id).all()
        return [{
            'id': habit.id,
            'title': habit.title,
            'frequency': habit.frequency,
            'streak': habit.streak
        } for habit in habits]
        
    @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', required=True)
        parser.add_argument('frequency', required=True)
        args = parser.parse_args()
        
        habit = Habit(
            title=args['title'],
            frequency=args['frequency'],
            user_id=get_jwt_identity()
        )
        db.session.add(habit)
        db.session.commit()
        
        return {'message': 'Habit created successfully'}, 201