from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.gemini_ai import generate_task_suggestions, get_productivity_tips
import json

ai_routes = Blueprint('ai', __name__)

@ai_routes.route('/suggestions', methods=['GET'])
@jwt_required()
def get_suggestions():
    user_id = get_jwt_identity()
    suggestions = generate_task_suggestions(user_id)
    return jsonify(suggestions), 200

@ai_routes.route('/tips', methods=['GET'])
@jwt_required()
def get_tips():
    tips = get_productivity_tips()
    return jsonify(tips), 200