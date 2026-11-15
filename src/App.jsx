import React from 'react'
import NavBar from './components/NavBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import ContactUs from './pages/ContactUs'
import Profile from './pages/Profile'
import About from './pages/About'
import ServiceDetailPage from './pages/ServiceDetailPage'
import GuidePage from './pages/GuidePage'
import AdmissionChecklist from './pages/AdmissionChecklist'
import CourseFinder from './pages/CourseFinder'
import { LanguageProvider } from './LanguageContext'
import AIChatWidget from './components/AIChatWidget'
import { useLocation } from 'react-router-dom'
import LearningPlatform from './pages/LearningPlatform'

const App = () => {
  const location = useLocation()
  if (location.pathname.startsWith('/learning')) return <LearningPlatform />
  return (
    <LanguageProvider>
    <div>
     <NavBar/>

     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/contact' element={<ContactUs/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/services/:serviceSlug' element={<ServiceDetailPage/>}/>
      <Route path='/guides' element={<GuidePage/>}/>
      <Route path='/guides/:guideSlug' element={<GuidePage/>}/>
      <Route path='/admission-checklist' element={<AdmissionChecklist/>}/>
      <Route path='/course-finder' element={<CourseFinder/>}/>
      <Route path='/ai-headshot' element={<Navigate to='/' replace/>}/>
     </Routes>
     <Footer/>
     <AIChatWidget/>
    </div>
    </LanguageProvider>
  )
}

export default App
