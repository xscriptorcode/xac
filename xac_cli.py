#!/usr/bin/env python3

import argparse
import os
from claves import importar_clave_privada
from cryptography.hazmat.primitives import serialization
from cifrado import cifrar_archivo, descifrar_archivo

def cargar_clave_privada(ruta, password):
    with open(ruta, "rb") as f:
        key_data = f.read()
    return serialization.load_pem_private_key(key_data, password.encode(), None)

def cargar_clave_publica(ruta):
    with open(ruta, "rb") as f:
        key_data = f.read()
    return serialization.load_pem_public_key(key_data)

def main():
    parser = argparse.ArgumentParser(description="Cifrar o descifrar archivos usando RSA + AES.")
    parser.add_argument("modo", choices=["cifrar", "descifrar"], help="Modo de operación")
    parser.add_argument("archivo", help="Ruta del archivo a cifrar o descifrar")
    parser.add_argument("--clave", required=True, help="Ruta de la clave pública (para cifrar) o privada (para descifrar)")
    parser.add_argument("--password", help="Contraseña de la clave privada (solo para descifrar)")
    parser.add_argument("--salida", help="Ruta del archivo de salida (opcional)")

    args = parser.parse_args()

    if args.modo == "cifrar":
        public_key = cargar_clave_publica(args.clave)
        cifrado = cifrar_archivo(args.archivo, public_key)
        salida = args.salida or (args.archivo + ".cifrado")
        with open(salida, "wb") as f:
            f.write(cifrado)
        print(f"[✔] Archivo cifrado guardado en: {salida}")

    elif args.modo == "descifrar":
        if not args.password:
            print("Se requiere --password para descifrar con clave privada.")
            return
        private_key = cargar_clave_privada(args.clave, args.password)
        descifrado = descifrar_archivo(args.archivo, private_key)
        salida = args.salida or (args.archivo + ".descifrado")
        with open(salida, "wb") as f:
            f.write(descifrado)
        print(f"[✔] Archivo descifrado guardado en: {salida}")

if __name__ == "__main__":
    main()
