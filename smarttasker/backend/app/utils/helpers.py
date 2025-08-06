from datetime import datetime

def format_date(date_str):
    """
    Converts date string (YYYY-MM-DD) into a readable format: 'Aug 06, 2025'
    """
    try:
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        return date_obj.strftime("%b %d, %Y")
    except ValueError:
        return date_str

def validate_task_input(data):
    """
    Validates required fields for task creation.
    """
    if 'title' not in data or not data['title'].strip():
        return False, "Title is required"
    if 'due_date' not in data or not data['due_date'].strip():
        return False, "Due date is required"
    return True, ""

def validate_habit_input(data):
    """
    Validates required fields for habit creation.
    """
    if 'title' not in data or not data['title'].strip():
        return False, "Habit title is required"
    if 'frequency' not in data or not data['frequency'].strip():
        return False, "Frequency is required"
    return True, ""
