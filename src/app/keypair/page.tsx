"use client";

import { useState } from "react";
import PasswordInput from "@/app/components/keypair/passwordInput";
import KeyOptionsSelector from "@/app/components/keypair/keyOptionsSelector";
import GenerateButton from "@/app/components/keypair/generateButton";
import KeyDisplay from "@/app/components/keypair/keyDisplay";
import { exportKeyToBase64, KeyOptions } from "@/app/utils/crypto";
import ThemeToggle from "../components/ThemeToggle";

export default function KeyPairPage() {
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState<KeyOptions>({
    type: "RSA",
    bits: 2048,
  });

  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);

  const handleKeysGenerated = async (keyPair: CryptoKeyPair) => {
    const pub = await exportKeyToBase64(keyPair.publicKey);
    const priv = await exportKeyToBase64(keyPair.privateKey);
    setPublicKey(pub);
    setPrivateKey(priv);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto text-white">
        <div className="flex flexcolumn items-center justify-center"><ThemeToggle /></div>
      <h1 className="text-2xl font-bold mb-6">Generar par de claves</h1>

      <PasswordInput value={password} onChange={setPassword} />
      <KeyOptionsSelector selected={options} onChange={setOptions} />
      <GenerateButton
        password={password}
        options={options}
        onKeysGenerated={handleKeysGenerated}
      />

      {publicKey && privateKey && (
        <KeyDisplay publicKey={publicKey} privateKey={privateKey} />
      )}
    </main>
  );
}
