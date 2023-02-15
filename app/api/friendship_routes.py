from flask import Blueprint, jsonify, session, request
from app.models import Friendship, User
from app.forms import FriendshipForm
from ..models.db import db, environment, SCHEMA, add_prefix_for_prod
import json
from flask_login import current_user,login_required

friendship_routes = Blueprint('friendship', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@friendship_routes.route('/all')
def all_friendships():
    all_friendships= Friendship.query.all()
    return json.dumps({"friendships": [friendship.to_dict_with_users() for friendship in all_friendships]})
@friendship_routes.route('/current')
@login_required
def current_friendships():
    all_friendships = Friendship.query.all()
    dicts= [friendship.to_dict_with_users() for friendship in all_friendships]
    user = current_user
    user= user.to_dict()
    to_return= []
    for friendship in dicts:
        if user in friendship["friends"]:
            to_return.append(friendship)
    return json.dumps({"friendships" :to_return})
@friendship_routes.route('/<int:friendship_id>')
@login_required
def individual_friendship(friendship_id):
    friendship = Friendship.query.get(friendship_id)
    if friendship:
        dicted= friendship.to_dict_with_users()
        return json.dumps(dicted)
    else:
        return {"errors": "Channel couldn't be found"}, 404
@friendship_routes.route('/new/<int:friend_id>', methods=["POST"])
@login_required
def add_friend(friend_id):
    user = User.query.get(current_user.id)
    new_friend= User.query.get(friend_id)
    new_friendship= Friendship(
        nicknameOne= F"{current_user.id}{user.username}",
        nicknameTwo= F"{friend_id}{new_friend.username}"
    )
    new_friendship.friendship_friendship_friends= [user, new_friend]
    db.session.add(new_friendship)
    db.session.commit()
    # db.session.commit()
    return json.dumps(new_friendship.to_dict_with_users())
# TODO: add form for updating nicknames
@friendship_routes.route('/<int:friendship_id>', methods=["PUT"])
@login_required
def update_friends(friendship_id):
    to_edit = Friendship.query.get(friendship_id)
    form= FriendshipForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data= form.data
        if (data["nicknameOne"]):
            to_edit.nicknameOne= data["nicknameOne"]
        if (data["nicknameTwo"]):
            to_edit.nicknameTwo= data["nicknameTwo"]
        db.session.commit()
        return json.dumps(to_edit.to_dict_with_users())
    else:
        return form.errors
@friendship_routes.route('/<int:friendship_id>', methods=["DELETE"])
@login_required
def remove_friend(friendship_id):
    friends = Friendship.query.get(friendship_id)
    db.session.delete(friends)
    db.session.commit()
    return json.dumps("successfully deleted")
