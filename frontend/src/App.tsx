import { BrowserRouter as Router } from 'react-router-dom'
import styled from 'styled-components'

import { AppBody } from './AppBody'
import { LendeskLogo } from './Components'
import { isAuth } from './helpers'
import { ThemeProvider } from './theme'

const HeaderContainer = styled.header`
  background: ${(props) => props.theme.background};
  border-bottom: 1px solid ${(props) => props.theme.border};
  padding: 0 12px;
`

const App = () => (
  <ThemeProvider>
    {isAuth() && (
      <HeaderContainer>
        <h1>
          <LendeskLogo />
        </h1>
      </HeaderContainer>
    )}

    <Router>
      <AppBody />
    </Router>
  </ThemeProvider>
)

export default App
