import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import { SignUp, ThankYou } from '../SignUp'

const AppBodyConainer = styled.main.attrs<{ isAuth: boolean }>((props) => ({
  isAuth: props.isAuth || false,
}))<{ isAuth: boolean }>`
  height: 100vh;
  width: 100%;

  ${(props) =>
    !props.isAuth &&
    `
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${props.theme.lendeskBlue};
    `}}
`

const Content = styled.section`
  background: ${(props) => props.theme.secondary};
  border: 1px solid ${(props) => props.theme.secondary};
  border-radius: 4px;
  padding: 24px;
`

export const AppBody: FC = () => {
  return (
    <AppBodyConainer isAuth={false}>
      <Content>
        <Routes>
          <Route path="/sign-up" element={<SignUp />}>
            <Route path="thank-you" element={<ThankYou />} />
          </Route>
        </Routes>
      </Content>
    </AppBodyConainer>
  )
}
