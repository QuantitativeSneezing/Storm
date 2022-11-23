from flask import Blueprint, jsonify, session, request
from app.models import Friendship
# from app.forms import ServerForm
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
