import { AppBody } from './AppBody'
import { ThemeProvider } from './theme'

const App = () => (
  <ThemeProvider>
    <AppBody />
  </ThemeProvider>
)

export default App
