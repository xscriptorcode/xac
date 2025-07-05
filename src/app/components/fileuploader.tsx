"use client";

import { useRef } from "react";

type Props = {
  onFileRead: (buffer: ArrayBuffer, file: File) => void;
};

export default function FileUploader({ onFileRead }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    onFileRead(arrayBuffer, file);
  };

  return (
    <div className="p-4 border-2 border-dashed border-gray-400 rounded-lg bg-white/10 dark:bg-white/5 hover:border-blue-500 transition-colors">
      <input
        ref={inputRef}
        type="file"
        accept="*"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Seleccionar archivo
      </button>
    </div>
  );
}
