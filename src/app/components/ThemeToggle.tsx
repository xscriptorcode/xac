'use client';

import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from './icons/themesIcons';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    const newTheme = isDark ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Activar modo oscuro' : 'Activar modo claro'}
      className={`
        relative group transition-all duration-300 ease-in-out
        w-10 h-10 sm:w-12 sm:h-12
        rounded-2xl backdrop-blur-3xl
        bg-white/10 dark:bg-white/5
        border border-white/20 shadow-lg
        flex items-center justify-center
        hover:w-16 hover:rounded-xl
      `}
    >
      <div
        className={`
          absolute top-1/2 -translate-y-1/2
          w-2 h-2 rounded-full transition-all duration-300
          opacity-0 group-hover:opacity-100
          ${theme === 'dark'
            ? 'right-1 bg-black'
            : 'left-1 bg-yellow-400'}
        `}
      />

      {/* ÍCONO */}
      <div className="w-5 h-5 sm:w-6 sm:h-6">
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </div>
    </button>
  );
}
