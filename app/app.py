from flask import Flask, render_template, request
from app.user import User
from bson import json_util


# , Response, jsonify

app = Flask(__name__)
userManage = User()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/validation", methods=["POST"])
def validation():
    try:
        if request.method == "POST":
            userPage = request.form["email"]
            passwdPage = request.form["passwd"]
            emailDB = json_util.loads(json_util.dumps(userManage.find_user(userPage)))
        if len(emailDB) != 0:
            print(emailDB[0]["email"])
            if emailDB[0]["passwd"] == passwdPage:
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
            responseDB = userManage.insert_user(user, email, passwd)
            if responseDB:
                return render_template("index.html", successful="Registro exitoso")
            else:
                return "no se agrego registro"
        else:
            return render_template("sign_up.html", alert="Contraseñas distintas")


# @app.errorhandler(404)
# def not_found():
#     message = jsonify(
#         {
#             "message": "Resource not found" + request.url,
#         }
#     )
#     response = Response(
#         message,
#         status=404,
#         mimetype="application/json",
#     )
#     return response
