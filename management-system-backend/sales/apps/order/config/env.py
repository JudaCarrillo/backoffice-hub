import os
from dotenv import load_dotenv


load_dotenv()

env_config = {
    'MICRO': {
        'INTERSERVICES': {
            'AUTH_API_KEY': os.getenv('GENERAL_API_KEY'),
            'ENDPOINT_VALIDATE_USER': os.getenv('ENDPOINT_VALIDATE_USER')
        }
    }
}
