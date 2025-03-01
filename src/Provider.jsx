import React from 'react'
import ThemeProvider from './ThemeProvider'

export default function Provider({children}) {
  return (
    <>
      <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
    </>
  )
}
