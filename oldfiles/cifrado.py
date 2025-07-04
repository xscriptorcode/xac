import os
import base64
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

def cifrar_archivo(filepath, public_key):
    """Cifra un archivo con AES + RSA."""
    with open(filepath, "rb") as file:
        file_data = file.read()

    aes_key = os.urandom(32)  # Clave AES de 256 bits
    iv = os.urandom(16)       # Vector de inicialización (IV)

    # Cifrado AES
    cipher = Cipher(algorithms.AES(aes_key), modes.CFB(iv))
    encryptor = cipher.encryptor()
    encrypted_data = encryptor.update(file_data) + encryptor.finalize()

    # Cifrado de la clave AES con RSA
    encrypted_key = public_key.encrypt(
        aes_key,
        padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()), algorithm=hashes.SHA256(), label=None)
    )

    # Combinar IV, clave cifrada y datos cifrados en Base64
    result = base64.b64encode(iv + encrypted_key + encrypted_data).decode("utf-8")
    return result

def descifrar_archivo(encrypted_data, private_key):
    """Descifra un archivo cifrado con AES + RSA."""
    encrypted_data = base64.b64decode(encrypted_data)

    # Segmentar IV, clave AES cifrada y datos cifrados
    iv = encrypted_data[:16]
    encrypted_key = encrypted_data[16:1040]  # 1024 bytes para RSA-8192
    ciphertext = encrypted_data[1040:]

    # Descifrar la clave AES con RSA
    aes_key = private_key.decrypt(
        encrypted_key,
        padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()), algorithm=hashes.SHA256(), label=None)
    )

    # Descifrar datos con AES
    cipher = Cipher(algorithms.AES(aes_key), modes.CFB(iv))
    decryptor = cipher.decryptor()
    decrypted_data = decryptor.update(ciphertext) + decryptor.finalize()
    return decrypted_data
