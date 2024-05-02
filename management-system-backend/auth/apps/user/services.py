from django.contrib.auth.hashers import make_password

from .models import User, UserProfile
from .serializers import UserSerializer, CustomUserSerializer


class UserServices:

    def get_all(self, base_url) -> dict:
        users = User.objects.values(
            'photo', 'email', 'last_name', 'first_name', 'hire_date',
            'country', 'city', 'address', 'home_phone', 'is_active'
        )

        for user in users:
            user['photo'] = f'{base_url}/{user.get("photo")}'

        return {'success': True, 'data': users, 'message': 'Users found'}

    def get_by_id(self, id, base_url) -> dict:
        user = User.objects.values(
            'photo', 'email', 'last_name', 'first_name', 'hire_date',
            'country', 'city', 'address', 'home_phone', 'is_active'
        ).get(id=id)

        if not user.values():
            return {'success': False, 'data': None, 'message': 'User not found'}

        user['photo'] = f'{base_url}/{user.get("photo")}'
        return {'success': True, 'data': user, 'message': 'User found'}

    def _user_exists(self, id: int) -> dict:
        try:
            user = User.objects.values(
                'photo', 'email', 'last_name', 'first_name', 'hire_date',
                'country', 'city', 'address', 'home_phone', 'extension'
            ).get(id=id)

            return {'success': True, 'data': user}
        except User.DoesNotExist:
            return {'success': False, 'data': None}

    def create(self,
               last_name, first_name, title, title_of_courtesy, birth_date, hire_date, address, city, region, postal_code, country, home_phone, extension, photo, notes, email, password,
               is_active, reports_to, id_profile
               ) -> dict:

        if not photo:
            return {'success': False, 'data': None, 'message': 'The photo is required'}

        if not self._email_exists(email):
            return {'success': False, 'data': None, 'message': 'The email is already registered'}

        user_profile = self._profile_exists(id_profile)
        if not user_profile.get('success'):
            return {'success': False, 'data': None, 'message': 'User Profile not found'}

        try:
            user_report = User.objects.get(id=reports_to)
        except User.DoesNotExist:
            return {'success': False, 'data': None, 'message': 'User to send reports not found'}

        password = self._hash_password(password)
        user = User.objects.create(
            last_name=last_name,
            first_name=first_name,
            title=title,
            title_of_courtesy=title_of_courtesy,
            birth_date=birth_date,
            hire_date=hire_date,
            address=address,
            city=city,
            region=region,
            postal_code=postal_code,
            country=country,
            home_phone=home_phone,
            extension=extension,
            photo=photo,
            notes=notes,
            email=email,
            password=password,
            is_active=is_active,
            reports_to=user_report.get('data'),
            id_profile=user_profile.get('data')
        )

        serializer = UserSerializer(user)
        return {'success': True, 'data': serializer.data, 'message': 'User created'}

    def _hash_password(self, password):
        return make_password(password)

    def _profile_exists(self, id_profile):
        try:
            user_profile = UserProfile.objects.get(id=id_profile)
            return {'success': True, 'data': user_profile}
        except UserProfile.DoesNotExist:
            return {'success': False, 'data': None}

    def _email_exists(self, emai: str):
        try:
            User.objects.get(email=value_to_validate)
            return False
        except User.DoesNotExist:
            return True

    def update(self, id: int, username: str, email: str, password: str, is_active: bool, id_profile: int) -> dict:

        user = self._user_exists(id)
        if not user.get('success'):
            return {'success': False, 'data': None, 'message': 'User not found'}

        if User.objects.filter(username=username).exclude(id=id).exists():
            return {'success': False, 'data': None, 'message': 'Username is already in use'}

        if not self._profile_exists(id_profile):
            return {'success': False, 'data': None, 'message': 'User Profile not found'}

        password = self._hash_password(password)

        data = {
            'username': username,
            'email': email,
            'password': password,
            'is_active': is_active,
            'id_profile': id_profile
        }

        try:
            serializer = CustomUserSerializer(
                user.get('data'), data=data, partial=True)

            if not serializer.is_valid():
                return {'success': False, 'data': None, 'message': 'The user was not updated. ' + str(serializer.errors)}

            serializer.save()
            return {'success': True, 'data': serializer.data, 'message': 'User updated'}

        except Exception as e:
            return {'success': False, 'data': None, 'message': 'The user was not updated. ' + str(e)}

    def disabled(self, id: int):

        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return {'success': False, 'data': None, 'message': 'User not found'}

        if not user:
            return {'success': False, 'data': None, 'message': 'User not found'}

        user.is_active = False
        user.save()

        serializer = UserSerializer(user, fields={
            'email', 'last_name', 'first_name', 'hire_date',
            'country', 'city', 'address', 'home_phone', 'is_active'
        })
        return {'success': True, 'data': serializer.data, 'message': 'User disabled'}
