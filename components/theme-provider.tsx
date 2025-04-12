"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: React.PropsWithChildren<ThemeProviderProps>) {
  return (
    <NextThemesProvider
      attribute="class"           // ✅ use "class" instead of "data-theme"
      defaultTheme="light"         // or "system" if you want OS-based
      enableSystem={true}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
