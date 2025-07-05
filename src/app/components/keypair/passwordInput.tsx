"use client";

import { PasswordIcon } from "../icons/cryptoIcons";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
};

export default function PasswordInput({ value, onChange }: Props) {
  return (
    <div className="mb-6 flex flex-col items-center text-[color:var(--foreground)] space-y-2">
      <label htmlFor="password" className="text-xs font-semibold text-center">
        <PasswordIcon />
      </label>
      <input
        id="password"
        type="text"
        placeholder="Password to create keypair"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-60 px-4 py-2 rounded-xl backdrop-blur-md
                   bg-[color:var(--background)]/10 text-[color:var(--foreground)]
                   border border-[color:var(--foreground)]/30
                   shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition
                   placeholder:text-[color:var(--foreground)]/50"
      />
    </div>
  );
}
