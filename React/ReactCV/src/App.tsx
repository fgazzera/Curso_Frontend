import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import PublicRoute from './components/Layout/PublicRoute'
import Login from './components/Login/Login'
import PrivateRoute from './components/Layout/PrivateRoute'
import CurriculumPage from './features/cv/CurriculumPage'
import { ContactForm } from './features/cv/ContactForm'

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
          <Route path="/" element={<CurriculumPage />} />
          <Route path="/form" element={<ContactForm />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  )
}

export default App
