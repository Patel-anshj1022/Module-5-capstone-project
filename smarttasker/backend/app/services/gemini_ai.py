import requests

def get_gemini_suggestions(tasks):
    prompt = "Based on the following tasks, suggest goals and tips:\n"
    for t in tasks:
        prompt += f"- {t['title']} (due {t['due_date']})\n"
    response = requests.post("https://api.gemini.google.com/suggest", json={"prompt": prompt})
    return response.json()
