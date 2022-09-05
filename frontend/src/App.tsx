import { BrowserRouter as Router } from 'react-router-dom'
import styled from 'styled-components'

import { AppBody } from './AppBody'
import { LendeskLogo, LogOut } from './Components'
import { isAuth } from './helpers'
import { ThemeProvider } from './theme'

const HeaderContainer = styled.header`
  background: ${(props) => props.theme.background};
  border-bottom: 1px solid ${(props) => props.theme.border};
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const App = () => (
  <ThemeProvider>
    <Router>
      {isAuth() && (
        <HeaderContainer>
          <h1>
            <LendeskLogo />
          </h1>

          <LogOut />
        </HeaderContainer>
      )}

      <AppBody />
    </Router>
  </ThemeProvider>
)

export default App
