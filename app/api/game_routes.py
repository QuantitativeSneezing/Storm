from flask import Blueprint, jsonify, session, request
from app.models import Game, User
from ..models.db import db, environment, SCHEMA, add_prefix_for_prod
# from app.forms import ServerForm
import json
from flask_login import current_user,login_required

game_routes = Blueprint('game', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@game_routes.route('/<int:game_id>')
def one_game(game_id):
    game= Game.query.get(game_id)
    return json.dumps({"game": game.to_dict_images()})
@game_routes.route('/all')
def all_games():
    all_games= Game.query.all()
    return json.dumps({"games": [game.to_dict_images() for game in all_games]})
@game_routes.route('/library')
@login_required
def library_games():
    user_with_games = User.query.get(current_user.id)
    games= user_with_games.to_dict_with_games()["games"]
    return json.dumps({"games":games})
@game_routes.route('/cart')
@login_required
def cart_games():
    user_with_games = User.query.get(current_user.id)
    cart= user_with_games.to_dict_with_cart()["cart"]
    return json.dumps({"cart":cart})
@game_routes.route('/library', methods=["POST"])
@login_required
def add_to_library():
    user_with_games = User.query.get(current_user.id)
    [user_with_games.user_user_library_game.append(game) for game in user_with_games.user_user_cart_item]
    user_with_games.user_user_cart_item= []
    db.session.commit()
    return json.dumps(user_with_games.to_dict_with_games())
@game_routes.route('/cart/<int:game_id>', methods=["POST"])
@login_required
def add_to_cart(game_id):
    user_with_games = User.query.get(current_user.id)
    game= Game.query.get(game_id)
    user_with_games.user_user_cart_item.append(game)
    db.session.commit()
    return json.dumps(user_with_games.to_dict_with_cart())
@game_routes.route('/cart/<int:game_id>', methods=["DELETE"])
@login_required
def remove_from_cart(game_id):
    user_with_games = User.query.get(current_user.id)
    game= Game.query.get(game_id)
    user_with_games.user_user_cart_item.remove(game)
    db.session.commit()
    return json.dumps(user_with_games.to_dict_with_cart())
