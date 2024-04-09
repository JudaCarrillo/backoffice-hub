from abc import ABC, abstractmethod

class UserProfileEntities(ABC):
    @abstractmethod
    def get_user_profile(self, is_active):
        pass

    @abstractmethod
    def create_user_profile(self):
        pass

    @abstractmethod
    def update_user_profile(self):
        pass

    @abstractmethod
    def delete_user_profile(self):
        pass