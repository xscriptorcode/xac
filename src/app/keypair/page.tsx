"use client";

import { useState } from "react";
import PasswordInput from "@/app/components/keypair/passwordInput";
import KeyOptionsSelector from "@/app/components/keypair/keyOptionsSelector";
import GenerateButton from "@/app/components/keypair/generateButton";
import KeyDisplay from "@/app/components/keypair/keyDisplay";
import { exportKeyToPEM, KeyOptions } from "@/app/utils/crypto";
import ThemeToggle from "@/app/components/ThemeToggle";

export default function KeyPairPage() {
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState<KeyOptions>({
    type: "RSA",
    bits: 2048,
  });

  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const allowedBits = [1024, 2048, 3072, 7680, 15360] as const;
  const allowedCurves = ["P-256", "P-384", "P-521"] as const;

  const handleKeysGenerated = async (keyPair: CryptoKeyPair) => {
    const pub = await exportKeyToPEM(keyPair.publicKey);
    const priv = await exportKeyToPEM(keyPair.privateKey);
    setPublicKey(pub);
    setPrivateKey(priv);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto text-white">
      <div className="flex flexcolumn items-center justify-center">
        <ThemeToggle />
      </div>
      <h1 className="mt-8 text-2xl flex justify-center font-bold mb-6 text-[color:var(--foreground)]">
        X Art Cypher
      </h1>

      <PasswordInput value={password} onChange={setPassword} />
      <KeyOptionsSelector
        selected={options}
        onChange={(newValue) => {
          if (
            newValue.type === "RSA" &&
            allowedBits.includes(newValue.bits as (typeof allowedBits)[number])
          ) {
            setOptions({
              type: "RSA",
              bits: newValue.bits as (typeof allowedBits)[number],
            });
          } else if (
            newValue.type === "ECDSA" &&
            allowedCurves.includes(
              newValue.curve as (typeof allowedCurves)[number]
            )
          ) {
            setOptions({
              type: "ECDSA",
              curve: newValue.curve as (typeof allowedCurves)[number],
            });
          }
        }}
      />

      <div className="flex">
        <GenerateButton
          password={password}
          options={options}
          onKeysGenerated={handleKeysGenerated}
        />
      </div>
      {publicKey && privateKey && (
        <KeyDisplay
          publicKey={publicKey}
          privateKey={privateKey}
          password={password}
        />
      )}
    </main>
  );
}
