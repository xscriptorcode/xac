"use client";
async function deriveBaseKey(password: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const salt = encoder.encode("XAC-Static-Salt");

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"]
  );
}

export type KeyOptions =
  | { type: "RSA"; bits: 2048 | 3072 | 4096 }
  | { type: "ECDSA"; curve: "P-256" | "P-384" | "P-521" };

export async function generateKeyPairFromPassword(
  password: string,
  options: KeyOptions
): Promise<CryptoKeyPair> {
  await deriveBaseKey(password);

  if (options.type === "RSA") {
    return await crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: options.bits,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"]
    );
  } else if (options.type === "ECDSA") {
    return await crypto.subtle.generateKey(
      {
        name: "ECDSA",
        namedCurve: options.curve,
      },
      true,
      ["sign", "verify"]
    );
  }

  throw new Error("Invalid key type");
}

export async function exportKeyToBase64(key: CryptoKey): Promise<string> {
  const format = key.type === "private" ? "pkcs8" : "spki";
  const exported = await crypto.subtle.exportKey(format, key);
  const buffer = new Uint8Array(exported);
  return btoa(String.fromCharCode(...buffer));
}
