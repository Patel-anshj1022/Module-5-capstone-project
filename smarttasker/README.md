SmartTasker - Simple fullstack (Flask + vanilla JS) demo
-------------------------------------------------------

Requirements:
 - Python 3.10+ (Ubuntu)
 - Node not required (frontend is static files)
 - Git (optional)

Structure:
 - backend/: Flask app + SQLite
 - frontend/: static HTML, CSS, JS

Steps (Ubuntu / VS Code):

1) Clone or copy project to local machine:
   cd ~
   git clone <your-repo-url> smarttasker
   cd smarttasker/backend

2) Create Python virtualenv and install:
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt

3) (Optional) Copy .env.example to .env and edit:
   cp .env.example .env
   # change JWT_SECRET strong value if you want

4) Initialize DB (first run auto-creates DB):
   # The app will create SQLite DB automatically on first start
   export FLASK_APP=app.py
   export FLASK_ENV=development
   # optional: export JWT_SECRET="your-secret-here"
   flask run --host=0.0.0.0 --port=5000

   The backend will now be available at: http://localhost:5000

5) Open frontend:
   Open the file frontend/index.html in your browser (double click or:
   # From project root
   cd ../frontend
   # Simple static server (python)
   python3 -m http.server 8000
   # Then open http://localhost:8000 in browser
   )

6) Use the UI:
   - Register a new user or click 'Demo' to create a demo user.
   - After successful login, you will be redirected to home.html.
   - Home page calls /api/profile with the JWT stored in localStorage.

Notes:
 - Tokens expire in 24 hours by default.
 - SQLite DB file is backend/smarttasker.db
 - To reset DB, stop the server and delete backend/smarttasker.db then restart.
 - For production, switch to PostgreSQL and use HTTPS + secure secrets.
