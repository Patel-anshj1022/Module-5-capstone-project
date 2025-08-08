from .. import db
from datetime import datetime

class HabitModel(db.Model):
    __tablename__ = 'habits'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    frequency = db.Column(db.String(20), default='daily')
    streak = db.Column(db.Integer, default=0)
    last_completed = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
    
    @classmethod
    def find_by_id(cls, habit_id, user_id):
        return cls.query.filter_by(id=habit_id, user_id=user_id).first()
    
    @classmethod
    def find_all_by_user(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()
    
    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'frequency': self.frequency,
            'streak': self.streak,
            'last_completed': self.last_completed.isoformat() if self.last_completed else None,
            'created_at': self.created_at.isoformat()
        }