from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from decouple import config
<<<<<<< HEAD

from .celery_config import make_celery

def create_app():
    
    app = Flask(__name__)
    
=======
from celery import Celery

def create_app():
    
    
    app = Flask(__name__)
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
    CORS(app) 
    MAIL_USERNAME = config('mail_username')
    MAIL_PWD = config('mail_pwd')
    mail = Mail(app)    
    app.config['MAIL_SERVER']='smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USERNAME'] = MAIL_USERNAME
    app.config['MAIL_PASSWORD'] = MAIL_PWD
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = True
    app.config['MAIL_ASCII_ATTACHMENTS'] = True
    app.config['SECRET_KEY'] = 'your-secret-key'
<<<<<<< HEAD
    
    

=======
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
    mail = Mail(app)
   
    # Register blueprints
    from .user.routes import user
    from .hr_recruiter.routes import recruiter

    app.register_blueprint(user, url_prefix='/user')
    app.register_blueprint(recruiter, url_prefix='/recruiter')
    
<<<<<<< HEAD
    
    return app




=======
    celery = Celery(
        app.name,
        backend='rpc',  # Use RPC backend for simplicity
        broker='memory://'  # Use in-memory broker for simplicity
    )

    return app
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
