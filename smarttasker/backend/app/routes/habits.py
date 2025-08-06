from flask import Blueprint, request, jsonify
from app import db
from app.models.habit import Habit
from app.utils.helpers import validate_habit_input
from flask_jwt_extended import jwt_required, get_jwt_identity

bp = Blueprint('habits', __name__, url_prefix='/api/habits')

@bp.route('/', methods=['GET'])
@jwt_required()
def get_habits():
    uid = get_jwt_identity()
    habits = Habit.query.filter_by(user_id=uid).all()
    return jsonify([
        {
            "id": h.id,
            "title": h.title,
            "frequency": h.frequency,
            "last_checked": h.last_checked
        } for h in habits
    ])

@bp.route('/', methods=['POST'])
@jwt_required()
def create_habit():
    data = request.json
    is_valid, message = validate_habit_input(data)
    if not is_valid:
        return jsonify({"error": message}), 400

    uid = get_jwt_identity()
    habit = Habit(
        user_id=uid,
        title=data['title'],
        frequency=data['frequency'],
        last_checked=data.get('last_checked', '')
    )
    db.session.add(habit)
    db.session.commit()
    return jsonify({"message": "Habit created"}), 201
