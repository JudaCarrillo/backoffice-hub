import pika

# Conexión al servidor RabbitMQ
credentials = pika.PlainCredentials('admin', 'admin')

parameters = pika.URLParameters('amqp://admin:admin@172.18.0.1:5672/%2F')

""" parameters = pika.ConnectionParameters(
    # host='127.0.0.1',
    host='172.18.0.2',
    virtual_host='/',
    port=5671,
    credentials=credentials
) """

connection = pika.BlockingConnection(parameters)

# Creación del canal y la cola
channel = connection.channel()
channel.queue_declare(queue='hello')

# Publicación del mensaje en la cola
channel.basic_publish(exchange='', routing_key='hello', body='Hello World!')
print(" [x] Sent 'Hello World!'")

# Cierre de la conexión
connection.close()
