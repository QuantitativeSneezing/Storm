from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
class FriendshipForm(FlaskForm):
    nicknameOne = StringField('Name 1')
    nicknameTwo = StringField('Name 2')
    submit = SubmitField("Create")
