"use client";

type KeyOptions =
  | { type: "RSA"; bits: 2048 | 3072 | 4096 }
  | { type: "ECDSA"; curve: "P-256" | "P-384" | "P-521" };

type Props = {
  password: string;
  options: KeyOptions;
  onKeysGenerated: (keyPair: CryptoKeyPair) => void;
};

export default function GenerateButton({ password, options, onKeysGenerated }: Props) {
  const handleGenerate = async () => {
    if (!password) {
      alert("Introduce una contraseña antes de generar las claves.");
      return;
    }

    const { generateKeyPairFromPassword } = await import("@/app/utils/crypto");
    const keyPair = await generateKeyPairFromPassword(password, options);
    onKeysGenerated(keyPair);
  };

  return (
    <button
      onClick={handleGenerate}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Generar par de claves
    </button>
  );
}
