from django.contrib.auth.hashers import make_password

from .models import User, UserProfile
from .serializers import UserSerializer


class UserServices:

    def get_all(self, base_url) -> dict:
        users = User.objects.values(
            'photo', 'email', 'last_name', 'first_name', 'hire_date',
            'country', 'city', 'home_phone', 'is_active'
        )

        for user in users:
            user['photo'] = f'{base_url}/{user.get("photo")}'

        return {'success': True, 'data': users, 'message': 'Users found'}

    def get_by_id(self, id, base_url) -> dict:

        user = self._user_exists('id', id)
        if not user:
            return {'success': False, 'data': None, 'message': 'User not found'}

        serializer = UserSerializer(user, fields={'photo', 'email', 'last_name', 'first_name',
                                    'hire_date', 'country', 'city', 'address', 'home_phone', 'is_active'}).data

        serializer['photo'] = f'{base_url}{serializer["photo"]}'

        return {'success': True, 'data': serializer, 'message': 'User found'}

    def create(self, request_files: dict, request_data: dict) -> dict:

        email = request_data.get('email')
        id_profile = request_data.get('id_profile')
        reports_to = request_data.get('reports_to')
        password = request_data.get('password')
        is_active = request_data.get('is_active')
        is_active = True if is_active == 'true' else False

        if not (request_files.get('photo') and email and id_profile and reports_to and password):
            return {'success': False, 'data': None, 'message': 'Missing required fields'}

        photo = request_files.get('photo')

        if self._user_exists('email', email):
            return {'success': False, 'data': None, 'message': 'Email is already in use'}

        user_profile = self._profile_exists(id_profile)
        if not user_profile:
            return {'success': False, 'data': None, 'message': 'User Profile not found'}

        user_report = self._user_exists('id', reports_to)
        if not user_report:
            return {'success': False, 'data': None, 'message': 'User to send reports not found'}

        password = make_password(password)
        User.objects.create(
            last_name=request_data.get('last_name'),
            first_name=request_data.get('first_name'),
            title=request_data.get('title'),
            title_of_courtesy=request_data.get('title_of_courtesy'),
            birth_date=request_data.get('birth_date'),
            hire_date=request_data.get('hire_date'),
            address=request_data.get('address'),
            city=request_data.get('city'),
            region=request_data.get('region'),
            postal_code=request_data.get('postal_code'),
            country=request_data.get('country'),
            home_phone=request_data.get('home_phone'),
            extension=request_data.get('extension'),
            photo=photo,
            notes=request_data.get('notes'),
            email=email,
            password=password,
            is_active=is_active,
            reports_to=user_report,
            id_profile=user_profile
        )

        return {'success': True, 'data': None, 'message': 'User created'}

    def _profile_exists(self, id_profile):
        try:
            user_profile = UserProfile.objects.get(id=id_profile)
            return user_profile
        except UserProfile.DoesNotExist:
            return None

    def _user_exists(self, search_type, value):
        search_fields = {
            'id': 'id',
            'email': 'email',
        }

        field_name = search_fields.get(search_type)
        if not field_name:
            return None

        try:
            user = User.objects.get(**{field_name: value})
            return user
        except User.DoesNotExist:
            return None

    def update(self, id, request_files: dict, request_data: dict) -> dict:

        user = self._user_exists('id', id)
        if not user:
            return {'success': False, 'data': None, 'message': 'User not found'}

        if request_files.get('photo'):
            user.photo = request_files.get('photo')

        email = request_data.get('email', user.email)
        reports_to = request_data.get('reports_to', user.reports_to_id)
        id_profile = request_data.get('id_profile', user.id_profile_id)

        if User.objects.filter(email=email).exclude(id=id).exists():
            return {'success': False, 'data': None, 'message': 'Email is already in use'}

        user_profile = self._profile_exists(id_profile)
        if not user_profile:
            return {'success': False, 'data': None, 'message': 'User Profile not found'}

        if id == reports_to:
            return {'success': False, 'data': None, 'message': 'User can not report to himself'}

        user_report = self._user_exists('id', reports_to)
        if not user_report:
            return {'success': False, 'data': None, 'message': 'User to send reports not found'}

        fields_to_update = [
            'last_name', 'first_name', 'title', 'title_of_courtesy', 'birth_date',
            'hire_date', 'address', 'city', 'region', 'postal_code', 'country', 'home_phone', 'extension', 'notes', 'is_active'
        ]

        for field in fields_to_update:
            setattr(user, field, request_data.get(field, getattr(user, field)))

        user.email = email
        user.reports_to_id = reports_to
        user.id_profile_id = user_profile
        user.save()

        return {'success': True, 'data': None, 'message': 'User updated'}

    def disabled(self, id: int):
        user = self._user_exists('id', id)
        if not user:
            return {'success': False, 'data': None, 'message': 'User not found'}

        user.is_active = False
        user.save()

        return {'success': True, 'data': None, 'message': 'User disabled'}

    def get_users_to_report(self):
        users = User.objects.filter(id_profile__lt=3).values(
            'id', 'last_name', 'first_name'
        )

        for user in users:
            user['name'] = f'{user.get("first_name")} {user.get("last_name")}'

        return {'success': True, 'data': users, 'message': 'Users found'}
