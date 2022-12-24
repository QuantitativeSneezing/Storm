from flask import Blueprint, jsonify, session, request
from app.models import Message
from app.forms import MessageForm
import json
from flask_login import current_user,login_required
from datetime import datetime
from ..models.db import db, environment, SCHEMA, add_prefix_for_prod

message_routes = Blueprint('message', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@message_routes.route('/all')
def all_messages():
    # print("HIT--------------------------------------------------------------------------------------------")
    all_messages= Message.query.all()
    return json.dumps({"messages": [message.to_dict() for message in all_messages]})
@message_routes.route('/<int:friendship_id>')
def friendship_messages(friendship_id):
    all_messages= Message.query.filter_by(friendship_id=friendship_id)
    return json.dumps({"messages": [message.to_dict() for message in all_messages]})
@message_routes.route('/edit/<int:message_id>', methods=["PUT"])
@login_required
def edit_message(message_id):
    form= MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message= Message.query.get(message_id)
        data= form.data
        message.content= data["content"]
        db.session.commit()
        return json.dumps(message.to_dict())
    else:
        return form.errors
        # return {"message": "Message successfully seleted", "status code": 302}, 302


@message_routes.route('/new/<int:friendship_id>', methods=["POST"])
@login_required
def create_message(friendship_id):
    id=friendship_id
    form= MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        current_time = datetime.now()
        data= form.data
        new_message= Message(
            content= data["content"],
            friendship_id=id,
            sender_id= current_user.id,
            created_at= current_time
        )
        db.session.add(new_message)
        db.session.commit()
        return json.dumps(new_message.to_dict())
    else:
        return form.errors
@message_routes.route('/<int:message_id>', methods=["DELETE"])
@login_required
def remove_friend(message_id):
    message = Message.query.get(message_id)
    db.session.delete(message)
    db.session.commit()
    # db.session.commit()
    return json.dumps("successfully deleted")

    # return "HELLO"
