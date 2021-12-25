import { InputHTMLAttributes, forwardRef } from 'react'

import TextField, { TextFieldProps } from '@mui/material/TextField'

type Props = InputHTMLAttributes<HTMLInputElement> & TextFieldProps

// export const Input: FC<Props> = ({ name, ...rest }) => {
//   return <input id={name} {...rest} />
// }

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <TextField ref={ref} variant="outlined" fullWidth {...props} />
})

{
  /* <input ref={ref} placeholder={placeholder} {...options} /> */
}
