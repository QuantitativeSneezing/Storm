from flask import Blueprint, jsonify, session, request
from app.models import GameReview
# from app.forms import ServerForm
import json
from flask_login import current_user,login_required

review_routes = Blueprint('review', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@review_routes.route('/all')
def all_reviews():
    all_reviews= GameReview.query.all()
    return json.dumps({"reviews": [review.to_dict_with_users() for review in all_reviews]})
@review_routes.route('/<int:game_id>')
def game_reviews(game_id):
    all_reviews= GameReview.query.filter_by()
    return json.dumps({"reviews": [review.to_dict_with_users() for review in all_reviews]})
