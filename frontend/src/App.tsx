import { BrowserRouter as Router } from 'react-router-dom'

import { AppBody } from './AppBody'
import { AppHead } from './Components'
import { isAuth } from './helpers'
import { ThemeProvider } from './theme'

const App = () => (
  <ThemeProvider>
    <Router>
      {isAuth() && <AppHead />}

      <AppBody />
    </Router>
  </ThemeProvider>
)

export default App
