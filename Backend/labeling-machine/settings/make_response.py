"""Module for generate responses."""
import json

headers = {
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
}


def make_response(status_code, **kwargs):
    """Make responses.

    Args:
        status_code: int required is the status code for responses
        kwargs: dict is required and contains all the necessary information for the body

    Returns:
        dic with the built in response
    """
    body = {
        'id_request': kwargs.get('id_request'),
        'message': kwargs.get('message'),
    }
    if kwargs.get('item'):
        body['item'] = kwargs.get('item')
    elif kwargs.get('error'):
        body['error'] = kwargs.get('error')

    if len(kwargs) == 6:
        body['count'] = kwargs.get('count')
        body['total_pages'] = kwargs.get('total_pages')
        body['page'] = kwargs.get('page')
        body['items'] = kwargs.get('items')

    return{
        'statusCode': status_code,
        'headers': headers,
        'body': json.dumps(body),
    }
