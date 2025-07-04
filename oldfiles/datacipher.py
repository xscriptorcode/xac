import os
import base64
from tkinter import Tk, filedialog, Button, Label
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

# Generación de claves RSA
private_key = rsa.generate_private_key(public_exponent=65537, key_size=8192, backend=default_backend())
public_key = private_key.public_key()

def encrypt_file():
    # Seleccionar archivo
    filepath = filedialog.askopenfilename(title="Selecciona el archivo a cifrar")
    if not filepath:
        return

    # Leer archivo
    with open(filepath, "rb") as file:
        file_data = file.read()

    # Generar clave AES
    aes_key = os.urandom(32)
    iv = os.urandom(16)

    # Cifrado AES
    cipher = Cipher(algorithms.AES(aes_key), modes.CFB(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    encrypted_data = encryptor.update(file_data) + encryptor.finalize()

    # Cifrado de la clave AES con RSA
    encrypted_key = public_key.encrypt(
        aes_key,
        padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()), algorithm=hashes.SHA256(), label=None)
    )

    # Codificar todo en Base64
    result = base64.b64encode(iv + encrypted_key + encrypted_data).decode("utf-8")

    # Guardar archivo cifrado
    save_path = filedialog.asksaveasfilename(title="Guardar archivo cifrado", defaultextension=".enc")
    if save_path:
        with open(save_path, "w") as file:
            file.write(result)
        status_label.config(text="Archivo cifrado exitosamente.")

def decrypt_file():
    # Seleccionar archivo cifrado
    filepath = filedialog.askopenfilename(title="Selecciona el archivo a descifrar")
    if not filepath:
        return

    # Leer archivo cifrado
    with open(filepath, "r") as file:
        encrypted_data = base64.b64decode(file.read())

    # Separar IV, clave cifrada y datos cifrados
    iv = encrypted_data[:16]
    encrypted_key = encrypted_data[16:272] 
    ciphertext = encrypted_data[272:]

    # Descifrar clave AES con RSA
    aes_key = private_key.decrypt(
        encrypted_key,
        padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()), algorithm=hashes.SHA256(), label=None)
    )

    # Descifrar datos con AES
    cipher = Cipher(algorithms.AES(aes_key), modes.CFB(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    decrypted_data = decryptor.update(ciphertext) + decryptor.finalize()

    # Guardar archivo descifrado
    save_path = filedialog.asksaveasfilename(title="Guardar archivo descifrado")
    if save_path:
        with open(save_path, "wb") as file:
            file.write(decrypted_data)
        status_label.config(text="Archivo descifrado exitosamente.")

# Interfaz gráfica con Tkinter
root = Tk()
root.title("Cifrado y Descifrado de Archivos")
root.geometry("400x200")

Label(root, text="Cifrado Asimétrico con RSA y AES", font=("Helvetica", 14)).pack(pady=10)
Button(root, text="Cifrar Archivo", command=encrypt_file, width=20).pack(pady=5)
Button(root, text="Descifrar Archivo", command=decrypt_file, width=20).pack(pady=5)
status_label = Label(root, text="", font=("Helvetica", 10), fg="green")
status_label.pack(pady=10)

root.mainloop()
