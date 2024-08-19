from . import create_app
from .celery_config import make_celery

app = create_app()
celery = make_celery(app)

app = create_app()

if __name__ == '__main__':
    app.run(debug = True)