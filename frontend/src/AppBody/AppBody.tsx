import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import { RequireAuth } from '../Components'
import { Login } from '../Login'
import { Profile } from '../Profile'
import { SignUp, ThankYou } from '../SignUp'

const AppBodyConainer = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.lendeskBlue};
`

const Content = styled.section`
  background: ${(props) => props.theme.secondary};
  border: 1px solid ${(props) => props.theme.secondary};
  border-radius: 4px;
  padding: 24px;
`

export const AppBody: FC = () => (
  <AppBodyConainer>
    <Content>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />}>
          <Route path="thank-you" element={<ThankYou />} />
        </Route>
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
    </Content>
  </AppBodyConainer>
)
