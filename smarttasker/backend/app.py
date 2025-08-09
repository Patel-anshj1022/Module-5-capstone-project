# backend/app.py
import os
from datetime import datetime, timedelta
from functools import wraps

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
import jwt

# Load env vars
load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-this")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXP_SECONDS = int(os.getenv("JWT_EXP_SECONDS", "86400"))
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///smarttasker.db")

app = Flask(__name__)
CORS(app)

# SQLAlchemy setup
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(120), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    tasks = relationship("Task", back_populates="owner")

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    done = Column(Boolean, default=False)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="tasks")
    created_at = Column(DateTime, default=datetime.utcnow)

# Create DB helper
def init_db():
    Base.metadata.create_all(bind=engine)

# JWT helpers
def create_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(seconds=JWT_EXP_SECONDS),
        "iat": datetime.utcnow()
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token

def decode_token(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except Exception:
        return None

# Auth decorator
def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", None)
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"message": "Missing or invalid authorization header"}), 401
        token = auth_header.split(" ", 1)[1]
        payload = decode_token(token)
        if not payload:
            return jsonify({"message": "Invalid or expired token"}), 401
        request.user_id = payload["user_id"]
        return f(*args, **kwargs)
    return decorated

# Routes
@app.route("/auth/register", methods=["POST"])
def register():
    data = request.json or {}
    username = data.get("username", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not username or not email or not password:
        return jsonify({"message": "username, email and password are required"}), 400

    db = SessionLocal()
    try:
        existing = db.query(User).filter((User.email == email) | (User.username == username)).first()
        if existing:
            return jsonify({"message": "User with that email or username already exists"}), 400

        user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password)
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        token = create_token(user.id)
        return jsonify({
            "message": "User created",
            "user": {"id": user.id, "username": user.username, "email": user.email},
            "token": token
        }), 201
    finally:
        db.close()

@app.route("/auth/login", methods=["POST"])
def login():
    data = request.json or {}
    identifier = data.get("identifier", "").strip()  # username or email
    password = data.get("password", "")

    if not identifier or not password:
        return jsonify({"message": "identifier and password required"}), 400

    db = SessionLocal()
    try:
        user = db.query(User).filter((User.email == identifier.lower()) | (User.username == identifier)).first()
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({"message": "Invalid credentials"}), 401

        token = create_token(user.id)
        return jsonify({
            "message": "Logged in",
            "user": {"id": user.id, "username": user.username, "email": user.email},
            "token": token
        }), 200
    finally:
        db.close()

@app.route("/tasks", methods=["GET"])
@login_required
def get_tasks():
    db = SessionLocal()
    try:
        tasks = db.query(Task).filter(Task.owner_id == request.user_id).all()
        out = []
        for t in tasks:
            out.append({
                "id": t.id,
                "title": t.title,
                "description": t.description,
                "done": t.done,
                "created_at": t.created_at.isoformat()
            })
        return jsonify({"tasks": out}), 200
    finally:
        db.close()

@app.route("/tasks", methods=["POST"])
@login_required
def create_task():
    data = request.json or {}
    title = data.get("title", "").strip()
    description = data.get("description", "").strip()
    if not title:
        return jsonify({"message": "title is required"}), 400

    db = SessionLocal()
    try:
        task = Task(title=title, description=description, owner_id=request.user_id)
        db.add(task)
        db.commit()
        db.refresh(task)
        return jsonify({"task": {"id": task.id, "title": task.title, "description": task.description, "done": task.done}}), 201
    finally:
        db.close()

@app.route("/me", methods=["GET"])
@login_required
def me():
    db = SessionLocal()
    try:
        user = db.query(User).get(request.user_id)
        if not user:
            return jsonify({"message": "User not found"}), 404
        return jsonify({"id": user.id, "username": user.username, "email": user.email}), 200
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)
