from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.task import TaskModel
from datetime import datetime

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = TaskModel.find_all_by_user(user_id)
    return jsonify([task.to_json() for task in tasks]), 200

@task_routes.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or not data.get('title'):
        return jsonify({'message': 'Title is required'}), 400
    
    try:
        due_date = datetime.fromisoformat(data['due_date']) if data.get('due_date') else None
    except:
        return jsonify({'message': 'Invalid date format'}), 400
    
    new_task = TaskModel(
        title=data['title'],
        description=data.get('description', ''),
        due_date=due_date,
        status=data.get('status', 'pending'),
        user_id=user_id
    )
    
    try:
        new_task.save_to_db()
        return jsonify(new_task.to_json()), 201
    except:
        return jsonify({'message': 'Something went wrong'}), 500

@task_routes.route('/tasks/<int:task_id>', methods=['GET'])
@jwt_required()
def get_task(task_id):
    user_id = get_jwt_identity()
    task = TaskModel.find_by_id(task_id, user_id)
    
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    
    return jsonify(task.to_json()), 200

@task_routes.route('/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    user_id = get_jwt_identity()
    task = TaskModel.find_by_id(task_id, user_id)
    
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    
    data = request.get_json()
    
    if 'title' in data:
        task.title = data['title']
    if 'description' in data:
        task.description = data['description']
    if 'status' in data:
        task.status = data['status']
    if 'due_date' in data:
        try:
            task.due_date = datetime.fromisoformat(data['due_date']) if data['due_date'] else None
        except:
            return jsonify({'message': 'Invalid date format'}), 400
    
    try:
        task.save_to_db()
        return jsonify(task.to_json()), 200
    except:
        return jsonify({'message': 'Something went wrong'}), 500

@task_routes.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = TaskModel.find_by_id(task_id, user_id)
    
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    
    try:
        task.delete_from_db()
        return jsonify({'message': 'Task deleted successfully'}), 200
    except:
        return jsonify({'message': 'Something went wrong'}), 500