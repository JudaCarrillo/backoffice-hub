class LoginUseCase:
    def __init__(self, login_manager: LoginManager):
        self.login_manager = login_manager

    def execute(self, username: str, password: str):
        self.login_manager.main(username, password)