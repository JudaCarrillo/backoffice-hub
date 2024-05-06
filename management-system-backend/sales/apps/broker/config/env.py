import os
from dotenv import load_dotenv

load_dotenv()

env_config = {
    'RABBIT_PROTOCOL': os.environ.get('RABBIT_PROTOCOL'),
    'RABBIT_PORT': os.environ.get('RABBIT_PORT'),
    'RABBIT_USERNAME': os.environ.get('RABBIT_USERNAME'),
    'RABBIT_PASSWORD': os.environ.get('RABBIT_PASSWORD'),
    'RABBIT_VHOST': os.environ.get('RABBIT_VHOST'),
    'RABBIT_HOST': os.environ.get('RABBIT_HOST'),
    'RABBIT_NAME_EXCHANGE': os.environ.get('RABBIT_NAME_EXCHANGE'),
}
