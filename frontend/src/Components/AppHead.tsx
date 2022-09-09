import { FC } from 'react'
import styled from 'styled-components'

import { LendeskLogo } from './LendeskLogo'
import { LogOut } from './LogOut'

const HeaderContainer = styled.header`
  background: ${(props) => props.theme.background};
  border-bottom: 1px solid ${(props) => props.theme.border};
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const AppHead: FC = () => (
  <HeaderContainer>
    <h1>
      <LendeskLogo />
    </h1>

    <LogOut />
  </HeaderContainer>
)
