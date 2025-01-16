'use client';

import React from 'react';
import { useTheme } from '@/theme/Theme';

const ThemeHandler = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === "dark" ? 'dark' : 'light'}`}>
      {children}
    </div>
  );
};

export default ThemeHandler;
