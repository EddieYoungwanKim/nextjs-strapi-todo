import { InputHTMLAttributes, forwardRef } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  placeholder: string
}

// export const Input: FC<Props> = ({ name, ...rest }) => {
//   return <input id={name} {...rest} />
// }

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, Props>(({ placeholder, ...options }, ref) => {
  return <input ref={ref} placeholder={placeholder} {...options} />
})
