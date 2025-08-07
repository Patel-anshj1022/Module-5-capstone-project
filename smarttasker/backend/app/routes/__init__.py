from flask import Blueprint

# Create all blueprints
auth_bp = Blueprint('auth', __name__)
task_bp = Blueprint('tasks', __name__)
habit_bp = Blueprint('habits', __name__)
ai_bp = Blueprint('ai', __name__)

# Import routes after blueprints are created
from . import auth, tasks, habits, ai

# Export the blueprints
__all__ = ['auth_bp', 'task_bp', 'habit_bp', 'ai_bp']