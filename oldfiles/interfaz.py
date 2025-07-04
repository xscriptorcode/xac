import os
import sys
from tkinter import PhotoImage, Tk, filedialog, Button, Label
from claves import generar_claves, exportar_clave_privada, importar_clave_privada
from cifrado import cifrar_archivo, descifrar_archivo
from ttkbootstrap import Style
from ttkbootstrap.constants import *

# Función para obtener la ruta de los recursos (compatible con PyInstaller)
def get_resource_path(relative_path):
    """ Devuelve la ruta correcta del recurso, compatible con PyInstaller """
    try:
        base_path = sys._MEIPASS  # Si el script está congelado en un .exe
    except AttributeError:
        base_path = os.path.abspath(".")  # Si se ejecuta como un script normal

    return os.path.join(base_path, relative_path)

# Cargar el icono con la ruta correcta
icon_path = get_resource_path("icon.png")

# Variables globales para las claves
private_key = None
public_key = None

# Funciones de la interfaz gráfica
def generar_claves_gui():
    global private_key, public_key
    private_key, public_key = generar_claves()
    status_label.config(text="Claves generadas exitosamente.")

def exportar_clave_gui():
    if not private_key:
        status_label.config(text="Primero genera las claves.")
        return
    filepath = filedialog.asksaveasfilename(title="Guardar clave privada", defaultextension=".pem")
    if filepath:
        exportar_clave_privada(private_key, filepath, "mi_contrasena")
        status_label.config(text="Clave privada exportada exitosamente.")

def importar_clave_gui():
    global private_key, public_key
    filepath = filedialog.askopenfilename(title="Selecciona la clave privada")
    if filepath:
        private_key = importar_clave_privada(filepath, "mi_contrasena")
        public_key = private_key.public_key()
        status_label.config(text="Clave privada importada exitosamente.")

def cifrar_archivo_gui():
    if not public_key:
        status_label.config(text="Primero genera o importa una clave.")
        return
    filepath = filedialog.askopenfilename(title="Selecciona el archivo a cifrar")
    if filepath:
        encrypted_data = cifrar_archivo(filepath, public_key)
        save_path = filedialog.asksaveasfilename(title="Guardar archivo cifrado", defaultextension=".enc")
        if save_path:
            with open(save_path, "w") as file:
                file.write(encrypted_data)
            status_label.config(text="Archivo cifrado exitosamente.")

def descifrar_archivo_gui():
    if not private_key:
        status_label.config(text="Primero importa una clave privada.")
        return
    filepath = filedialog.askopenfilename(title="Selecciona el archivo a descifrar")
    if filepath:
        with open(filepath, "r") as file:
            encrypted_data = file.read()
        decrypted_data = descifrar_archivo(encrypted_data, private_key)
        save_path = filedialog.asksaveasfilename(title="Guardar archivo descifrado")
        if save_path:
            with open(save_path, "wb") as file:
                file.write(decrypted_data)
            status_label.config(text="Archivo descifrado exitosamente.")

def exportar_clave_publica_gui():
    if not public_key:
        status_label.config(text="Primero genera o importa una clave.")
        return
    filepath = filedialog.asksaveasfilename(title="Guardar clave pública", defaultextension=".pem",
                                            filetypes=[("Archivo PEM", "*.pem")])
    if filepath:
        try:
            from claves import exportar_clave_publica
            exportar_clave_publica(public_key, filepath)
            status_label.config(text=f"Clave pública exportada exitosamente en: {filepath}")
        except Exception as e:
            status_label.config(text=f"Error al exportar la clave pública: {e}")

# Configuración de la interfaz gráfica con ttkbootstrap
style = Style(theme="darkly")
root = style.master
root.title("X-A-Cypher")
root.geometry("400x250")

# Cargar el icono si existe
if os.path.exists(icon_path):
    icon = PhotoImage(file=icon_path)
    root.iconphoto(True, icon)
else:
    print(f"Advertencia: No se encontró el icono en {icon_path}")

# Elementos de la interfaz
Label(root, text="X-A-C", font=("Times New Roman", 14)).pack(pady=10)
Button(root, text="Generar Claves", command=generar_claves_gui, width=25).pack(pady=5)
Button(root, text="Exportar Clave Privada", command=exportar_clave_gui, width=25).pack(pady=5)
Button(root, text="Importar Clave Privada", command=importar_clave_gui, width=25).pack(pady=5)
Button(root, text="Cifrar Archivo", command=cifrar_archivo_gui, width=25).pack(pady=5)
Button(root, text="Descifrar Archivo", command=descifrar_archivo_gui, width=25).pack(pady=5)
Button(root, text="Exportar Clave Pública", command=exportar_clave_publica_gui, width=25).pack(pady=5)

status_label = Label(root, text="", font=("Times New Roman", 10), fg="green")
status_label.pack(pady=10)

# Ejecutar la interfaz
root.mainloop()
