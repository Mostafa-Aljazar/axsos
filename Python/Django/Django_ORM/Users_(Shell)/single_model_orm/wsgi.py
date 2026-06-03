import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'single_model_orm.settings')

application = get_wsgi_application()
