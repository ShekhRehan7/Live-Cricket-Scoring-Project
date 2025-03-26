import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Tournament from './pages/Tournament'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import {BrowserRouter,Routes ,Route} from 'react-router-dom'
import Socercard from './pages/Socercard'
import LiveScoring from './pages/LiveScoring'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/tournament" element={<Tournament/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path='/scorecard' element={<Socercard/>}/>
      <Route path='/livescoring' element={<LiveScoring/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App