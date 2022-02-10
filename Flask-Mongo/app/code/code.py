import random


class Code:
    def __init__(self):
        self.code = 0

    def getCode(self):
        return self.code

    def genCode(self):
        self.code = int(random.random() * 10000000)
        return self.code
