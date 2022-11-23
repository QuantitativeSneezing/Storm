from .db import db, environment, SCHEMA, add_prefix_for_prod

class Game(db.Model):
    __tablename__= "games"
    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    # user_g = db.relationship(
    #     "User", back_populates="game_u")
    photo_g = db.relationship("GamePhoto", back_populates="game_p")
    review_g= db.relationship("GameReview", back_populates="game_r")
    # stop case:
    def to_dict(self):
        game_dict = {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": self.price
        }
        return game_dict

    def __repr__(self):
        return f'<Channel model: id={self.id}, title={self.price}, description={self.description}, price={self.price}>'
