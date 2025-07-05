"use client";

import { useState } from "react";
import FileUploader from "@/app/components/fileuploader";
import PasswordInput from "@/app/components/keypair/passwordInput";
import EncryptButton from "@/app/components/keypair/generateButton";
// import DownloadLink from "@/app/components/keypair/";  needs to define
// import { encryptBufferWithPassword } from "@/utils/encryption"; // implement after

export default function EncryptPage() {
  const [file, setFile] = useState<File | null>(null);
  const [buffer, setBuffer] = useState<ArrayBuffer | null>(null);
  const [password, setPassword] = useState("");
  const [encryptedBlob, setEncryptedBlob] = useState<Blob | null>(null);

  const handleFileRead = (buffer: ArrayBuffer, file: File) => {
    setFile(file);
    setBuffer(buffer);
    setEncryptedBlob(null); // reinicia si se sube otro archivo
  };

  const handleEncrypt = async () => {
    if (!buffer || !password) {
      alert("Sube un archivo y escribe una contraseña.");
      return;
    }

    const encrypted = await encryptBufferWithºPassword(buffer, password);
    setEncryptedBlob(new Blob([encrypted]));
  };

  return (
    <main className="p-6 max-w-xl mx-auto text-white">
      <h1 className="text-2xl font-semibold mb-4">Cifrar archivo</h1>

      <FileUploader onFileRead={handleFileRead} />

      {file && (
        <div className="mt-4 text-sm">
          <p><strong>Archivo:</strong> {file.name}</p>
          <p><strong>Tamaño:</strong> {file.size} bytes</p>
        </div>
      )}

      <div className="mt-6">
        <PasswordInput value={password} onChange={setPassword} />
        <EncryptButton onClick={handleEncrypt} disabled={!buffer || !password} />
      </div>

      {// {encryptedBlob && (
        //<DownloadLink blob={encryptedBlob} filename={file!.name + ".enc"} />
      //)}
       }
    </main>
  );
}
