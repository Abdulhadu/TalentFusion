from . import create_app
<<<<<<< HEAD
from .celery_config import make_celery

app = create_app()
celery = make_celery(app)

=======

app = create_app()
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131


if __name__ == '__main__':
    app.run(debug = True)