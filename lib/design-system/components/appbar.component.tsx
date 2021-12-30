import * as React from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import { useColorMode } from '@/lib/theme'

export function AppBar() {
  const { toggleColorMode, isDarkMode } = useColorMode()
  const { data, status } = useSession()
  const router = useRouter()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            Hello {data?.user?.name}
          </Typography>
          <Switch checked={isDarkMode} onChange={toggleColorMode} />
          {status === 'authenticated' ? (
            <Button
              color="inherit"
              onClick={() => {
                signOut()
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                router.push('/login')
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </MuiAppBar>
    </Box>
  )
}
