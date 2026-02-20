'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean | null>(null);
  const themeInitRef = useRef(false);
  const themeSwitchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    const stored = localStorage.getItem('theme');
    let shouldBeDark: boolean;

    if (stored === 'light') {
      shouldBeDark = false;
    } else if (stored === 'dark') {
      shouldBeDark = true;
    } else {
      // No stored preference, default to dark theme
      shouldBeDark = true;
    }

    // Update DOM first (synchronously)
    updateThemeDOM(shouldBeDark);

    // Then update state on next frame to avoid synchronous setState-in-effect lint issue.
    requestAnimationFrame(() => {
      setIsDark(shouldBeDark);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (themeSwitchTimeoutRef.current) {
        clearTimeout(themeSwitchTimeoutRef.current);
      }
      document.documentElement.classList.remove('theme-changing');
    };
  }, []);

  const markThemeChanging = () => {
    document.documentElement.classList.add('theme-changing');
    if (themeSwitchTimeoutRef.current) {
      clearTimeout(themeSwitchTimeoutRef.current);
    }
    themeSwitchTimeoutRef.current = setTimeout(() => {
      document.documentElement.classList.remove('theme-changing');
      themeSwitchTimeoutRef.current = null;
    }, 650);
  };

  const toggleTheme = () => {
    if (isDark === null) return; // Prevent toggle before initialization

    const newIsDark = !isDark;
    setIsDark(newIsDark);
    markThemeChanging();

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
