import google.generativeai as genai
from app.extensions import db
from app.models.task import Task
from app.models.habit import Habit
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-pro')

def generate_task_suggestions(user_id):
    tasks = Task.query.filter_by(user_id=user_id).all()
    habits = Habit.query.filter_by(user_id=user_id).all()
    
    task_data = [task.title for task in tasks]
    habit_data = [habit.title for habit in habits]
    
    prompt = f"""
    Based on the user's current tasks: {', '.join(task_data)} and habits: {', '.join(habit_data)},
    suggest 3 personalized daily goals that would help them be more productive.
    Return the suggestions as a JSON array with the format:
    [{{"title": "suggestion title", "description": "suggestion description"}}]
    """
    
    try:
        response = model.generate_content(prompt)
        return json.loads(response.text)
    except Exception as e:
        print(f"Error generating suggestions: {e}")
        return []

def get_productivity_tips():
    prompt = """
    Provide 3 random productivity tips to help someone stay focused and efficient.
    Return the tips as a JSON array with the format:
    [{{"tip": "tip content"}}]
    """
    
    try:
        response = model.generate_content(prompt)
        return json.loads(response.text)
    except Exception as e:
        print(f"Error generating tips: {e}")
        return []