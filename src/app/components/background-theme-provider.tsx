'use client';

import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';

export type BackgroundTheme = 'none' | 'neural' | 'matrix' | 'circuit' | 'datacenter';

interface BackgroundThemeContextProps {
  theme: BackgroundTheme;
  setTheme: (theme: BackgroundTheme) => void;
}

const BackgroundThemeContext = createContext<BackgroundThemeContextProps | undefined>(undefined);

export const useBackgroundTheme = () => {
  const context = useContext(BackgroundThemeContext);
  if (!context) {
    throw new Error('useBackgroundTheme must be used within a BackgroundThemeProvider');
  }
  return context;
};

export const BackgroundThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<BackgroundTheme>('circuit');

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <BackgroundThemeContext.Provider value={value}>
      {children}
    </BackgroundThemeContext.Provider>
  );
};
