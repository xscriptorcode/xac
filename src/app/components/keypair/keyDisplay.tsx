"use client";

type Props = {
  publicKey: string;
  privateKey: string;
};

export default function KeyDisplay({ publicKey, privateKey }: Props) {
  return (
    <div className="mt-8 rounded-2xl p-6 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg space-y-6 text-[var(--foreground)]">
      <div>
        <h2 className="text-lg font-semibold mb-2">Public Key</h2>
        <textarea
          readOnly
          value={publicKey}
          className="w-full h-48 resize-none overflow-auto bg-white/5 p-3 rounded-lg border border-white/20 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-[var(--foreground)]"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Private Key</h2>
        <textarea
          readOnly
          value={privateKey}
          className="w-full h-48 resize-none overflow-auto bg-white/5 p-3 rounded-lg border border-white/20 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-[var(--foreground)]"
        />
      </div>
    </div>
  );
}
