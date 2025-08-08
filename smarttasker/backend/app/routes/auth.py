from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.models.user import UserModel
from app.utils.helpers import validate_email

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    if not validate_email(data['email']):
        return jsonify({'message': 'Invalid email format'}), 400
    
    if UserModel.find_by_username(data['username']):
        return jsonify({'message': 'Username already exists'}), 400
    
    if UserModel.find_by_email(data['email']):
        return jsonify({'message': 'Email already exists'}), 400
    
    new_user = UserModel(
        username=data['username'],
        email=data['email'],
        password=UserModel.generate_hash(data['password'])
    )
    
    try:
        new_user.save_to_db()
        access_token = create_access_token(identity=new_user.id)
        return jsonify({
            'message': 'User created successfully',
            'access_token': access_token,
            'user': {
                'id': new_user.id,
                'username': new_user.username,
                'email': new_user.email
            }
        }), 201
    except Exception as e:
        return jsonify({'message': 'Something went wrong'}), 500

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Missing username or password'}), 400
    
    current_user = UserModel.find_by_username(data['username'])
    
    if not current_user:
        return jsonify({'message': 'User not found'}), 404
    
    if UserModel.verify_hash(data['password'], current_user.password):
        access_token = create_access_token(identity=current_user.id)
        return jsonify({
            'message': 'Logged in successfully',
            'access_token': access_token,
            'user': {
                'id': current_user.id,
                'username': current_user.username,
                'email': current_user.email
            }
        }), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401