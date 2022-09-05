import { FC, ReactNode } from 'react'
import styled from 'styled-components'

import { Button } from './Button'

const ButtonContainer = styled(Button)`
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
    <ButtonContainer type="submit" isLoading={isLoading}>
      {children}
    </ButtonContainer>
  )
}
