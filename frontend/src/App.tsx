import { BrowserRouter as Router } from 'react-router-dom'

import { AppBody } from './AppBody'
import { AppHead } from './Components'
import ErrorBoundary from './Components/ErrorBoundary'
import { AuthProvider } from './context'
import { ThemeProvider } from './theme'

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppHead />

          <AppBody />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  </ErrorBoundary>
)

export default App
