from app import db

class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(200))
    frequency = db.Column(db.String(100))
    last_checked = db.Column(db.String(100))
