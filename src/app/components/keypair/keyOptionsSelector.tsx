"use client";

type KeyType = "RSA" | "ECDSA";

type Props = {
  selected: { type: KeyType; bits?: number; curve?: string };
  onChange: (newValue: { type: KeyType; bits?: number; curve?: string }) => void;
};

export default function KeyOptionsSelector({ selected, onChange }: Props) {
  const handleTypeChange = (type: KeyType) => {
    if (type === "RSA") {
      onChange({ type: "RSA", bits: 1024 });
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
    <div className="mb-6 flex flex-col items-center space-y-4 text-[color:var(--foreground)]">
      <label className="block text-sm font-semibold mb-1 text-center">Tipo de clave</label>

      <div className="flex gap-4">
        {["RSA", "ECDSA"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-xl backdrop-blur-md border text-[color:var(--foreground)] shadow-md transition-all
              ${
                selected.type === type
                  ? "border-blue-400 shadow-blue-500/20 bg-white/10 dark:bg-white/5"
                  : "border-[color:var(--foreground)]/20 hover:border-[color:var(--foreground)]/40 bg-white/5 dark:bg-white/5"
              }
            `}
            onClick={() => handleTypeChange(type as KeyType)}
          >
            {type}
          </button>
        ))}
      </div>

      <label className="block text-sm font-semibold text-center">
        {selected.type === "RSA" ? "Tamaño (bits)" : "Curva elíptica"}
      </label>

      <select
        className="w-60 px-3 py-2 rounded-xl backdrop-blur-md 
          bg-[color:var(--background)]/10 text-[color:var(--foreground)] 
          border border-[color:var(--foreground)]/30 
          shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
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
