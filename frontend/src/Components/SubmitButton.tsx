import { FC, ReactNode } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid ${(props) => props.theme.secondary};
  border-radius: 4px;
  color: ${(props) => props.theme.secondary};
  background: ${(props) => props.theme.lendeskBlue};
`

export type SubmitButtonProps = {
  isLoading: boolean
  children: ReactNode
}

export const SubmitButton: FC<SubmitButtonProps> = ({
  isLoading,
  children,
}) => {
  return (
    <Button type="submit" disabled={isLoading}>
      {children}
    </Button>
  )
}
