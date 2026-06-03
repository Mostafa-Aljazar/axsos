import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'single_model_orm.settings')

application = get_asgi_application()
