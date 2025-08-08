import google.generativeai as genai
from app.config import Config

genai.configure(api_key=Config.GEMINI_API_KEY)

class GeminiService:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-pro')
    
    def get_task_suggestions(self, task_history):
        prompt = f"""
        Based on the user's task history below, suggest 3 personalized daily goals:
        
        {task_history}
        
        Return the suggestions as a bulleted list with brief explanations.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Gemini API error: {e}")
            return None
    
    def get_productivity_tip(self):
        prompt = """
        Provide a random motivational productivity tip to help someone stay focused and efficient.
        Keep it short (1-2 sentences) and encouraging.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Gemini API error: {e}")
            return "Stay focused and take it one task at a time!"
    
    def analyze_task_description(self, description):
        prompt = f"""
        Analyze this task description and suggest appropriate tags or categories:
        
        Description: "{description}"
        
        Return 2-3 relevant tags separated by commas.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Gemini API error: {e}")
            return "general"