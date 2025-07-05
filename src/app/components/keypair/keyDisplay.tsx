"use client";

type Props = {
  publicKey: string;
  privateKey: string;
};

export default function KeyDisplay({ publicKey, privateKey }: Props) {
  return (
    <div className="mt-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Clave pública</h2>
        <textarea
          readOnly
          value={publicKey}
          className="w-full h-32 bg-white/10 text-white p-2 rounded border border-white/20"
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold">Clave privada</h2>
        <textarea
          readOnly
          value={privateKey}
          className="w-full h-32 bg-white/10 text-white p-2 rounded border border-white/20"
        />
      </div>
    </div>
  );
}
