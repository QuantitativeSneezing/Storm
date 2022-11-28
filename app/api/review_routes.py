from flask import Blueprint, jsonify, session, request
from app.models import GameReview
from ..forms import ReviewForm
import json
from flask_login import current_user,login_required
from ..models.db import db, environment, SCHEMA, add_prefix_for_prod


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
    return json.dumps({"reviews": [review.to_dict() for review in all_reviews]})
@review_routes.route('/<int:game_id>')
def game_reviews(game_id):
    id= game_id
    all_reviews= GameReview.query.filter_by(game_id=id)
    return json.dumps({"reviews": [review.to_dict() for review in all_reviews]})
@review_routes.route('/<int:game_id>', methods=["POST"])
@login_required
def add_review(game_id):
    form = ReviewForm()
    data = form.data
    username= current_user.username
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = GameReview(content=data["content"], rating=data["rating"],
                            game_id=game_id, reviewer_id=current_user.id, title=username)
        db.session.add(new_review)
        db.session.commit()
        return json.dumps(new_review.to_dict())
    else:
         return form.errors
@review_routes.route('/<int:review>', methods=["PUT"])
@login_required
def edit_review(review_id):
    form = ReviewForm()
    data = form.data
    # sender_id = current_user.id

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
            data= form.data
            review= GameReview.query.get(review_id)
            review.content= data["content"]
            review.rating= data["rating"]
            db.session.commit()
            return json.dumps(review.to_dict())
    else:
         return form.errors
@review_routes.route('/<int:review>', methods=["DELETE"])
@login_required
def delete_review(review_id):
    # sender_id = current_user.id
    review= GameReview.query.get(review_id)
    if (review):
        db.session.delete(review)
        db.session.commit()
        return json.dumps("Successfully deleted")
    else :
        return json.dumps("Review not found")
