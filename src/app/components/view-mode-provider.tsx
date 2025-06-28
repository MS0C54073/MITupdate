'use client';

import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';

type ViewMode = 'web' | 'mobile';

interface ViewModeContextProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
}

const ViewModeContext = createContext<ViewModeContextProps | undefined>(undefined);

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
};

export const ViewModeProvider = ({ children }: { children: ReactNode }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('web');

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'web' ? 'mobile' : 'web'));
  };
  
  const value = useMemo(() => ({ viewMode, setViewMode, toggleViewMode }), [viewMode]);

  return (
    <ViewModeContext.Provider value={value}>
      {children}
    </ViewModeContext.Provider>
  );
};
