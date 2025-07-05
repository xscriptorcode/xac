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
    <div className="mb-6 space-y-4 text-[currentColor]">
      <label className="block text-sm font-semibold mb-1">Tipo de clave</label>
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded-xl backdrop-blur-md border transition-all ${
            selected.type === "RSA"
              ? "bg-blue-600/80 border-blue-500 text-white"
              : "bg-white/10 border-white/20"
          }`}
          onClick={() => handleTypeChange("RSA")}
        >
          RSA
        </button>
        <button
          className={`px-4 py-2 rounded-xl backdrop-blur-md border transition-all ${
            selected.type === "ECDSA"
              ? "bg-blue-600/80 border-blue-500 text-white"
              : "bg-white/10 border-white/20"
          }`}
          onClick={() => handleTypeChange("ECDSA")}
        >
          ECDSA
        </button>
      </div>

      <label className="block text-sm font-semibold">
        {selected.type === "RSA" ? "Tamaño (bits)" : "Curva elíptica"}
      </label>
      <select
        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-[currentColor]"
        value={selected.type === "RSA" ? selected.bits : selected.curve}
        onChange={(e) => handleOptionChange(e.target.value)}
      >
        {selected.type === "RSA" ? (
          <>
            <option value="1024">1024 bits</option>
            <option value="2048">2048 bits</option>
            <option value="3072">3072 bits</option>
            <option value="7680">7680 bits</option>
            <option value="15360">15360 bits</option>
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
