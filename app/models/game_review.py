from .db import db, environment, SCHEMA, add_prefix_for_prod

class GameReview(db.Model):
    __tablename__= "game_reviews"
    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    #title is actual username of user
    content = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Boolean)
    reviewer_id= db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    game_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('games.id')))
    game_r= db.relationship("Game", back_populates= "review_g")
    user_r = db.relationship(
        "User", back_populates="review_u")
    # stop case:
    def to_dict(self):
        game_review_dict = {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "rating": self.rating,
            "game_id": self.game_id,
            "game_name":self.game_r.to_dict()["title"],
            "game_image":self.game_r.to_dict_images()["images"][0]
        }
        return game_review_dict

    def __repr__(self):
        return f'<Channel model: id={self.id}, title={self.price}, description={self.description}, price={self.price}>'
