"""Model for users objects."""

import datetime
import logging

from models import entities_model
from settings import settings
from ulid import ULID

User = entities_model.User

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def add_user(full_name, username, email, age, area, gender):
    pass


def remove_user():
    pass

def edit_user():
    pass

def get_users():
    pass

def get_users():
    pass


