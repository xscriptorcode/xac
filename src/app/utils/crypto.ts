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
  | { type: "RSA"; bits: 1024 | 2048 | 3072 | 7680 | 15360 }
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

export async function exportKeyToPEM(key: CryptoKey): Promise<string> {
  let format: "pkcs8" | "spki";
  let label: string;

  if (key.type === "private") {
    format = "pkcs8";
    label = "PRIVATE KEY";
  } else if (key.type === "public") {
    format = "spki";
    label = "PUBLIC KEY";
  } else {
    throw new Error("Unsupported key type for export");
  }

  const exported = await crypto.subtle.exportKey(format, key);
  const buffer = new Uint8Array(exported);
  const base64 = btoa(String.fromCharCode(...buffer));
  const lines = base64.match(/.{1,64}/g)?.join("\n");

  return `-----BEGIN ${label}-----\n${lines}\n-----END ${label}-----`;
}

export async function encryptFile(data: Uint8Array, password: string): Promise<Uint8Array> {


  const key = await deriveBaseKey(password);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data instanceof Uint8Array ? data.slice().buffer : new Uint8Array(data).buffer

  );

  const encryptedBytes = new Uint8Array(encrypted);
  const result = new Uint8Array(iv.length + encryptedBytes.length);
  result.set(iv, 0);
  result.set(encryptedBytes, iv.length);
  return result;
}

export async function decryptFile(encryptedData: Uint8Array, password: string): Promise<ArrayBuffer> {
  const key = await deriveBaseKey(password);
  const iv = encryptedData.slice(0, 12);
  const ciphertext = encryptedData.slice(12);

  return await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );
}
