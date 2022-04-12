"""Constants for the project."""
import os

AWS_REGION = os.environ.get('REGION_AWS', 'us-east-1')
AWS_DYNAMODB_TABLE = os.environ.get('AWS_DYNAMODB_TABLE')
OK = 200
FAILED = 400
