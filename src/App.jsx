import { useContext, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './Components/Pages/Dashboard/Dashboard'
import Intro from './Components/Auth/Intro/Intro'
import Login from './Components/Auth/Login/Login'
import Register from './Components/Auth/Register/Register'
import Options from './Components/Headers/Options/Options'
import Navbar from './Components/Headers/Navbar/Navbar'
import Menu from './Components/Headers/Menu/Menu'
import { Store } from './context/Store'
import Photos from './Components/Pages/Photos/Photos'
import History from './Components/Pages/History/History'
import AboutUs from './Components/Pages/AboutUs/AboutUs'
import NotFound from './Components/Pages/NotFound/NotFound'
import "./App.css"

function App() {
  const [currManu, setcurrManu] = useState("Dashboard")
  const navigate = useNavigate()
  const storeData = useContext(Store)

  return (
    <Routes>
      <Route path='/' element={<Intro />} />
      <Route path='/login' element={storeData.LoggedIn ? <Navigate to={'/dashboard'} /> : <Login setLoggedIn={storeData.setLoggedIn} />} />
      <Route path='/register' element={storeData.LoggedIn ? <Navigate to={'/dashboard'} /> : <Register />} />
      <Route path='/dashboard' element={
        storeData.LoggedIn ? <>
          <Navbar />
          <div className='bg-zinc-800 min-h-screen flex'>
            <Menu setcurrManu={setcurrManu} currManu={currManu}/>
            <Dashboard />
          </div>
        </> : <Navigate to={'/login'}/>
      } />
      <Route path='/dashboard/:subjectId' element={
        storeData.LoggedIn ? <>
          <Navbar />
          <div className='bg-zinc-800 min-h-screen flex'>
            <Menu setcurrManu={setcurrManu} currManu={currManu}/>
            <Options />
          </div>
        </> : <Navigate to={'/login'}/>
      } />
      <Route path='/dashboard/:subjectId/:detailId' element={
        storeData.LoggedIn ? <>
          <Navbar />
          <div className='bg-zinc-800 min-h-screen flex'>
            <Menu setcurrManu={setcurrManu} currManu={currManu}/>
            <Photos />
          </div>
        </> : <Navigate to={'/login'}/>
      } />
      <Route path='/history' element={
        storeData.LoggedIn ? <>
          <Navbar />
          <div className='bg-zinc-800 min-h-screen flex'>
            <Menu setcurrManu={setcurrManu} currManu={currManu}/>
            <History />
          </div>
        </> : <Navigate to={'/login'}/>
      } />
      <Route path='/about' element={
        storeData.LoggedIn ? <>
          <Navbar />
          <div className='bg-zinc-800 min-h-screen flex'>
            <Menu setcurrManu={setcurrManu} currManu={currManu}/>
            <AboutUs />
          </div>
        </> : <Navigate to={'/login'}/>
      } />
      <Route path='*' element={<NotFound />} />
    </Routes>

  )
}

export default App
