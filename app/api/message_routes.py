from flask import Blueprint, jsonify, session, request
from app.models import Message
from app.forms import MessageForm
import json
from flask_login import current_user,login_required
from datetime import datetime

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
    all_messages= Message.query.all()
    return json.dumps({"messages": [message.to_dict() for message in all_messages]})
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
    # db.session.commit()
        return json.dumps(new_message.to_dict())
    else:
        return form.errors
