import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import PublicRoute from './components/Layout/PublicRoute'
import Login from './components/Login/Login'
import PrivateRoute from './components/Layout/PrivateRoute'
import CvPage from './components/CV/CvPage'
import ContactFormPage from './components/CV/ContactFormPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        {/* Only for guests */}
        <Route element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
        </Route>

        {/* Private */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<CvPage />} />
          <Route path="/form" element={<ContactFormPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
