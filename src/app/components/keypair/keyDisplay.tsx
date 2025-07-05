"use client";

import { encryptFile } from "@/app/utils/crypto";
import { useCallback } from "react";

type Props = {
  publicKey: string;
  privateKey: string;
  password: string;
};

export default function KeyDisplay({ publicKey, privateKey, password }: Props) {
  const handleExportEncrypted = useCallback(async () => {
    const encoder = new TextEncoder();
    const encryptedPublic = await encryptFile(
      encoder.encode(publicKey),
      password
    );
    const encryptedPrivate = await encryptFile(
      encoder.encode(privateKey),
      password
    );

    const safeEncryptedPublic = new Uint8Array(encryptedPublic.byteLength);
    safeEncryptedPublic.set(new Uint8Array(encryptedPublic.buffer));

    const safeEncryptedPrivate = new Uint8Array(encryptedPrivate.byteLength);
    safeEncryptedPrivate.set(new Uint8Array(encryptedPrivate.buffer));

    const pubBlob = new Blob([safeEncryptedPublic], {
      type: "application/octet-stream",
    });
    const privBlob = new Blob([safeEncryptedPrivate], {
      type: "application/octet-stream",
    });

    const pubUrl = URL.createObjectURL(pubBlob);
    const privUrl = URL.createObjectURL(privBlob);

    const pubLink = document.createElement("a");
    pubLink.href = pubUrl;
    pubLink.download = "public-key.enc";
    pubLink.click();

    const privLink = document.createElement("a");
    privLink.href = privUrl;
    privLink.download = "private-key.enc";
    privLink.click();

    URL.revokeObjectURL(pubUrl);
    URL.revokeObjectURL(privUrl);
  }, [publicKey, privateKey, password]);

  const handleExportPEM = useCallback((key: string, filename: string) => {
    const blob = new Blob([key], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="mt-8 rounded-2xl p-6 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg space-y-6 text-[var(--foreground)]">
      <div>
        <h2 className="text-lg font-semibold mb-2">Public Key</h2>
        <textarea
          readOnly
          value={publicKey}
          className="w-full h-48 resize-none overflow-auto bg-white/5 p-3 rounded-lg border border-white/20 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-[var(--foreground)]"
        />
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleExportPEM(publicKey, "public-key.pem")}
            className="text-sm px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[var(--foreground)] font-medium hover:bg-white/20 transition duration-300 shadow"
          >
            Export Public Key (.pem)
          </button>
          <button
            onClick={async () => {
              const encoded = new TextEncoder().encode(publicKey);
              const encrypted = await encryptFile(encoded, password);
              const cleanBuffer = new Uint8Array(encrypted.byteLength);
              cleanBuffer.set(new Uint8Array(encrypted.buffer));

              const blob = new Blob([cleanBuffer], {
                type: "application/octet-stream",
              });

              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "public-key.enc";
              link.click();
              URL.revokeObjectURL(url);
            }}
            className="text-sm px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[var(--foreground)] font-medium hover:bg-white/20 transition duration-300 shadow"
          >
            Export Encrypted Public Key
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Private Key</h2>
        <textarea
          readOnly
          value={privateKey}
          className="w-full h-48 resize-none overflow-auto bg-white/5 p-3 rounded-lg border border-white/20 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-[var(--foreground)]"
        />
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleExportPEM(privateKey, "private-key.pem")}
            className="text-sm px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[var(--foreground)] font-medium hover:bg-white/20 transition duration-300 shadow"
          >
            Export Private Key (.pem)
          </button>
          <button
            onClick={async () => {
              const encoded = new TextEncoder().encode(privateKey);
              const encrypted = await encryptFile(encoded, password);
              const cleanBuffer = new Uint8Array(encrypted.byteLength);
              cleanBuffer.set(new Uint8Array(encrypted.buffer));

              const blob = new Blob([cleanBuffer], {
                type: "application/octet-stream",
              });

              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "private-key.enc";
              link.click();
              URL.revokeObjectURL(url);
            }}
            className="text-sm px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[var(--foreground)] font-medium hover:bg-white/20 transition duration-300 shadow"
          >
            Export Encrypted Private Key
          </button>
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <button
          onClick={handleExportEncrypted}
          className="text-sm px-5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[var(--foreground)] font-medium hover:bg-white/20 transition duration-300 shadow"
        >
          Export Both Encrypted Keys
        </button>
      </div>
    </div>
  );
}
