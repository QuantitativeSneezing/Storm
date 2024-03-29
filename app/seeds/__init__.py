from flask.cli import AppGroup
from .users import seed_users, undo_users
from .games import seed_games, undo_games
from .friendships import seed_friendships, undo_friendships
from .messages import seed_messages, undo_messages
from .game_photos import seed_game_photos, undo_game_photos
from .reviews import seed_game_reviews, undo_game_reviews
from app.models.db import db, environment, SCHEMA
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_messages()
        undo_friendships()
        undo_users()
        undo_game_photos()
        undo_game_reviews()
        undo_games()
    seed_users()
    seed_games()
    seed_friendships()
    seed_messages()
    seed_game_photos()
    seed_game_reviews()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_friendships()
    undo_users()
    undo_game_photos()
    seed_game_reviews()
    undo_games()
    # Add other undo functions here
