from pymongo import MongoClient


class Connection:
    # URL con la que hacemos la conexión con MongoDB
    MONGO_URI = "mongodb://127.0.0.1"
    # Cliente con el que nos conectaremos con MongoDB
    client = MongoClient(MONGO_URI)
    # Base de datos a utilizar
    db = client.tesis
    # client = MongoClient(
    #     "mongodb+srv://angel:-210313CyA@cluster0.bcx9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    # )
    # db = client.tesis

    def getTweets(self):
        collection = self.db["tweets"]
        return collection.find()

    def getUsers(self):
        collection = self.db["users"]
        return collection.find()
