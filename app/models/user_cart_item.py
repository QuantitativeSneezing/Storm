from .db import db, environment, SCHEMA, add_prefix_for_prod

user_cart_item = db.Table(
    'user_cart_items',
    db.Model.metadata,
    db.Column('users_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('games_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('games.id')), primary_key=True)
)
if environment == 'production':
    user_cart_item.schema = SCHEMA
