from app.connection.connection import Connection


class User(Connection):
    def __init__(self):
        super().__init__()
        self.collectionUser = self.db["users"]

    def getUsers(self):
        return self.collectionUser.find()

    def insert_user(self, user, email, passwd):
        try:
            self.collectionUser.insert_one(
                {"_id": email, "user": user, "email": email, "passwd": passwd}
            )
            return True
        except Exception:
            return False

    def find_user(self, email):
        try:
            return self.collectionUser.find({"_id": email})
        except Exception:
            return "null"
