import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { ToastProvider } from '@/components/ui/Toast'
import BackToTop from '@/components/ui/BackToTop'
import AppRouter from '@/router/AppRouter'

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
        <div className="grain" aria-hidden="true" />
        <AppRouter />
        <BackToTop />
      </ToastProvider>
    </AuthProvider>
  </ThemeProvider>
  </BrowserRouter>
)

export default App