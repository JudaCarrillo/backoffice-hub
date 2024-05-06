import pika

# Conexión al servidor RabbitMQ
credentials = pika.PlainCredentials('admin', 'admin')

# parameters = pika.URLParameters('amqp://guest:guest@localhost:5672/%2F')

parameters = pika.ConnectionParameters(
    host='main',
    virtual_host='/',
    port=5672,
    credentials=credentials
)

connection = pika.BlockingConnection(parameters)

# Creación del canal y la cola
channel = connection.channel()
channel.queue_declare(queue='hello')

# Publicación del mensaje en la cola
channel.basic_publish(exchange='', routing_key='hello', body='Hello World!')
print(" [x] Sent 'Hello World!'")

# Cierre de la conexión
connection.close()
