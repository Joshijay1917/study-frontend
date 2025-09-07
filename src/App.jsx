import { useContext, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import Intro from './Components/Intro/Intro'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Options from './Components/Options/Options'
import Navbar from './Components/Navbar/Navbar'
import Menu from './Components/Menu/Menu'
import { Store } from './context/Store'
import "./App.css"

function App() {
  const [LoggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()
  const storeData = useContext(Store)

  return (
    <Routes>
      <Route path='/' element={<Intro />} />
      <Route path='/login' element={LoggedIn ? <Navigate to={'/dashboard'} /> : <Login setLoggedIn={setLoggedIn} />} />
      <Route path='/register' element={LoggedIn ? <Navigate to={'/dashboard'} /> : <Register />} />
      <Route path='/dashboard' element={
        LoggedIn ? <>
          <Navbar />
          <div className='bg-zinc-800 min-h-screen flex'>
            <Menu />
            <Dashboard />
          </div>
        </> : <Navigate to={'/login'}/>
      } />
      <Route path='/dashboard/:subjectId' element={
        LoggedIn ? <>
          <Navbar />
          <div className='bg-zinc-800 min-h-screen flex'>
            <Menu />
            <Options />
          </div>
        </> : <Navigate to={'/login'}/>
      } />
    </Routes>

  )
}

export default App
