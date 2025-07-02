#!/usr/bin/env python3

import argparse
from claves import generar_claves, exportar_clave_privada
from cryptography.hazmat.primitives import serialization

def guardar_clave_publica(public_key, ruta):
    with open(ruta, "wb") as f:
        f.write(public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        ))

def main():
    parser = argparse.ArgumentParser(description="Generar un par de claves RSA (8192 bits) y guardarlas en archivos.")
    parser.add_argument("--privada", required=True, help="Ruta de salida para la clave privada (ej: clave_privada.pem)")
    parser.add_argument("--publica", required=True, help="Ruta de salida para la clave pública (ej: clave_publica.pem)")
    parser.add_argument("--password", required=True, help="Contraseña para proteger la clave privada")

    args = parser.parse_args()

    private_key, public_key = generar_claves()
    exportar_clave_privada(private_key, args.privada, args.password)
    guardar_clave_publica(public_key, args.publica)

    print(f"[✔] Claves generadas con éxito.")
    print(f" - Clave privada: {args.privada}")
    print(f" - Clave pública: {args.publica}")

if __name__ == "__main__":
    main()
