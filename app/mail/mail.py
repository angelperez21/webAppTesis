from decouple import config
from smtplib import SMTP
import email.message
import ssl


class Mail:
    def __init__(self):
        # Definimos la URI y el puerto del servicio
        self.server = SMTP("smtp.gmail.com", 587)
        self.context = ssl.create_default_context()
        self.message = open("app/templates/thanks.html", "r")
        self.email_content = self.message.read()
        self.msg = email.message.Message()

    def send_mail(self, email, subject, message):
        try:
            # Datos para envio de correo
            self.msg["From"] = config("EMAIL")
            self.msg["To"] = email
            self.msg["Subject"] = "Mail Test"
            # Cabeceras del email
            self.msg.add_header("Content-Type", "text/html")
            self.msg.set_payload(self.email_content)
            # iniciamos el servicio con SSL
            self.server.starttls(
                context=self.context,
            )
            # Nos loggeamos con variables de entorno
            self.server.login(config("EMAIL"), config("EMAIL_PASSWD"))
            self.server.sendmail(
                config("EMAIL"),
                email,
                self.msg.as_string().encode("utf-8"),
            )
            self.server.quit()
        except Exception as e:
            print(f"Error: {e}")
