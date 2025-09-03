import { useState } from 'react'
import "./App.css"
import Dashboard from './Components/Dashboard/Dashboard'
import Intro from './Components/Intro/Intro'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import AddSubjectForm from './Components/Forms/addSubjectForm'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const [LoggedIn, setLoggedIn] = useState(false)

  return (
    <Routes>
      <Route path='/' element={<Intro />} />
      <Route path='/login' element={LoggedIn ? <Navigate to={'/dashboard'} /> : <Login setLoggedIn={setLoggedIn} />} />
      <Route path='/register' element={LoggedIn ? <Navigate to={'/dashboard'} /> : <Register />} />
      <Route path='/dashboard' element={LoggedIn ? <Dashboard /> : <Navigate to={'/login'} />} />
    </Routes>
  )
}

export default App
