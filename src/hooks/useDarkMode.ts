// src/hooks/useDarkMode.ts
import React, { useState, useEffect } from 'react';

export default function useDarkMode(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  return [darkMode, setDarkMode];
}