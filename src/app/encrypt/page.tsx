"use client";

import FileUploader from "@/app/components/fileuploader";
import { useState } from "react";

export default function EncryptPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [bufferSize, setBufferSize] = useState<number | null>(null);

  const handleFileRead = (buffer: ArrayBuffer, file: File) => {
    console.log("Archivo leído:", file.name);
    console.log("Buffer:", buffer.byteLength);

    setFileName(file.name);
    setBufferSize(buffer.byteLength);

    // cypher logic
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Cifrar archivo</h1>

      <FileUploader onFileRead={handleFileRead} />

      {fileName && (
        <div className="mt-4 text-sm text-white">
          <p><strong>Archivo:</strong> {fileName}</p>
          <p><strong>Tamaño leído:</strong> {bufferSize} bytes</p>
        </div>
      )}
    </main>
  );
}
