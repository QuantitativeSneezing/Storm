from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
class ReviewForm(FlaskForm):
    content = StringField('CONTENT', validators=[DataRequired()])
    rating = BooleanField('RECOMMEND?')
    submit = SubmitField("Create")
