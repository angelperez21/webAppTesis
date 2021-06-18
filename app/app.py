from flask import Flask, render_template, request, Response
from bson import json_util
from app.user import User
from app.mail.mail import Mail
from app.tweets import Tweets

app = Flask(__name__)
userManager = User()
tweetsManager = Tweets()
sendMail = Mail()


@app.route("/")
def index():
    return render_template("index.html")


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
                return render_template("tagging.html")
            else:
                return render_template("index.html", alert="Contraseña incorrecta")
        else:
            return render_template("index.html", alert="Correo no encontrado")
    except Exception:
        return "not_found()"


@app.route("/restore")
def restore():
    return render_template("restore.html")


@app.route("/sign_up")
def sign_up():
    return render_template("sign_up.html")


@app.route("/insert_user", methods=["POST"])
def insert_user():
    if request.method == "POST":
        user = request.form["user"]
        email = request.form["email"]
        passwd = request.form["passwd"]
        passwd1 = request.form["passwd1"]
        if passwd == passwd1:
            responseDB = userManager.insert_user(user, email, passwd)
            if responseDB:
                sendMail.send_mail(
                    email,
                    "Muchas gracias por tu ayuda",
                    "Hola, muchísimas gracias por la ayuda, de verdad lo aprecio mucho, si tienes alguna duda no dudes en hacérmela saber",
                )
                return render_template("index.html", successful="Registro exitoso")
            else:
                return "No se realizo registro"
        else:
            return render_template("sign_up.html", alert="Contraseñas distintas")


@app.route("/tagging")
def tagging():
    return render_template("tagging.html")
