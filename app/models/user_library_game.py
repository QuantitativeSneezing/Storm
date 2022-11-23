from .db import db, environment, SCHEMA, add_prefix_for_prod

user_library_game = db.Table(
    'user_library_games',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('game_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('games.id')), primary_key=True)
)
if environment == 'production':
    user_library_game.schema = SCHEMA
