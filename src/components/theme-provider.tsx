'use client';

import * as React from 'react';
import {ThemeContext, ThemeProvider as NextThemesProvider} from 'next-themes';

interface ThemeProviderProps extends React.PropsWithChildren {}

export function ThemeProvider({children, ...props}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
