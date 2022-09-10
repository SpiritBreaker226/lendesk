import { BrowserRouter as Router } from 'react-router-dom'

import { AppBody } from './AppBody'
import { AppHead } from './Components'
import { AuthProvider } from './context'
import { ThemeProvider } from './theme'

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <Router>
        <AppHead />

        <AppBody />
      </Router>
    </AuthProvider>
  </ThemeProvider>
)

export default App
