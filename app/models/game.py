from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user_cart_item import user_cart_item
from .user_library_game import user_library_game
class Game(db.Model):
    __tablename__= 'games'
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
    game_user_cart_item = db.relationship(
        "User",
        secondary=user_cart_item,
        back_populates="user_user_cart_item",
        cascade="all, delete"
    )
    game_user_library_game = db.relationship(
        "User",
        secondary=user_library_game,
        back_populates="user_user_library_game",
        cascade="all, delete"
    )
    def to_dict(self):
        game_dict = {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": str(self.price)
        }
        return game_dict
    def to_dict_images(self):
        game_dict = {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": str(self.price),
            "images": [image.to_dict() for image in self.photo_g],
        }
        return game_dict

    def __repr__(self):
        return f'<Channel model: id={self.id}, title={self.price}, description={self.description}, price={self.price}>'
