from .db import db, environment, SCHEMA, add_prefix_for_prod

friendship_friends = db.Table(
    'user_cart_items',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('friendship_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('friendships.id')), primary_key=True)
)
if environment == 'production':
   friendship_friends.schema = SCHEMA
