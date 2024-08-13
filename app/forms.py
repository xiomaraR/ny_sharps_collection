from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class AddressForm(FlaskForm):
    address = StringField(default="enter location", validators=[DataRequired()])
    submit = SubmitField("Search")
