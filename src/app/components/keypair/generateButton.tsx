"use client";

import { LockIcon } from "../icons/cryptoIcons";

type KeyOptions =
  | { type: "RSA"; bits: 2048 | 3072 | 4096 }
  | { type: "ECDSA"; curve: "P-256" | "P-384" | "P-521" };

type Props = {
  password: string;
  options: KeyOptions;
  onKeysGenerated: (keyPair: CryptoKeyPair) => void;
};

export default function GenerateButton({
  password,
  options,
  onKeysGenerated,
}: Props) {
  const handleGenerate = async () => {
    const inputEl = document.getElementById("password") as HTMLInputElement;
    if (!password) {
      inputEl?.setCustomValidity("Don't leave this empty");
      inputEl?.reportValidity();
      return;
    }

    const { generateKeyPairFromPassword } = await import("@/app/utils/crypto");
    const keyPair = await generateKeyPairFromPassword(password, options);
    onKeysGenerated(keyPair);
  };

  return (
    <button
      onClick={handleGenerate}
      className="mt-4 mx-auto px-4 py-2 w-fit rounded-xl
      bg-white/10 backdrop-blur-md
      border border-[color:var(--foreground)]/20
      text-[color:var(--foreground)] font-semibold
      hover:bg-white/20 transition duration-300 shadow-md
      inline-flex items-center gap-2"
    >
      Generate <LockIcon />
    </button>
  );
}
