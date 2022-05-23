from pymongo import MongoClient


class Connection:
    # URL con la que hacemos la conexión con MongoDB
    MONGO_URI = "mongodb+srv://angelpa:-Angel082911@tweets.sibcw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    # Cliente con el que nos conectaremos con MongoDB
    client = MongoClient(MONGO_URI)
    # Base de datos a utilizar
    db = client.tesis
    # client = MongoClient(
    #     "mongodb+srv://angel:-210313CyA@cluster0.bcx9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    # )
    # db = client.tesis
