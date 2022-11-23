from .db import db, environment, SCHEMA, add_prefix_for_prod


class GamePhoto(db.Model):
    __tablename__= "game_photos"
    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('games.id')))
    is_main= db.Column(db.Boolean)
    # user_g = db.relationship(
    #     "User", back_populates="game_photo_u")
    game_p = db.relationship("Game", back_populates="photo_g")
    # stop case:
    def to_dict(self):
        game_photo_dict = {
            "id": self.id,
            "url": self.url,
            "game_id": self.game_id,
            "is_main": self.is_main
        }
        return game_photo_dict

    def __repr__(self):
        return f'<Channel model: id={self.id}, title={self.price}, description={self.description}, price={self.price}>'
