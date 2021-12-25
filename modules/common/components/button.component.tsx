import { FC } from 'react'

interface Props {
  label?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

export const Button: FC<Props> = ({ label, onClick, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick}>
      {label || 'default label'}
    </button>
  )
}
