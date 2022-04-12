"""Models of labeling machine for DynamoDB with PynamoDB."""
import os

from pynamodb.attributes import ListAttribute, UnicodeAttribute
from pynamodb.models import Model

table = os.environ.get('TABLE_NAME')


class Users(Model):
    """Class for users model.

    Args:
        Model ([pynamodb.models]): model for users model
    """

    class Meta:
        """Class for metadata about users model."""

        table_name = table

    PK = UnicodeAttribute(hash_key=True)
    SK = UnicodeAttribute(range_key=True)
    full_name = UnicodeAttribute(default='')
    username = UnicodeAttribute(default='')
    email = UnicodeAttribute(default='')
    age = UnicodeAttribute(default='')
    area = UnicodeAttribute(default='')
    gender = UnicodeAttribute(default='')


class Tweet(Model):
    """Class for tweets model.

    Args:
        Model ([pynamodb.models]): model for tweets model
    """

    class Meta:
        """Class for metadata about users model."""

        table_name = table

    PK = UnicodeAttribute(hash_key=True)
    SK = UnicodeAttribute(range_key=True)
    text = UnicodeAttribute(default='')


class ActivityTweet(Model):
    """Class for activity tweets model.

    Args:
        Model ([pynamodb.models]): model for tweets model
    """

    class Meta:
        """Class for metadata about Activity_Tweets."""

        table_name = table

    PK = UnicodeAttribute(hash_key=True)
    SK = UnicodeAttribute(range_key=True)
    value_violence = UnicodeAttribute(default='')
    value_harassment = UnicodeAttribute(default='')
    time_labeled = UnicodeAttribute(default='')


class ActivitySite(Model):
    """Class for tweets model.

    Args:
        Model ([pynamodb.models]): model for tweets model
    """

    class Meta:
        """Class for metadata about Activity Site."""

        table_name = table

    PK = UnicodeAttribute(hash_key=True)
    SK = UnicodeAttribute(range_key=True)
    total_tweets = UnicodeAttribute(default='')
    logging_start = UnicodeAttribute(default='')
    logging_end = UnicodeAttribute(default='')
    tweets = ListAttribute(default=[])