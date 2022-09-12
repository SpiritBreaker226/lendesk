import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.button`
  padding: 8px 16px;
  border: 1px solid ${(props) => props.theme.secondary};
  border-radius: 4px;
  cursor: pointer;
`

export type ButtonProps = {
  children: ReactNode
  isLoading?: boolean
} & ButtonHTMLAttributes<unknown>

export const Button: FC<ButtonProps> = ({ isLoading, children, ...rest }) => {
  return (
    <ButtonContainer type="button" disabled={isLoading} {...rest}>
      {children}
    </ButtonContainer>
  )
}
