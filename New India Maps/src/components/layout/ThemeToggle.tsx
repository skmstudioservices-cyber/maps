'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * COMPONENT: ThemeToggle
 * UTILITY: Handles switching between Light and Dark modes.
 * USE CASE: Placed in the Header/Nav for user accessibility.
 * NOTE: Separated from Nav logic to keep navigation code clean.
 */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Sync with system or local storage preference on load
  useEffect(() => {
    const root = window.document.documentElement;
    if (root.classList.contains('dark')) setIsDark(true);
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
