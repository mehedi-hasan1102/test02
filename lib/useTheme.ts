'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean | null>(null);
  const themeInitRef = useRef(false);

  const updateThemeDOM = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  // Initialize theme on mount - sync with DOM to prevent hydration mismatch
  useLayoutEffect(() => {
    if (themeInitRef.current) return;
    themeInitRef.current = true;

    // Check localStorage first, then fall back to system preference
    const stored = localStorage.getItem('theme');
    let shouldBeDark: boolean;

    if (stored === 'light') {
      shouldBeDark = false;
    } else if (stored === 'dark') {
      shouldBeDark = true;
    } else {
      // No stored preference, check system preference
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Update DOM first (synchronously)
    updateThemeDOM(shouldBeDark);

    // Then update state
    setIsDark(shouldBeDark);
  }, []);

  const toggleTheme = () => {
    if (isDark === null) return; // Prevent toggle before initialization

    const newIsDark = !isDark;
    setIsDark(newIsDark);

    // Animate the toggle button
    const button = document.querySelector('[data-theme-toggle-btn]');
    if (button) {
      gsap.to(button, {
        rotation: 360,
        duration: 0.6,
        ease: 'expo.out',
      });
    }

    // Update DOM and localStorage
    updateThemeDOM(newIsDark);
  };

  return {
    isDark,
    toggleTheme,
    isLoading: isDark === null, // Indicate if theme hasn't loaded yet
  };
}
