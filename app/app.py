# Bibliotecas necesarias
from flask import Flask, render_template, request, Response
from bson import json_util
from flask_mail import Mail, Message
from decouple import config

# Modulos propios
from app.db.user import User
from app.db.tweets import Tweets
from app.code.code import Code

# Instancias
userManager = User()
tweetsManager = Tweets()
code = Code()
app = Flask(__name__)

# Configuración para el envio de correos
app.config["MAIL_SERVER"] = "smtp-mail.outlook.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USERNAME"] = config("EMAIL")
app.config["MAIL_PASSWORD"] = config("EMAIL_PASSWD")
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USE_SSL"] = False

# Instancia para correos electronicos
mail = Mail(app)


# Ruta inicial
# Retorna la pagina principal de la aplicación web
# El parametro es la URI a la cual accederemos
@app.route("/")
def index():
    return render_template("index.html")


# Ruta para registro de usuarios
# El parametro es la URI a la cual accederemos
@app.route("/sign_up")
def sign_up():
    return render_template("sign_up.html")


# Ruta para recuperar contraseña  de usuarios
# El parametro es la URI a la cual accederemos
@app.route("/restore")
def restore():
    return render_template("restore.html", code="")


# Ruta de recuperación de tweets desde DB
# Devuelve en formato JSON los tweets que tengamos almacenados en nuestra DB
# El parametro es la URI a la cual accederemos
@app.route("/getTweets")
def getTweets():
    try:
        if request.method == "GET":
            data = json_util.dumps(tweetsManager.getTweets())
            return Response(
                data,
                status=202,
                mimetype="application/json",
            )
        else:
            return "not Found"
    except Exception:
        return "Server error"


# Ruta para validación de credenciales de usuario
# "/validation" es la URI a la cual accederemos
# parametro methods=["POST"] es el metodo http que usaremos
@app.route("/validation", methods=["POST"])
def validation():
    try:
        if request.method == "POST":
            userPage = request.form["email"]
            passwdPage = request.form["passwd"]
            emailDB = json_util.loads(json_util.dumps(userManager.find_user(userPage)))
        if len(emailDB) != 0:
            emailDict = emailDB[0]
            if emailDict["passwd"] == passwdPage:
                return render_template("tagging.html", user=emailDict["user"])
            else:
                return render_template("index.html", alert="Contraseña incorrecta")
        else:
            return render_template("index.html", alert="Correo no encontrado")
    except Exception:
        return "not_found()"


@app.route("/restore_passwd", methods=["POST"])
def restore_passwd():
    if request.method == "POST":
        email_form = request.form["email"]
        response = json_util.loads(
            json_util.dumps(
                userManager.find_user(email_form),
            ),
        )
        codeAu = code.genCode()
    return (
        render_template("restore.html", code=codeAu, email=email_form)
        if response != 0
        else render_template("render.html", alert="Correo o usuario no encontrado")
    )


@app.route("/restore_passwd_code", methods=["POST"])
def restore_passwd_code():
    if request.method == "POST":
        email_form = request.form["email"]
        codeForm = int(request.form["code"])
        response = json_util.loads(
            json_util.dumps(
                userManager.find_user(email_form),
            ),
        )
        passwd = request.form["passwd"]
        c_passwd = request.form["c_passwd"]
        codeAu = code.getCode()
        if codeAu == int(codeForm) and passwd == c_passwd:
            # Update DB
            print("Algo")
    return (
        render_template("restore.html", code=codeAu, email=email_form)
        if response != 0
        else render_template("render.html", alert="Correo o usuario no encontrado")
    )


# Ruta para registro de nuevo usuarios
# Se accede por medio del método POST
@app.route("/insert_user", methods=["POST"])
def insert_user():
    if request.method == "POST":
        user = request.form["user"]
        email = request.form["email"]
        passwd = request.form["passwd"]
        passwd1 = request.form["passwd1"]
        if passwd == passwd1:
            # Almacenamos al usuario en nuestra DB
            responseDB = userManager.insert_user(user, email, passwd)
            if responseDB:
                sendMail(
                    email,
                    "Muchas gracias por tu ayuda",
                )
                return render_template(
                    "index.html",
                    successful="Registro exitoso, por favor revisa el spam en tu correo",
                )
            else:
                return render_template(
                    "index.html",
                    alert="Error al registrar el usuario, revise su información",
                )
        else:
            return render_template("sign_up.html", alert="Contraseñas distintas")


@app.route("/tagging")
def tagging():
    return render_template("tagging.html")


@app.route("/test")
def test():
    return render_template("test.html")


# Función para envio de correos a usuarios
# Parametros:
#   - recipients: Destinatario
def sendMail(recipients, subject):
    TestHTML = open("app/templates/thanks.html", "r")
    messageTestHTML = TestHTML.read()
    TestHTML.close
    msg = Message(
        subject,
        sender=("Ángel Pérez", config("EMAIL")),
        recipients=[recipients],
    )
    msg.html = messageTestHTML
    mail.send(msg)
