from flask import Blueprint, request, jsonify
from app import db
from app.models.task import Task
from app.utils.helpers import validate_task_input
from flask_jwt_extended import jwt_required, get_jwt_identity

bp = Blueprint('tasks', __name__, url_prefix='/api/tasks')

@bp.route('/', methods=['GET'])
@jwt_required()
def get_tasks():
    uid = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=uid).all()
    return jsonify([
        {
            "id": t.id,
            "title": t.title,
            "due_date": t.due_date,
            "status": t.status
        } for t in tasks
    ])

@bp.route('/', methods=['POST'])
@jwt_required()
def create_task():
    data = request.json
    is_valid, message = validate_task_input(data)
    if not is_valid:
        return jsonify({"error": message}), 400

    uid = get_jwt_identity()
    task = Task(
        user_id=uid,
        title=data['title'],
        due_date=data['due_date'],
        status='pending'
    )
    db.session.add(task)
    db.session.commit()
    return jsonify({"message": "Task created"}), 201
