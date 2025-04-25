import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import './index.css'
import Home from './pages/Home.jsx'


import Navbar from './components/Navbar.jsx'
import CreatePost from './pages/CreatePost.jsx'
import AboutPage from './pages/AboutPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import DetailsPage from './pages/DetailsPage.jsx'
import EditPost from './pages/EditPost.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route index={true} element={<Home/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/post-details/:id' element={<DetailsPage/>} />
        <Route path='/edit/:id' element={<EditPost/>}/>
        <Route path='*' element={<NotFoundPage/>}/> {/*Fallback Route*/}
    </Routes>
   </BrowserRouter>
  </StrictMode>,
)
