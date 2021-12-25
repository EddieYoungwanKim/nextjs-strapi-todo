import { FC } from 'react'

import MuiButton, { ButtonProps } from '@mui/material/Button'

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <MuiButton variant="contained" {...props}>
      {children}
    </MuiButton>
  )
}
