import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import { AuthPage } from './components/auth/page'
import { SessionProvider } from './components/providers/session-provider'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={
          <SessionProvider>
            <Dashboard />
          </SessionProvider>
        } />
      </Routes>
    </Router>
  )
}

export default App
