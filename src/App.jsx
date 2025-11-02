import React, { useEffect, useState } from 'react'
import "./App.css"
import { Navigate, Route, Routes } from 'react-router-dom'
import Intro from './Components/Authentication/Intro/Intro'
import Login from './Components/Authentication/Login/Login'
import Register from './Components/Authentication/Register/Register'
import Loading from './Components/Pages/Loading/Loading'
import { useCurrentUserQuery } from './Redux/Features/ApiSlice'
import { useSelector } from 'react-redux'
import Dashboard from './Components/Pages/Dashboard/Dashboard'
import Navbar from './Components/Header/Navbar/Navbar'
import Menu from './Components/Header/Menu/Menu'
import SubjectDetails from './Components/Pages/SubjectDetails/SubjectDetails'
import LatestUpdates from './Components/Pages/LatestUpdates/LatestUpdates'
import AboutMe from './Components/Pages/AboutMe/AboutMe'
import Photos from './Components/Pages/Photos/Photos'
import LatestSubjects from './Components/Pages/LatestUpdates/LatestSubjects/LatestSubjects'
import LatestSubjectDetails from './Components/Pages/LatestUpdates/LatestSubjectDetails/LatestSubjectDetails'
import LatestPhotos from './Components/Pages/LatestUpdates/LatestPhotos/LatestPhotos'
import NotFound from './Components/Pages/NotFound/NotFound'
import PersonalInfo from './Components/Pages/PersonalInfo/PersonalInfo'

const App = () => {
  const { data, isLoading } = useCurrentUserQuery()
  const [LoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if(data) {
      setLoggedIn(true)
    }
  }, [data])
  
  const ProtectedLayout = ({children}) => {
    return (
      LoggedIn ? (
      <>
        <Navbar />
        <div className="app-bg-theme min-h-screen flex">
          <Menu />
          {children}
        </div>
      </>
    ) : (
      <Navigate to="/login" replace />
    )
    )
  }

  return (
    <>
    <Routes>
      <Route path='/' element={LoggedIn ? <Navigate to={'/dashboard'}/> : <Intro />}/>
      <Route path='/login' element={LoggedIn ? <Navigate to={'/dashboard'}/> : <Login setLoggedIn={setLoggedIn}/>}/>
      <Route path='/register' element={LoggedIn ? <Navigate to={'/dashboard'}/> : <Register />}/>
      <Route path='/dashboard' element={<ProtectedLayout><Dashboard setLoggedIn={setLoggedIn}/></ProtectedLayout>}/>   {/* SHOW ALL SUBJECTS */}
      <Route path='/personal-info' element={<ProtectedLayout><PersonalInfo /></ProtectedLayout>}/>

      <Route path='/dashboard/:subjectId' element={<ProtectedLayout><SubjectDetails /></ProtectedLayout>}/>  {/* SHOW ONE SUBJECT'S DETAIL */}
      <Route path='/dashboard/:subjectId/:type/:typeId' element={<ProtectedLayout><Photos /></ProtectedLayout>}/> {/* SHOW ONE SUBJECT'S TYPE'S PHOTOS */}

      <Route path='/latestUpdate' element={<ProtectedLayout><LatestUpdates /></ProtectedLayout>}/> {/* SHOW ALL UPDATES */}
      <Route path='/latestUpdate/:updateId' element={<ProtectedLayout><LatestSubjects /></ProtectedLayout>}/> {/* SHOW SOME SUBJECTS */}

      <Route path='/latestUpdate/:updateId/:subjectId' element={<ProtectedLayout><LatestSubjectDetails /></ProtectedLayout>}/> {/* SHOW ONE SUBJECT'S DETAIL */}
      <Route path='/latestUpdate/:updateId/:subjectId/:type/:typeId' element={<ProtectedLayout><LatestPhotos /></ProtectedLayout>}/>  {/* SHOW ONE SUBJECT'S TYPE'S PHOTOS */}

      <Route path='/aboutme' element={<ProtectedLayout><AboutMe /></ProtectedLayout>}/>

      <Route path='*' element={<NotFound />}/>
    </Routes>
    {isLoading && <Loading />}
    </>
  )
}

export default App
