import { FC } from 'react'
import styled from 'styled-components'

const Logo = styled.img`
  width: 200px;
`

export const LendeskLogo: FC = () => (
  <Logo src="/image/lendesk_logo.svg" alt="Lendesk logo" />
)
