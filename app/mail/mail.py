from decouple import config
from smtplib import SMTP
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import ssl


class Mail:
    def __init__(self):
        self.server = SMTP("smtp.gmail.com", 587)
        self.msg = MIMEMultipart()
        self.context = ssl.create_default_context()

    def send_mail(self, email, subject, message):
        try:
            self.msg["From"] = config("EMAIL")
            self.msg["To"] = email
            self.msg["Subject"] = subject
            self.msg.attach(
                MIMEText(message),
            )
            self.server.starttls(
                context=self.context,
            )
            self.server.login(config("EMAIL"), config("EMAIL_PASSWD"))
            self.server.sendmail(
                config("EMAIL"),
                email,
                self.msg.as_string(),
            )
            self.server.quit()
        except Exception as e:
            print(f"Error: {e}")
