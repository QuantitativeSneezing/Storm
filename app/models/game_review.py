from .db import db, environment, SCHEMA, add_prefix_for_prod

class GameReview(db.Model):
    __tablename__= "game_reviews"
    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Boolean)
    game_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('games.id')))
    game_r= db.relationship("Game", back_populates= "review_g")
    # stop case:
    def to_dict(self):
        game_dict = {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "rating": self.rating
        }
        return game_dict

    def __repr__(self):
        return f'<Channel model: id={self.id}, title={self.price}, description={self.description}, price={self.price}>'
