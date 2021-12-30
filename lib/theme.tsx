import { FC, useMemo, createContext, useState, useContext } from 'react'

import { PaletteMode, ThemeProvider, ThemeOptions } from '@mui/material'
import { blue } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: blue[300],
    },
  },
})

const ColorModeContext = createContext<{
  toggleColorMode: () => void
  isDarkMode: boolean
} | null>(null)

export const ThemeProviderWithColorMode: FC = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light')
  const colorMode = useMemo(
    () => ({
      isDarkMode: mode === 'dark',
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [mode]
  )
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export const useColorMode = () => {
  const ctx = useContext(ColorModeContext)

  if (!ctx) throw new Error('No ColorModeContext found. Did you forget to set it up?')
  return ctx
}
