from .db import db, environment, SCHEMA, add_prefix_for_prod
from .friendship_friends import friendship_friends
class Friendship(db.Model):
    __tablename__ = "friendships"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    message_f = db.relationship("Message", back_populates="friendship_m")

    friendship_friendship_friends = db.relationship(
        "User",
        secondary=friendship_friends,
        back_populates="user_friendship_friends",
    )
