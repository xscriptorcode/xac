"use client";

import { useState } from "react";

type KeyType = "RSA" | "ECDSA";

type Props = {
  selected: { type: KeyType; bits?: number; curve?: string };
  onChange: (newValue: { type: KeyType; bits?: number; curve?: string }) => void;
};

export default function KeyOptionsSelector({ selected, onChange }: Props) {
  const handleTypeChange = (type: KeyType) => {
    if (type === "RSA") {
      onChange({ type: "RSA", bits: 2048 });
    } else {
      onChange({ type: "ECDSA", curve: "P-256" });
    }
  };

  const handleOptionChange = (value: string) => {
    if (selected.type === "RSA") {
      onChange({ type: "RSA", bits: parseInt(value) });
    } else {
      onChange({ type: "ECDSA", curve: value });
    }
  };

  return (
    <div className="mb-4 space-y-2">
      <label className="block text-sm font-medium text-white mb-1">Tipo de clave</label>
      <div className="flex gap-4">
        <button
          className={`px-3 py-1 rounded ${
            selected.type === "RSA" ? "bg-blue-600 text-white" : "bg-white/10 text-white"
          }`}
          onClick={() => handleTypeChange("RSA")}
        >
          RSA
        </button>
        <button
          className={`px-3 py-1 rounded ${
            selected.type === "ECDSA" ? "bg-blue-600 text-white" : "bg-white/10 text-white"
          }`}
          onClick={() => handleTypeChange("ECDSA")}
        >
          ECDSA
        </button>
      </div>

      <label className="block text-sm font-medium text-white mt-4">
        {selected.type === "RSA" ? "Tamaño (bits)" : "Curva elíptica"}
      </label>
      <select
        className="mt-1 w-full bg-white/10 text-white border border-white/20 rounded px-3 py-2"
        value={selected.type === "RSA" ? selected.bits : selected.curve}
        onChange={(e) => handleOptionChange(e.target.value)}
      >
        {selected.type === "RSA" ? (
          <>
            <option value="2048">2048 bits</option>
            <option value="3072">3072 bits</option>
            <option value="4096">4096 bits</option>
          </>
        ) : (
          <>
            <option value="P-256">P-256</option>
            <option value="P-384">P-384</option>
            <option value="P-521">P-521</option>
          </>
        )}
      </select>
    </div>
  );
}
