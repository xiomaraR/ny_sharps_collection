from flask import Flask
from dotenv import load_dotenv
import os


def create_app(config_class=None):
    app = Flask(__name__, static_folder="static", static_url_path="/static")
    load_dotenv()  # Load environment variables from .env file

    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["LOCATIONIQ_API_KEY"] = os.getenv("LOCATIONIQ_API_KEY")
    app.config["HEALTH_API_TOKEN"] = os.getenv("HEALTH_API_TOKEN")

    from app.routes import bp as routes_bp

    app.register_blueprint(routes_bp, url_prefix="/")

    return app
