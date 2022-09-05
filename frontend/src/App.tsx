import { BrowserRouter as Router } from 'react-router-dom'

import { AppBody } from './AppBody'
import { ThemeProvider } from './theme'

const App = () => (
  <ThemeProvider>
    <Router>
      <AppBody />
    </Router>
  </ThemeProvider>
)

export default App
