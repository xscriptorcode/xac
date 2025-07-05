"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HouseShieldIcon, KeyPairIcon } from "./icons/navbarIcons";

export default function GlassNavbar() {
  const pathname = usePathname();
  const cleanPath = pathname.replace(/\/$/, "") || "/";

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Key Pair", href: "/keypair" },
  ];

  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md border border-white/20 rounded-full shadow-lg px-4 py-2 flex gap-4"
      style={{
        background: "rgba(255, 255, 255, 0.08)",
      }}
    >
      {navItems.map((item) => {
        const isActive = cleanPath === item.href;

        const iconClass = `w-5 h-5 transition-colors duration-300 ${
          isActive ? "stroke-cyan-400" : ""
        }`;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center justify-center
              ${isActive ? "bg-white/20 border border-white/30" : ""}
              text-[var(--foreground)]`}
          >
            {item.label === "Home" ? (
              <HouseShieldIcon className={iconClass} />
            ) : (
              <KeyPairIcon className={iconClass} />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
