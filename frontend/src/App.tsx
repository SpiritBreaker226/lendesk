import styled from 'styled-components'

import { AppBody } from './AppBody'
import { ThemeProvider } from './theme'

const AppContainer = styled.div`
  text-align: center;
`

const HeaderContainer = styled.div`
  background: ${(props) => props.theme.background};
  border-bottom: 1px solid ${(props) => props.theme.border};
  padding: 0 12px;
`

const App = () => (
  <ThemeProvider>
    <AppContainer>
      <HeaderContainer>
        <h1>Lendesk</h1>
      </HeaderContainer>

      <AppBody />
    </AppContainer>
  </ThemeProvider>
)

export default App
