"use client"

import PasswordInput from "@/app/components/keypair/passwordInput";
import ThemeToggle from "@/app/components/ThemeToggle";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  return (
    <main>
      <div className="flex items-center justify-center pt-8">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center pt-8">
        <PasswordInput value={password} onChange={setPassword} />
      </div>
    </main>
  );
}
