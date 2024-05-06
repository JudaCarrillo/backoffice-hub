from .config.env import env_config


class Guard:

    def api_key_check(self, request):
        api_key = request.headers.get('api_Key')

        if api_key != env_config['MICRO']['API_KEY']:
            return False

        return True
