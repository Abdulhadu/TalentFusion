from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app) 

    # Register blueprints
    from .user.routes import user
    from .hr_recruiter.routes import recruiter

    app.register_blueprint(user, url_prefix='/user')
    app.register_blueprint(recruiter, url_prefix='/recruiter')

    return app
