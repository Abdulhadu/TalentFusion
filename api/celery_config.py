from celery import Celery
import os

def make_celery(app):
    os.environ.setdefault('FORKED_BY_MULTIPROCESSING', '1')
    celery = Celery(
        app.import_name,
        backend="redis://localhost:6379/0",
        broker="redis://localhost:6379/0"
        
    )
    celery.conf.update(app.config)
    celery.set_default()
    return celery