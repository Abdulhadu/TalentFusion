"use client"
import { baselightTheme } from '../utils/theme/DefaultColors';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import '../../styles/global.css';
import { AuthProvider } from './Services/context/Authcontext';

export default function RootLayout({
  children,
  initialAuthenticated, // Pass initialAuthenticated as a prop
}: {
  children: React.ReactNode;
  initialAuthenticated: boolean; // Make sure to define the prop
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider initialAuthenticated={initialAuthenticated}>
          <ThemeProvider theme={baselightTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
