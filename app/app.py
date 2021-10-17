"""WebService y API REST para el proyecto de etiquetado de tweets
Modulos y bibliotecas necesarias para levantar el servidor así
como el tratamiento y respuesta de las peticiones."""
import json
import logging
import random

# Bibliotecas necesarias para flask
from bson import json_util
from flask import Flask, render_template, request, Response
from flask_mail import Mail, Message

# Modulos necesarios para la conexión a la base de datos y configuración.
from app.code.code import Code
from app.db.tweets import Tweets
from app.db.user import User
from app.settings.data_settings import OK, EMAIL, PASSWD_EMAIL, FAILED

# Instancias necesarias.
user_manager = User()
tweets_manager = Tweets()
code = Code()
app = Flask(__name__)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


# Configuración para el envio de correos.
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = EMAIL
app.config['MAIL_PASSWORD'] = PASSWD_EMAIL
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

# Instancia para envio de correos electronicos.
mail = Mail(app)

# Variables globales
temp_data = []


@app.route('/test')
def test():
    """Definimos la ruta para hacer pruebas de html.

    Returns:
        [template]: Se renderiza el html para que se pueda mostrar al usuario final
    """
    return render_template('thanks.html')


@app.route('/')
def index():
    """Definimos la ruta inicial.

    Returns:
        [template]: Se renderiza el html para que se pueda mostrar al usuario final
    """
    return render_template('index.html')


@app.route('/sign_up')
def sign_up():
    """Definimos la ruta para el registro de los usuarios.

    Returns:
        [template]: Se renderiza el html para que se pueda mostrar al usuario final
    """
    return render_template('sign_up.html')


@app.route('/restore')
def restore():
    """Ruta para recuperar contraseña  de usuarios.

    Returns:
        [template]: Se renderiza el html para que se pueda mostrar al usuario final
    """
    return render_template('restore.html', code='')


@app.route('/getTweets', methods=['POST'])
def get_tweets():
    """Ruta para obtener los tweets desde DB, solo se puede acceder por el método POST.

    Returns:
        [Response]: JSON y encabezados de la petición
    """
    try:
        if request.method == 'POST':
            name_evaluator = request.json['user']
            stop = request.json['stop']
            list_tweets = json_util.loads(json_util.dumps(tweets_manager.getTweets()))
            final_tweets = [tweet for tweet in list_tweets if tweet['evaluation']]
            tagged_tweets = [tweet for tweet in list_tweets if not tweet['evaluation']]
            indexes = random.sample(range(len(list_tweets)), stop)
            if tagged_tweets:
                for tweet in tagged_tweets:
                    for evaluator in tweet['evaluation']:
                        if evaluator['user'] != name_evaluator:
                            final_tweets.append(tweet)
            response_tweets = []
            for index in indexes:
                final_tweets[index]['index'] = index
                response_tweets.append(final_tweets[index])
            return Response(
                json_util.dumps(response_tweets),
                status=OK,
                mimetype='application/json',
            )
        return Response(
            status=FAILED,
        )
    except Exception as exception:
        logger.exception(exception)
        return Response(
            status=FAILED,
        )


@app.route('/validation', methods=['POST'])
def validation():
    """Ruta para validación de credenciales de usuario.

    Returns:
        [template]: Se renderiza el html para que se pueda mostrar al usuario final
        [Response]: JSON y encabezados de la petición
    """
    try:
        if request.method == 'POST':
            user_page = request.form['email']
            passwd_page = request.form['passwd']
            email_db = json_util.loads(
                json_util.dumps(
                    user_manager.find_user(user_page),
                ),
            )
        if email_db:
            email_dict = email_db[0]
            return (
                render_template('tagging.html', user=email_dict['user'])
                if email_dict['passwd'] == passwd_page
                else render_template('index.html', alert='Contraseña incorrecta')
            )
        return render_template('index.html', alert='Correo no encontrado')
    except Exception:
        return Response(
            status=FAILED,
        )


