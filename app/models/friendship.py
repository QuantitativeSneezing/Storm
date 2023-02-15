from .db import db, environment, SCHEMA, add_prefix_for_prod
from .friendship_friends import friendship_friends
class Friendship(db.Model):
    __tablename__ = "friendships"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    nicknameOne= db.Column(db.String)
    nicknameTwo= db.Column(db.String)

    message_f = db.relationship("Message", back_populates="friendship_m")

    friendship_friendship_friends = db.relationship(
        "User",
        secondary=friendship_friends,
        back_populates="user_friendship_friends",
    )
    def to_dict_with_users(self):
            friendship_dict = {
                "id": self.id,
                "nicknameOne" : self.nicknameOne,
                "nicknameTwo" : self.nicknameTwo,
                "messages": [message.to_dict() for message in self.message_f],
                "friends" : [user.to_dict() for user in self.friendship_friendship_friends]

            }
            return friendship_dict
    def to_dict(self):
        friendship_dict = {
            "id": self.id,
            "nicknameOne" : self.nicknameOne,
            "nicknameTwo" : self.nicknameTwo,
            "messages": [message.to_dict() for message in self.message_f],
        }
        return friendship_dict
