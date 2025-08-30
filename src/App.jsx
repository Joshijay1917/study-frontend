import { useState } from 'react'
import "./App.css"
import Dashboard from './Components/Dashboard/Dashboard'
import Navbar from './Components/Navbar/Navbar'
import Intro from './Components/Intro/Intro'
import Login from './Components/Login/Login'

function App() {

  return (
    <>
    <Navbar />
    <Dashboard />
    </>
  )
}

export default App