@app.route('/insert_user', methods=['POST'])
def insert_user():
    """Ruta para registro de nuevo usuarios.

    Returns:
        [template]: Se renderiza el html para que se pueda mostrar al usuario final
    """
    if request.method == 'POST':
        user = request.form['user']
        email = request.form['email']
        passwd = request.form['passwd']
        passwd1 = request.form['passwd1']
        if passwd == passwd1:
            # Almacenamos al usuario en nuestra DB
            response_db = user_manager.insert_user(user, email, passwd)
            if response_db:
                send_mail(
                    email,
                    'Muchas gracias por tu ayuda',
                    '',
                )
                return render_template(
                    'index.html',
                    successful='Registro exitoso, por favor revise su correo electronico (Si no lo visualiza debería de estar en el SPAM)',
                )
            return render_template(
                'index.html',
                alert='Error al registrar el usuario, revise su información',
            )
        return render_template('sign_up.html', alert='Contraseñas distintas')


@app.route('/restore_passwd', methods=['POST'])
def restore_passwd():
    """Ruta para restaurar la contraseña de un usuario.

    Returns:
        [template]: Se renderiza el html para que se pueda mostrar al usuario final
    """
    if request.method == 'POST':
        email_form = request.form['email']
        response = json_util.loads(
            json_util.dumps(
                user_manager.find_user(email_form),
            ),
        )
        code_au = code.genCode()
        if response:
            send_mail(
                email_form,
                'Recuperemos su contraseña',
                '{0} Este es su código para recuperar su contraseña'.format(code_au),
            )
    return (
        render_template('restore.html', code=code_au, email=email_form)
        if response
        else render_template('restore.html', alert='Correo o usuario no encontrado')
    )


@app.route('/restore_passwd_code', methods=['POST'])
def restore_passwd_code():
    """Ruta para restaurar la contraseña de un usuario.

    Returns:
        [template]: Se renderiza el html para que se pueda mostrar al usuario final
    """
    if request.method == 'POST':
        email_form = request.form['email']
        code_form = int(request.form['code'])
        response = json_util.loads(
            json_util.dumps(
                user_manager.find_user(email_form),
            ),
        )
        passwd = request.form['passwd']
        c_passwd = request.form['c_passwd']
        code_au = code.getCode()
        if code_au == int(code_form) and passwd == c_passwd:
            return (
                render_template('index.html', successful='Contraseña reestablecida')
                if user_manager.update_user(response[0]['user'], email_form, passwd)
                else render_template('restore.html', alert='Erro al actualizar')
            )
        else:
            return (
                render_template('restore.html', alert='Los códigos no coiciden')
                if (code_au != code_form)
                else render_template('restore.html', alert='Contraseñas distintas')
            )


@app.route('/saveTags', methods=['POST'])
def save_tags():
    """Ruta para almacenar los tweets etiquetados.

    Returns:
        [Response]: Objeto con encabezado y status de la petición.
    """
    try:
        if request.method == 'POST':
            tweets_tagged = json.loads(request.data)
            # update DB
            # return template with user
            if type(tweets_tagged) is dict:
                tweets = json.loads(tweets_tagged.get('data'))
                for tweet in tweets:
                    temp_data.append(tweet)
                for tweet in temp_data:
                    for evaluation in tweet.get('evaluation'):
                        evaluation['evaluator'] = evaluation['evaluator'].strip()
                        evaluation['timeSession'] = tweets_tagged.get('timelogged')
            else:
                for tweet in tweets_tagged:
                    temp_data.append(tweet)
            return Response(
                status=OK,
            )
    except Exception as exception:
        logger.exception(exception)
        return Response(
            status=FAILED,
        )


@app.route('/wait', methods=['POST', 'GET'])
def wait():
    """Ruta para tomar un descanso.

    Returns:
        [template]: Se renderiza el html para que se pueda mostrar al usuario final
    """
    if request.method == 'POST' or request.method == 'GET':
        user = request.args.get('user')
    return render_template('wait.html', user=user)


@app.route('/return_tagging', methods=['GET'])
def return_taggin():
    """Ruta para tomar un descanso.

    Returns:
        [template]: Se renderiza el html para que se pueda mostrar al usuario final
    """
    if request.method == 'GET':
        user = request.args.get('user')
        return render_template('tagging.html', user=user)


def send_mail(recipients, subject, message):
    """Envio de correos a usuarios

    Args:
        recipients ([string]): Correos a los que seran enviados el mensaje
        subject ([string]): Asunto
        message ([string]): Contenido del correo
    """
    message_text = ''
    if message == '':
        text_html = open('app/templates/thanks.html', 'r')
        message_text = text_html.read()
        text_html.close
    else:
        message_text = message
    msg = Message(
        subject,
        sender=('Ángel Pérez', EMAIL),
        recipients=[recipients],
    )
    msg.html = message_text
    mail.send(msg)
