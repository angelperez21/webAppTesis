from app.db.connection.connection import Connection


class Tweets(Connection):
    def __init__(self):
        super().__init__()
        self.collectionTweets = self.db["tweets"]

    def getTweets(self):
        return self.collectionTweets.find()

    def updateTagging(self):
        pass
