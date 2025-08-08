from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from app.models.habit import HabitModel

habit_routes = Blueprint('habits', __name__)

@habit_routes.route('/habits', methods=['GET'])
@jwt_required()
def get_habits():
    user_id = get_jwt_identity()
    habits = HabitModel.find_all_by_user(user_id)
    return jsonify([habit.to_json() for habit in habits]), 200

@habit_routes.route('/habits', methods=['POST'])
@jwt_required()
def create_habit():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or not data.get('title'):
        return jsonify({'message': 'Title is required'}), 400
    
    new_habit = HabitModel(
        title=data['title'],
        description=data.get('description', ''),
        frequency=data.get('frequency', 'daily'),
        user_id=user_id
    )
    
    try:
        new_habit.save_to_db()
        return jsonify(new_habit.to_json()), 201
    except:
        return jsonify({'message': 'Something went wrong'}), 500

@habit_routes.route('/habits/<int:habit_id>', methods=['GET'])
@jwt_required()
def get_habit(habit_id):
    user_id = get_jwt_identity()
    habit = HabitModel.find_by_id(habit_id, user_id)
    
    if not habit:
        return jsonify({'message': 'Habit not found'}), 404
    
    return jsonify(habit.to_json()), 200

@habit_routes.route('/habits/<int:habit_id>', methods=['PUT'])
@jwt_required()
def update_habit(habit_id):
    user_id = get_jwt_identity()
    habit = HabitModel.find_by_id(habit_id, user_id)
    
    if not habit:
        return jsonify({'message': 'Habit not found'}), 404
    
    data = request.get_json()
    
    if 'title' in data:
        habit.title = data['title']
    if 'description' in data:
        habit.description = data['description']
    if 'frequency' in data:
        habit.frequency = data['frequency']
    if 'streak' in data:
        habit.streak = data['streak']
    if 'last_completed' in data:
        try:
            habit.last_completed = datetime.fromisoformat(data['last_completed']) if data['last_completed'] else None
        except:
            return jsonify({'message': 'Invalid date format'}), 400
    
    try:
        habit.save_to_db()
        return jsonify(habit.to_json()), 200
    except:
        return jsonify({'message': 'Something went wrong'}), 500

@habit_routes.route('/habits/<int:habit_id>', methods=['DELETE'])
@jwt_required()
def delete_habit(habit_id):
    user_id = get_jwt_identity()
    habit = HabitModel.find_by_id(habit_id, user_id)
    
    if not habit:
        return jsonify({'message': 'Habit not found'}), 404
    
    try:
        habit.delete_from_db()
        return jsonify({'message': 'Habit deleted successfully'}), 200
    except:
        return jsonify({'message': 'Something went wrong'}), 500

@habit_routes.route('/habits/<int:habit_id>/complete', methods=['POST'])
@jwt_required()
def complete_habit(habit_id):
    user_id = get_jwt_identity()
    habit = HabitModel.find_by_id(habit_id, user_id)
    
    if not habit:
        return jsonify({'message': 'Habit not found'}), 404
    
    habit.last_completed = datetime.utcnow()
    habit.streak += 1
    
    try:
        habit.save_to_db()
        return jsonify(habit.to_json()), 200
    except:
        return jsonify({'message': 'Something went wrong'}), 500