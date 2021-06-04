from connection.connection import Connection


class tweets(Connection):
    def __init__(self):
        super.__init__()
        self.collectionTweets = self.db["tesis"]

    def insertTagging(self):
        pass

    def updateTagging(self):
        pass
