from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from .user_cart_item import user_cart_item
from .user_library_game import user_library_game
from.friendship_friends import friendship_friends
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    message_u = db.relationship(
        "Message", back_populates="user_m", cascade='all, delete')

    user_user_cart_item = db.relationship(
        "Game",
        secondary=user_cart_item,
        back_populates="server_server_members",
        cascade="all, delete"
    )

    user_user_library_game = db.relationship(
        "Game",
        secondary=user_library_game,
        back_populates="server_server_members",
        cascade="all, delete"
    )

    user_friendship_friends = db.relationship(
        "User",
        secondary=friendship_friends,
        back_populates="friendship_friendship_friends",
    )
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
