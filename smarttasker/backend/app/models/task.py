from app import db

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(200))
    due_date = db.Column(db.String(100))
    status = db.Column(db.String(20))  # 'complete' or 'pending'
