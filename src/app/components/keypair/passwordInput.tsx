"use client";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
};

export default function PasswordInput({ value, onChange }: Props) {
  return (
    <div className="mb-6 text-[var(--foreground)]">
      <label htmlFor="password" className="block text-sm font-semibold mb-2">
        Contraseña
      </label>
      <input
        id="password"
        type="text"
        placeholder="Password to generate the keypair"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-[var(--foreground)]"
      />
    </div>
  );
}
