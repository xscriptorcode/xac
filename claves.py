from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend

def generar_claves():
    """Genera un par de claves RSA."""
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=8192,  # Clave de 8192 bits
        backend=default_backend()
    )
    public_key = private_key.public_key()
    return private_key, public_key

def exportar_clave_privada(private_key, filepath, password):
    """Exporta la clave privada a un archivo protegido con contraseña."""
    with open(filepath, "wb") as key_file:
        key_file.write(private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.TraditionalOpenSSL,
            encryption_algorithm=serialization.BestAvailableEncryption(password.encode("utf-8"))
        ))

def importar_clave_privada(filepath, password):
    """Importa una clave privada desde un archivo."""
    with open(filepath, "rb") as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=password.encode("utf-8"),
            backend=default_backend()
        )
    return private_key
