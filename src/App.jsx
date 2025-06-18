import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import ContactUs from './pages/ContactUs'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div>
     <NavBar/>

     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/contact' element={<ContactUs/>}/>
      <Route path='/profile' element={<Profile/>}/>
     </Routes>
     <Footer/>
    </div>
  )
}

export default App
