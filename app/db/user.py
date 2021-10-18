"""Modulo para agregar usuarios a la base de datos."""
import logging

from app.db.connection.connection import Connection

# Objeto para visualizar errores
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


class User(Connection):
    """Clase usuario para almacenamiento en la MongoDB.

    Args:
        Connection ([Concection]): Responsable de la conexión a la base de datos
    """

    def __init__(self):
        """Método constructor."""
        super().__init__()
        self.collectionUser = self.db['users']

    def get_users(self):
        """Método para obtener a los usuarios.

        Returns:
            [BSON]: Oobjeto BSON con los datos de los usuarios
        """
        return self.collectionUser.find()

    def insert_user(self, user, email, passwd, gender):
        """Método para agregar usuarios a MongoDB.

        Args:
            user (string): Nombre con el que identificara el usuario
            email (string): Correo electronico del usuario
            passwd (string): Contraseña del ususario
            gender (string): Sexo o género del usuario

        Returns:
            [BSON]: Oobjeto BSON con los datos de los usuarios
        """
        try:
            self.collectionUser.insert_one(
                {
                    '_id': email,
                    'user': user,
                    'email': email,
                    'passwd': passwd,
                    'gender': gender,
                },
            )
        except Exception as exception:
            logger.exception(exception)
            return False
        return True

    def find_user(self, email):
        """Método para buscar un usuario.

        Args:
            email (string): Correo electronico del usuario

        Returns:
            [BSON]: Oobjeto BSON con los datos de los usuarios
        """
        try:
            return self.collectionUser.find(
                {
                    '_id': email,
                },
            )
        except Exception as exception:
            logger.exception(exception)
            return None

    def update_user(self, user, email, passwd):
        """AI is creating summary for update_user

        Args:
            user ([type]): [description]
            email ([type]): [description]
            passwd ([type]): [description]

        Returns:
            [BSON]: Oobjeto BSON con los datos de los usuarios
        """
        filter_db = {
            '_id': email,
        }
        values_db = {
            '$set': {
                '_id': email,
                'user': user,
                'email': email,
                'passwd': passwd,
            }
        }
        try:
            return self.collectionUser.update_one(filter_db, values_db)
        except Exception as exception:
            logger.exception(exception)
            return False
