import os
from dotenv import load_dotenv


load_dotenv()

env_config = {
    'MICRO': {
        'API_KEY': os.getenv('GENERAL_API_KEY')
    }
}
