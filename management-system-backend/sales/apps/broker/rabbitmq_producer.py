import json
from pika import BlockingConnection, ConnectionParameters, BasicProperties, DeliveryMode, PlainCredentials, exceptions
from pika.adapters.blocking_connection import BlockingChannel
import traceback

from .config.env import env_config
from .config.constants import EXCHANGE_TYPES


class RabbitMQProducer():

    def __init__(self):
        self.host = env_config['RABBIT_HOST']
        self.port = env_config['RABBIT_PORT']
        self.username = env_config['RABBIT_USERNAME']
        self.password = env_config['RABBIT_PASSWORD']
        self.name_exchange = env_config['RABBIT_NAME_EXCHANGE']

        self.connection: BlockingConnection = None
        self.channel: BlockingChannel = None

    def connect(self):
        """
        Method to connect to RabbitMQ
        """

        try:
            credentials = PlainCredentials(
                username=self.username, password=self.password)

            parameters = ConnectionParameters(
                host=self.host, port=self.port, credentials=credentials)

            self.connection = BlockingConnection(parameters)
            self.channel = self.connection.channel()

        except Exception as e:
            print(f'Error connecting to RabbitMQ: {e}')
            traceback.print_exc()

    def close_connection(self):
        self.connection.close()

    def send_event(self, routing_key: str, message: str):
        self.connect()

        if not self.channel:
            print("Channel is not available.")
            return

        # make sure the message not lost: Durable / True - Delivery_mode / Persistent
        self.channel.exchange_declare(
            exchange=self.name_exchange,
            exchange_type=EXCHANGE_TYPES['TOPIC'],
            durable=True  # when rabbitmq quits or crashes it will not forget the exchange
        )

        message_serialized = json.dumps(message).encode('utf-8')

        self.channel.basic_publish(
            exchange=self.name_exchange,
            routing_key=routing_key,
            body=message_serialized,
            properties=BasicProperties(
                # this done to ensure that the message is persistent
                delivery_mode=DeliveryMode.Persistent
            ))

        print(f'[x] Sent {message} to {self.name_exchange}')
        self.close_connection()
