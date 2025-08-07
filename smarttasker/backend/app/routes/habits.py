from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.habit import Habit
from app.models.user import User
from app.extensions import db
from datetime import datetime
from ..routes import habit_routes  # Import the blueprint

@habit_routes.route('/', methods=['GET'])
@jwt_required()
def get_habits():
    user_id = get_jwt_identity()
    habits = Habit.query.filter_by(user_id=user_id).all()
    return jsonify([habit.to_dict() for habit in habits]), 200

@habit_routes.route('/', methods=['POST'])
@jwt_required()
def create_habit():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    habit = Habit(
        title=data['title'],
        description=data.get('description'),
        frequency=data.get('frequency', 'daily'),
        user_id=user_id
    )
    
    db.session.add(habit)
    db.session.commit()
    return jsonify(habit.to_dict()), 201

@habit_routes.route('/<int:habit_id>/complete', methods=['POST'])
@jwt_required()
def complete_habit(habit_id):
    user_id = get_jwt_identity()
    habit = Habit.query.filter_by(id=habit_id, user_id=user_id).first_or_404()
    
    today = datetime.utcnow().date()
    last_completed = habit.last_completed.date() if habit.last_completed else None
    
    if last_completed != today:
        habit.streak += 1
        habit.last_completed = datetime.utcnow()
        db.session.commit()
    
    return jsonify(habit.to_dict()), 200

@habit_routes.route('/<int:habit_id>', methods=['DELETE'])
@jwt_required()
def delete_habit(habit_id):
    user_id = get_jwt_identity()
    habit = Habit.query.filter_by(id=habit_id, user_id=user_id).first_or_404()
    
    db.session.delete(habit)
    db.session.commit()
    return jsonify({'message': 'Habit deleted successfully'}), 200