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
      className="mt-4 w-full px-5 py-3 rounded-2xl 
                 bg-white/10 backdrop-blur-md 
                 border border-white/20 
                 text-[var(--foreground)] font-semibold 
                 hover:bg-white/20 transition duration-300 shadow-md"
    >
      Generar par de claves
    </button>
  );
}
