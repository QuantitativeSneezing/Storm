from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
class MessageForm(FlaskForm):
    content= StringField("Message", validators=[DataRequired()])
    # submit= SubmitField("CREATE")
